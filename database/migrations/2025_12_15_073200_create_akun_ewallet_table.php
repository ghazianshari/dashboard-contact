<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('akun_ewallet', function (Blueprint $table) {
            $table->id();
            $table->string('nomor_ovo')->unique();
            $table->string('nama');
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->enum('account_type', ['premium', 'basic'])->default('basic');
            $table->enum('status_aplikasi', ['active', 'blocked', 'closed'])->default('active');
            $table->string('pin');
            $table->unsignedBigInteger('client_id');
            $table->timestamps();

            $table->foreign('client_id')->references('id')->on('clients')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('akun_ewallet');
    }
};
