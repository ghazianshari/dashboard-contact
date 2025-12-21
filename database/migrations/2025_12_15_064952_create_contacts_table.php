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
        if (!Schema::hasTable('contacts')) {
            Schema::create('contacts', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedInteger('location_id')->nullable();
                $table->unsignedInteger('client_id')->nullable();
                $table->string('name');
                $table->string('phone_code', 5);
                $table->string('phone', 50)->unique();
                $table->string('cellular_operator', 50);
                $table->double('balance')->default(0);
                $table->integer('active_periode_day'); // 30 days
                $table->dateTime('grace_period'); // 08 Sept 2025 23:59
                $table->dateTime('expired_date'); // 08 Okt 2025 23:59
                $table->unsignedTinyInteger('status')->nullable()->default(0);
                $table->timestamps();

                /** Foreign */
                // $table->foreign('location_id')
                //     ->references('id') // location id
                //     ->on('locations')
                //     ->onDelete('cascade');

                /** Index */
                $table->index(['phone', 'created_at']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('contacts')) {
            Schema::dropIfExists('contacts');
        }
    }
};
