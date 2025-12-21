<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ClientController extends Controller
{
    // !unique active rule helper
    private function uniqueActive(string $column, ?int $ignoreId = null)
    {
        $rule = Rule::unique('clients', $column)->where(fn($q) => $q->where('status', Client::STATUS_ACTIVE));
        return $ignoreId ? $rule->ignore($ignoreId) : $rule;
    }

    public function index(Request $request)
    {
        $search = $request->query('search');

        $clients = Client::active()
            ->when($search, function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Client/Index', [
            'items' => $clients,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }


    public function store(Request $request)
    {
        // ?normalize
        $request->merge([
            'phone' => Client::normalizePhone($request->phone),
            'email' => strtolower(trim($request->email)),
        ]);

        $data = $request->validate([
            'name'        => ['required', 'string', 'max:255', $this->uniqueActive('name')],
            'phone'       => ['required', 'string', 'max:50', $this->uniqueActive('phone')],
            'email'       => ['required', 'email', 'max:100', $this->uniqueActive('email')],
            'description' => ['nullable', 'string'],
        ]);

        Client::create($data);

        return redirect()
            ->route('clients.index')
            ->with('success', 'Client created');
    }

    public function update(Request $request, Client $client)
    {
        // ?normalize
        $request->merge([
            'phone' => Client::normalizePhone($request->phone),
            'email' => strtolower(trim($request->email)),
        ]);

        $data = $request->validate([
            'name'        => ['required', 'string', 'max:255', $this->uniqueActive('name', $client->id)],
            'phone'       => ['required', 'string', 'max:50', $this->uniqueActive('phone', $client->id)],
            'email'       => ['required', 'email', 'max:100', $this->uniqueActive('email', $client->id)],
            'description' => ['nullable', 'string'],
            'status'      => ['required', 'integer'],
        ]);

        $client->update($data);

        return redirect()
            ->route('clients.index')
            ->with('success', 'Client updated');
    }

    public function destroy(Client $client)
    {
        $client->update([
            'name' => 'removed-' . $client->id . '-' . $client->name,
            'status' => Client::STATUS_DELETED,
        ]);

        return redirect()
            ->route('clients.index')
            ->with('success', 'Client deleted');
    }
}
