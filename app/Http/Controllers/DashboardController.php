<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->isAdmin) {
            return Inertia::render('admin-dashboard');
        }

        $santri = $user->santri;

        $hasPayment = $santri && $santri->pembayaran()->exists();

        return Inertia::render('dashboard', [
            'registrationData' => $santri && $hasPayment ? [
                'id' => $santri->id,
                'name' => $santri->nama,
                'program' => $santri->program,
                'regisNumber' => $santri->nomor_pendaftaran,
                'status' => $santri->status,
                'comment' => $santri->komentar,
                'date' => $santri->tanggal_daftar,
                'birthPlace' => $santri->tempat_lahir,
                'birthDate' => $santri->tanggal_lahir,
                'address' => $santri->alamat,
                'province' => $santri->provinsi,
                'city' => $santri->kabkota,
                'postalCode' => $santri->kode_pos,
                'nik' => $santri->nik,
                'fatherName' => $santri->ayah,
                'motherName' => $santri->ibu,
                'parentPhone' => $santri->no_aktif,
                'parentEmail' => $santri->email_aktif,
                'kk' => $santri->kk_url ?? '',
                'akta' => $santri->akta_url ?? '',
                'certificate' => $santri->certificate_url ?? '',
                'photo' => $santri->photo_url ?? '',
            ] : null,
        ]);
    }
}