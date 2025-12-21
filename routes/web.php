<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\ContactsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // !Get Client List
    Route::get('/clients', [ClientController::class, 'index'])->name('clients.index');
    // !Store New Client
    Route::post('/clients', [ClientController::class, 'store'])->name('clients.store');
    // !Edit Client
    Route::put('/clients/{client}', [ClientController::class, 'update'])->name('clients.update');
    // !Delete Client
    Route::delete('/clients/{client}', [ClientController::class, 'destroy'])->name('clients.destroy');

    // !Get Contacts List
    Route::get('/contacts', [ContactsController::class, 'index'])->name('contacts.index');
});

require __DIR__ . '/settings.php';
