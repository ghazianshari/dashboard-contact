<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ClientController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');

        $clients = Client::query()->when($search, function ($q) use ($search) {
            $q->where('name', 'like', '%' . $search . '%');
        })->latest()->paginate(10)->withQueryString();

        return Inertia::render('Client/Index', [
            'items' => $clients,
            'filters' => ['search' => $search],
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate(['name' => ['required', 'string', 'max:255', 'unique:clients,name']]);
        Client::create($data);
        return redirect()->route('clients.index')->with('success', 'Client created');
    }

    public function update(Request $request, Client $client)
    {
        $data = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                'unique:clients,name,' . $client->id, // !agar nama client boleh tetap sama saat diupdate
            ],
        ]);

        $client->update($data);

        return redirect()->route('clients.index')->with('success', 'Client updated');
    }

    public function destroy(Client $client)
    {
        $client->update([
            'name' => 'removed-' . Str::uuid() . '-' . $client->name,
        ]);

        $client->delete(); // soft delete

        return redirect()
            ->route('clients.index')
            ->with('success', 'Client deleted');
    }
}
