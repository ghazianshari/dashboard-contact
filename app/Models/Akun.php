<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Akun extends Model
{
    // !set $table karena nama table-nya tidak mengikuti konvensi plural Laravel
    protected $table = 'akun';

    protected $fillable = [
        'nama',
        'nomor_telepon',
        'last_balance',
        'client_id',
        'expired',
        'status',
    ];

    // !otomatis mengubah tipe data saat dibaca/ditulis ke database
    protected $casts = [
        'last_balance' => 'decimal:2',
        'expired' => 'date',
    ];

    // !relasi one-to-many dengan model Client
    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
}
