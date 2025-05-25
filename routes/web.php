<?php

use App\Http\Controllers\WilayahController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\SantriController;
use App\Http\Controllers\BerkasController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\PembayaranController;
use App\Http\Controllers\DashboardController;

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
        Route::get('berkas', 'index')->name('berkas.index');
        Route::post('berkas', 'store')->name('berkas.store');
    });

    Route::controller(ProgramController::class)->group(function () {
        Route::get('/daftar', 'index')->name('program.index');
        Route::post('/daftar-program', 'store')->name('program.store');
    });

    Route::controller(PembayaranController::class)->prefix('pembayaran')->group(function () {
        Route::get('/', 'index')->name('pembayaran');
        Route::get('/bayar', 'show')->name('pembayaran.detail');
        Route::patch('/{pembayaran}/update-method', 'update')->name('pembayaran.update-method');
        Route::patch('/{pembayaran}/pay', 'pay')->name('pembayaran.pay');
    });

    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

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
