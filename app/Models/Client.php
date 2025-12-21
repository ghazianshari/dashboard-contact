<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
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

    // !mutator email
    protected function email(): Attribute
    {
        return Attribute::make(
            set: fn($value) => strtolower(trim($value))
        );
    }

    // !mutator phone
    protected function phone(): Attribute
    {
        return Attribute::make(
            set: fn($value) => preg_replace('/\D/', '', $value)
        );
    }

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
