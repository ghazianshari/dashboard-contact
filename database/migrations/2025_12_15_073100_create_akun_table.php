<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('akun', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('nomor_telepon')->unique();
            $table->decimal('last_balance', 15, 2)->default(0);
            $table->unsignedBigInteger('client_id');
            $table->date('expired');
            $table->enum('status', ['active', 'inactive', 'blocked'])->default('active');
            $table->timestamps();

            $table->foreign('client_id')->references('id')->on('clients')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('akun');
    }
};
