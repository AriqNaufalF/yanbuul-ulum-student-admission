<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('santris', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->date('tanggal_daftar');
            $table->string('nomor_pendaftaran', 10)->unique();
            $table->enum('status', ['diproses', 'lulus', 'tidak lulus'])->default('diproses');
            $table->string('nama');
            $table->string('nik', 16);
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->enum('jenis_kelamin', ['L', 'P']);
            $table->text('alamat');
            $table->string('provinsi');
            $table->string('kabkota');
            $table->string('kode_pos', 5);
            $table->string('ayah');
            $table->string('pekerjaan_ayah');
            $table->string('ibu');
            $table->string('pekerjaan_ibu');
            $table->string('no_aktif', 15);
            $table->string('email_aktif');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('santris');
    }
};
