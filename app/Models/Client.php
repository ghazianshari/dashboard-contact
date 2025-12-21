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

    // !helper normalize phone
    public static function normalizePhone(string $value): string
    {
        // ?make the [first '0' or '+62'] to become 62 for indonesia country code
        return preg_replace(
            '/^0/',
            '62',
            preg_replace(
                '/^\+62/',
                '62',
                preg_replace('/\D/', '', $value)
            )
        );
    }


    // !mutator email (EXTRA PROTECTION SAFETY CAN BE FUN)
    protected function email(): Attribute
    {
        return Attribute::make(
            set: fn($value) => strtolower(trim($value))
        );
    }

    // !mutator phone (EXTRA PROTECTION SAFETY CAN BE FUN)
    protected function phone(): Attribute
    {
        return Attribute::make(
            set: fn($value) => self::normalizePhone($value)
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
