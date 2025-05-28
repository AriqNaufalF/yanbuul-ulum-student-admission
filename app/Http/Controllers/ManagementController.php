<?php

namespace App\Http\Controllers;

use App\Models\Santri;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ManagementController extends Controller
{
    public function index()
    {
        $pendaftar = Santri::with('pembayaran')
            ->whereNotNull('program')
            ->orWhereHas('pembayaran')
            ->get()
            ->map(function ($santri) {
                return [
                    'id' => $santri->id,
                    'regisNum' => $santri->nomor_pendaftaran,
                    'name' => $santri->nama,
                    'date' => optional($santri->pembayaran)->created_at ?? $santri->created_at,
                    'status' => $santri->status,
                    'program' => $santri->program ?? '-',
                ];
            });

        return Inertia::render('dashboard/admin/manajemen-pendaftar', [
            'pendaftar' => $pendaftar,
        ]);
    }

    public function show($id)
    {
        $santri = Santri::with('berkas')->findOrFail($id);

        $gender = $santri->jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan';

        return Inertia::render('dashboard/admin/detail-pendaftar', [
            'pendaftar' => [
                'id' => $santri->id,
                'regisNum' => $santri->nomor_pendaftaran,
                'registrationDate' => $santri->created_at,
                'status' => $santri->status,
                'name' => $santri->nama,
                'nik' => $santri->nik,
                'gender' => $gender,
                'birthPlace' => $santri->tempat_lahir,
                'birthDate' => $santri->tanggal_lahir,
                'address' => $santri->alamat,
                'province' => $santri->provinsi,
                'city' => $santri->kabkota,
                'postalCode' => $santri->kode_pos,
                'schoolOrigin' => $santri->schoolOrigin,
                'graduationYear' => $santri->graduationYear,
                'program' => $santri->program,
                'email' => $santri->email_aktif,
                'fathersName' => $santri->ayah,
                'mothersName' => $santri->ibu,
                'fathersJob' => $santri->pekerjaan_ayah,
                'mothersJob' => $santri->pekerjaan_ibu,
                'phone' => $santri->no_aktif,
                'kk' => $santri->berkas?->kk ? asset('storage/' . $santri->berkas->kk) : '',
                'akta' => $santri->berkas?->akta ? asset('storage/' . $santri->berkas->akta) : '',
                'certificate' => $santri->berkas?->ijazah ? asset('storage/' . $santri->berkas->ijazah) : '',
                'photo' => $santri->berkas?->foto_formal ? asset('storage/' . $santri->berkas->foto_formal) : '',
            ],
        ]);
    }


    public function update(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:selesai,revisi,ditolak',
            'comment' => 'nullable|string',
        ]);

        $santri = Santri::findOrFail($id);
        $santri->update([
            'status' => $request->status,
            'komentar' => $request->comment,
        ]);

        return redirect()->back()->with('success', 'Status dan komentar berhasil diperbarui.');
    }
}
