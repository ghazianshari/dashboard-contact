<?php

namespace App\Http\Controllers;

use App\Models\AkunEwallet;
use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AkunEwalletController extends Controller
{
    public function index()
    {
        return Inertia::render('Ewallet/Index', [
            'items' => AkunEwallet::with('client')->latest()->paginate(10),
        ]);
    }

    public function create()
    {
        return Inertia::render('Ewallet/Create', [
            'clients' => Client::select('id', 'name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nomor_ovo' => ['required', 'string', 'max:30', 'unique:akun_ewallet,nomor_ovo'],
            'nama' => ['required', 'string', 'max:255'],
            'status' => ['required', 'in:active,inactive'],
            'account_type' => ['required', 'in:premium,basic'],
            'status_aplikasi' => ['required', 'in:active,blocked,closed'],
            'pin' => ['required', 'string', 'min:4', 'max:10'],
            'client_id' => ['required', 'exists:clients,id'],
        ]);

        // Catatan: jangan simpan PIN plaintext di produksi. Nanti kita enkripsi.
        AkunEwallet::create($validated);
        return redirect()->route('ewallet.index')->with('success', 'Ewallet created');
    }
}
