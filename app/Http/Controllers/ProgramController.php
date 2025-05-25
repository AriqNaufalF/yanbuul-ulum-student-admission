<?php

namespace App\Http\Controllers;

use App\Models\Santri;
use App\Models\Pembayaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProgramController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('dashboard/daftar-program');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'program' => 'required|in:MTS,MA,MA LANJUTAN',
            'method' => 'required|string',
        ]);

        $user = Auth::user();
        $santri = $user->santri;
        $berkas = $santri?->berkas;

        if (!$santri || !$berkas) {
            return redirect()->back()->withErrors([
                'general' => 'Silakan isi data diri & unggah berkas terlebih dahulu.'
            ]);
        }

        $santri->update([
            'program' => $validated['program'],
        ]);

        Pembayaran::updateOrCreate(
            ['id_pendaftaran' => $santri->nomor_pendaftaran],
            [
                'total' => 200000,
                'metode_pembayaran' => $validated['method'],
                'tanggal_tempo' => now()->addWeek(),
                'status' => 'belum lunas',
                'berkas_id' => $berkas->id,
            ]
        );

        return redirect()->back()->with('success', 'Program berhasil didaftarkan!');
    }
}
