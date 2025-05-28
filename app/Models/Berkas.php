<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Berkas extends Model
{
    protected $fillable = [
        'santri_id',
        'kk',
        'akta',
        'ijazah',
        'foto_formal'
    ];

    public function santri()
    {
        return $this->belongsTo(Santri::class);
    }

    public function pembayaran()
    {
        return $this->hasOne(Pembayaran::class, 'berkas_id', 'id');
    }
}
