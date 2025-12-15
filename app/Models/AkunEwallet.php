<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AkunEwallet extends Model
{
    // !set $table karena nama table-nya tidak mengikuti konvensi plural Laravel
    protected $table = 'akun_ewallet';

    protected $fillable = [
        'nomor_ovo',
        'nama',
        'status',
        'account_type',
        'status_aplikasi',
        'pin',
        'client_id',
    ];

    // !relasi one-to-many dengan model Client
    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
}
