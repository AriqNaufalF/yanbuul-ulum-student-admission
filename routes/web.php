<?php

use App\Http\Controllers\WilayahController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\SantriController;
use App\Http\Controllers\BerkasController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/petunjuk-pendaftaran', function () {
    return Inertia::render('petunjuk-pendaftaran');
})->name('petunjuk-pendaftaran');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::controller(WilayahController::class)->group(function () {
        Route::get('api/provinces', 'getProvinces')->name('provinces');
        Route::get('api/provinces/{provinceId}/cities', 'getCities')->name('cities');
    });

    Route::controller(SantriController::class)->group(function () {
        Route::get('/data-calon-santri', 'create')->name('santri.create');
        Route::post('/data-calon-santri', 'store')->name('santri.store');
    });

    Route::controller(BerkasController::class)->group(function () {
        Route::post('berkas', 'store')->name('berkas.store');
    });

    Route::get('dashboard', function (Request $request) {
        // Check if the user is an admin
        $isAdmin = $request->user()->isAdmin;
        if ($isAdmin) {
            return Inertia::render('admin-dashboard');
        }
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('berkas', function () {
        return Inertia::render('dashboard/berkas',);
    })->name('berkas');

    Route::get('pembayaran', function () {
        return Inertia::render('dashboard/pembayaran');
    })->name('pembayaran');

    Route::get('pembayaran/bayar', function () {
        return Inertia::render('dashboard/detail-pembayaran');
    })->name('detail-pembayaran');

    Route::get('/daftar', function () {
        return Inertia::render('dashboard/daftar-program');
    });

    // Admin Routes
    Route::get('/manajemen-pendaftar', function () {
        return Inertia::render('dashboard/admin/manajemen-pendaftar');
    });

    Route::get('/manajemen-pendaftar/{id}', function ($id) {
        return Inertia::render('dashboard/admin/detail-pendaftar', [
            'id' => $id,
        ]);
    })->name('detail-pendaftar');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
