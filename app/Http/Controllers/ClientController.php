<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ClientController extends Controller
{
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
        $data = $request->validate([
            'name'        => ['required', 'string', 'max:255'],
            'phone'       => ['required', 'string', 'max:50'],
            'email'       => ['required', 'email', 'max:100'],
            'description' => ['nullable', 'string'],
        ]);

        Client::create($data);

        return redirect()
            ->route('clients.index')
            ->with('success', 'Client created');
    }

    public function update(Request $request, Client $client)
    {
        $data = $request->validate([
            'name'        => ['required', 'string', 'max:255'],
            'phone'       => ['required', 'string', 'max:50', Rule::unique('clients', 'phone')->ignore($client->id)],
            'email'       => ['required', 'email', 'max:100', Rule::unique('clients', 'email')->ignore($client->id)],
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
            'status' => Client::STATUS_DELETED,
        ]);

        return redirect()
            ->route('clients.index')
            ->with('success', 'Client deleted');
    }
}
