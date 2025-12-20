<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    const STATUS_INACTIVE = 0;
    const STATUS_ACTIVE   = 1;
    const STATUS_DELETED  = 99;

    protected $fillable = [
        'name',
        'phone',
        'email',
        'description',
        'status',
    ];

    // !default value waktu buat client baru
    protected $attributes = [
        'status' => self::STATUS_ACTIVE,
    ];

    // !scope query active clients
    public function scopeActive($query)
    {
        return $query->where('status', self::STATUS_ACTIVE);
    }
}
