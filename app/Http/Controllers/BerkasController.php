<?php

namespace App\Http\Controllers;

use App\Models\Berkas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BerkasController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard/berkas');
    }

    public function store(Request $request)
    {
        $request->validate([
            'kartu_keluarga' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'akta_lahir' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'ijazah' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'foto_formal' => 'required|file|mimes:jpg,jpeg,png|max:2048',
        ]);        

        $santri = Auth::user()->santri;

        $kkPath = $request->file('kartu_keluarga')->store('berkas/kk', 'public');
        $aktaPath = $request->file('akta_lahir')->store('berkas/akta', 'public');
        $ijazahPath = $request->file('ijazah')->store('berkas/ijazah', 'public');
        $fotoPath = $request->file('foto_formal')->store('berkas/foto', 'public');

        Berkas::updateOrCreate(
            ['santri_id' => $santri->id],
            [
                'kk' => $kkPath,
                'akta' => $aktaPath,
                'ijazah' => $ijazahPath,
                'foto_formal' => $fotoPath,
            ]
        );

        return redirect()->back()->with('success', 'Berkas berhasil diunggah!');
    }
}
