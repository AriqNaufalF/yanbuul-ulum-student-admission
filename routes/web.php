<?php

use App\Http\Controllers\WilayahController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\SantriController;

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

    Route::resource('santri', SantriController::class)->only([
        'create', 'store', 'show', 'edit', 'update', 'destroy'
    ]);
    Route::post('/santri', [SantriController::class, 'store'])->name('santri.store');
    Route::get('dashboard', function (Request $request) {
        // Check if the user is an admin
        // Replace this query param isAdmin with actual admin check logic
        $isAdmin = $request->query('isAdmin', false);
        if ($isAdmin == 'true') {
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

    Route::get('dashboard/data-calon-santri', function () {
        return Inertia::render('dashboard/data-calon-santri');
    })->name('data-calon-santri');

    Route::get('dashboard/data-calon-santri/pendidikan', function () {
        return Inertia::render('dashboard/pendidikan');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
