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
        $santri = $request->user()->santri;
        $pembayaran = $santri?->pembayaran;
        return Inertia::render('dashboard/daftar-program', [
            'isRegistered' => $pembayaran ? true : false,
            'program' => $santri?->program,
            'method' => $pembayaran?->metode_pembayaran,
        ]);
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
                'general' => 'Silakan lengkapi data diri dan unggah berkas terlebih dahulu!',
            ]);
        }

        $pembayaran = Pembayaran::where('id_pendaftaran', $santri->nomor_pendaftaran)->first();
        if ($pembayaran) {
            return redirect()->back()->withErrors([
                'general' => 'Anda sudah mendaftar dan memiliki data pembayaran!',
            ]);
        }

        $santri->update([
            'program' => $validated['program'],
            'status' => 'Belum Lunas',
        ]);

        $santri->update([
            'program' => $validated['program'],
        ]);

        Pembayaran::create([
            'id_pendaftaran' => $santri->nomor_pendaftaran,
            'total' => 200000,
            'metode_pembayaran' => $validated['method'],
            'tanggal_tempo' => now()->addWeek(),
            'status' => 'Belum Lunas',
            'berkas_id' => $berkas->id,
        ]);

        return redirect()->back()->with('success', 'Program berhasil didaftarkan! Silakan lanjutkan ke pembayaran.');
    }
}
