<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
    public function index()
    {
        return Inertia::render('Client/Index', [
            'items' => Client::latest()->paginate(10),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate(['name' => ['required', 'string', 'max:255']]);
        Client::create($data);
        return redirect()->route('clients.index')->with('success', 'Client created');
    }
}
