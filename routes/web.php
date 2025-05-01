<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/petunjuk-pendaftaran', function () {
    return Inertia::render('petunjuk-pendaftaran');
})->name('petunjuk-pendaftaran');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('berkas', function () {
        return Inertia::render('dashboard/berkas');
    })->name('berkas');

    Route::get('dashboard/data-calon-santri', function () {
        return Inertia::render('dashboard/data-calon-santri');
    })->name('data-calon-santri');

    Route::get('dashboard/data-calon-santri/pendidikan', function () {
        return Inertia::render('dashboard/pendidikan');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
