<?php

namespace App\Http\Controllers;

use App\Models\Santri;
use App\Models\Pembayaran;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PembayaranController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $santri = $user->santri;

        if (!$santri) {
            return Inertia::render('dashboard/pembayaran', [
                'paymentInfo' => null,
            ]);
        }

        $pembayaran = Pembayaran::where('id_pendaftaran', $santri->nomor_pendaftaran)->first();

        if (!$pembayaran) {
            return Inertia::render('dashboard/pembayaran', [
                'paymentInfo' => null,
            ]);
        }

        return Inertia::render('dashboard/pembayaran', [
            'paymentInfo' => [
                'id' => $pembayaran->id,
                'regisNumber' => $pembayaran->id_pendaftaran,
                'detail' => 'Biaya Pendaftaran',
                'status' => $pembayaran->status,
                'dueDate' => $pembayaran->tanggal_tempo,
                'total' => $pembayaran->total,
            ],
        ]);
    }

    public function show()
    {
        $user = Auth::user();
        $santri = $user->santri;

        if (!$santri) {
            return Inertia::render('dashboard/detail-pembayaran', [
                'paymentInfo' => null,
            ]);
        }

        $pembayaran = $santri->pembayaran;

        if (!$pembayaran) {
            return Inertia::render('dashboard/detail-pembayaran', [
                'paymentInfo' => null,
            ]);
        }

        $paymentDetails = [
            ['desc' => 'Biaya Pendaftaran', 'amount' => $pembayaran->total],
        ];

        $subTotal = $pembayaran->total;
        $tax = $subTotal * 0.11;

        return Inertia::render('dashboard/detail-pembayaran', [
            'paymentInfo' => [
                'id' => $pembayaran->id,
                'regisNumber' => $pembayaran->id_pendaftaran,
                'detail' => 'Biaya Pendaftaran',
                'status' => $pembayaran->status,
                'dueDate' => $pembayaran->tanggal_tempo,
                'subTotal' => $subTotal,
                'tax' => $tax,
                'total' => $subTotal + $tax,
                'paymentDetails' => $paymentDetails,
                'method' => $pembayaran->metode_pembayaran,
            ],
        ]);
    }


    public function update(Request $request, Pembayaran $pembayaran)
    {
        $request->validate([
            'method' => 'required|string|max:255',
        ]);

        $pembayaran->update([
            'metode_pembayaran' => $request->method,
        ]);

        return back()->with('success', 'Metode pembayaran berhasil diperbarui.');
    }

    public function pay(Request $request, Pembayaran $pembayaran)
    {
        $pembayaran->update([
            'status' => 'lunas',
            'metode_pembayaran' => $request->method,
        ]);

        return back()->with('success', 'Pembayaran berhasil diselesaikan.');
    }
}