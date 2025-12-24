<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\ContactController;
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
    Route::get('/contacts', [ContactController::class, 'index'])->name('contacts.index');
    // !Store New Contact
    Route::post('/contacts', [ContactController::class, 'store'])->name('contacts.store');
    // !Edit Contact
    Route::put('/contacts/{contact}', [ContactController::class, 'update'])->name('contacts.update');
    // !Delete Contact
    Route::delete('/contacts/{contact}', [ContactController::class, 'destroy'])->name('contacts.destroy');
});

require __DIR__ . '/settings.php';
