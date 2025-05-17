<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pembayaran extends Model
{
    protected $fillable = [
        'berkas_id',
        'id_pendaftaran',
        'tanggal_tempo',
        'total',
        'status',
        'metode_pembayaran',
    ];

    public function berkas()
    {
        return $this->belongsTo(Berkas::class);
    }

    public function santri()
    {
        return $this->belongsTo(Santri::class, 'id_pendaftaran', 'nomor_pendaftaran');
    }
}
