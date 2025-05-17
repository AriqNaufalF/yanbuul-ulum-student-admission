<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Santri extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'tanggal_daftar',
        'nomor_pendaftaran',
        'status',
        'nama',
        'nik',
        'tempat_lahir',
        'tanggal_lahir',
        'jenis_kelamin',
        'alamat',
        'provinsi',
        'kabkota',
        'kode_pos',
        'ayah',
        'pekerjaan_ayah',
        'ibu',
        'pekerjaan_ibu',
        'no_aktif',
        'email_aktif',
        'schoolOrigin',
        'graduationYear',
        'program'
    ];

    protected $casts = [
        'tanggal_daftar' => 'date',
        'tanggal_lahir' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function berkas()
    {
        return $this->hasOne(Berkas::class);
    }
}
