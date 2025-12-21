<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasTable('ewallets')) {
            Schema::create('ewallets', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedInteger('client_id')->nullable();
                $table->string('name');
                $table->string('username', 100)->unique(); // 6281XXXXXXXX
                $table->double('balance')->default(0);
                $table->string('channel', 50); // OVO/Dana/LinkAja
                $table->string('type', 50); // Premium/Basic
                $table->string('pin', 10); // 123789
                $table->unsignedTinyInteger('status')->nullable()->default(0); // Closed/Inactive/Active/Block
                $table->unsignedTinyInteger('app_status')->nullable()->default(0); // Closed/Inactive/Active/Block
                $table->timestamps();

                /** Index */
                $table->index(['username', 'created_at']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('ewallets')) {
            Schema::dropIfExists('ewallets');
        }
    }
};
