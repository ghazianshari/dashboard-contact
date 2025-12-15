<?php

namespace App\Http\Controllers;

use App\Models\Akun;
use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AkunController extends Controller
{
    public function index()
    {
        return Inertia::render('Akun/Index', [
            'items' => Akun::with('client')->latest()->paginate(10),
        ]);
    }

    public function create()
    {
        return Inertia::render('Akun/Create', [
            'clients' => Client::select('id', 'name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:255'],
            'nomor_telepon' => ['required', 'string', 'max:20', 'unique:akun,nomor_telepon'],
            'last_balance' => ['nullable', 'numeric'],
            'client_id' => ['required', 'exists:clients,id'],
            'expired' => ['required', 'date'],
            'status' => ['required', 'in:active,inactive,blocked'],
        ]);

        Akun::create($validated);
        return redirect()->route('akun.index')->with('success', 'Akun created');
    }
}
