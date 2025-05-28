<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pembayarans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('berkas_id')
                ->constrained('berkas')
                ->unique()
                ->onDelete('cascade');
            $table->string('id_pendaftaran', 10);
            $table->date('tanggal_tempo');
            $table->bigInteger('total');
            $table->enum('status', ['lunas', 'belum lunas'])->default('belum lunas');
            $table->string('metode_pembayaran');
            $table->timestamps();

            $table->foreign('id_pendaftaran')->references('nomor_pendaftaran')->on('santris')->onDelete('cascade');

            $table->index('berkas_id');
            $table->index('id_pendaftaran');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pembayarans');
    }
};
