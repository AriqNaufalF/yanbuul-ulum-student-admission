<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Santri;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class SantriController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $santri = $request->user()->santri;
        $dataCalonSantri = [];
        if ($santri) {
            $dataCalonSantri = [
                'name' => $santri->nama,
                'nik' => $santri->nik,
                'birthPlace' => $santri->tempat_lahir,
                'birthDate' => $santri->tanggal_lahir,
                'gender' => $santri->jenis_kelamin,
                'address' => $santri->alamat,
                'province' => $santri->provinsi,
                'city' => $santri->kabkota,
                'postalCode' => $santri->kode_pos,
                'fathersName' => $santri->ayah,
                'fathersJob' => $santri->pekerjaan_ayah,
                'mothersName' => $santri->ibu,
                'mothersJob' => $santri->pekerjaan_ibu,
                'phone' => $santri->no_aktif,
                'email' => $santri->email_aktif,
                'schoolOrigin' => $santri->schoolOrigin,
                'graduationYear' => $santri->graduationYear,
            ];
        }


        return Inertia::render('dashboard/data-calon-santri', compact('dataCalonSantri'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validasi data
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'nik' => 'required|digits:16|unique:santris,nik,' . Auth::id() . ',user_id',
            'birthPlace' => 'required|string|max:255',
            'birthDate' => 'required|date',
            'gender' => 'required|in:L,P',
            'address' => 'required|string',
            'province' => 'required|string',
            'city' => 'required|string',
            'postalCode' => 'required|digits:5',
            'fathersName' => 'required|string|max:255',
            'fathersJob' => 'required|string|max:255',
            'mothersName' => 'required|string|max:255',
            'mothersJob' => 'required|string|max:255',
            'phone' => 'required|string|max:15',
            'email' => 'required|email|unique:santris,email_aktif,' . Auth::id() . ',user_id',
            'schoolOrigin' => 'required|string|max:255',
            'graduationYear' => 'required|string|max:10',
        ]);

        $santri = Santri::where('user_id', Auth::id())->first();

        if (!$santri) {
            $santri = new Santri();
            $santri->user_id = Auth::id();
            $santri->nomor_pendaftaran = mt_rand(1000000000, 9999999999);
        }

        $santri->fill([
            'nama' => $validated['name'],
            'nik' => $validated['nik'],
            'tempat_lahir' => $validated['birthPlace'],
            'tanggal_lahir' => $validated['birthDate'],
            'jenis_kelamin' => $validated['gender'],
            'alamat' => $validated['address'],
            'provinsi' => $validated['province'],
            'kabkota' => $validated['city'],
            'kode_pos' => $validated['postalCode'],
            'ayah' => $validated['fathersName'],
            'pekerjaan_ayah' => $validated['fathersJob'],
            'ibu' => $validated['mothersName'],
            'pekerjaan_ibu' => $validated['mothersJob'],
            'no_aktif' => $validated['phone'],
            'email_aktif' => $validated['email'],
            'tanggal_daftar' => now(),
            'status' => 'Menunggu',
            'komentar' => 'Data sedang dicek admin.',
            'schoolOrigin' => $validated['schoolOrigin'],
            'graduationYear' => $validated['graduationYear'],
        ])->save();

        return redirect()->back()->with('success', 'Data santri berhasil disimpan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Santri $santri)
    {
        return view('santri.show', compact('santri'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
