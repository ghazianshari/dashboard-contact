<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    const STATUS_INACTIVE = 0;
    const STATUS_ACTIVE   = 1;
    const STATUS_SUSPENDED = 2;
    const STATUS_EXPIRED  = 99;

    protected $fillable = [
        'location_id',
        'client_id',
        'name',
        'phone_code',
        'phone',
        'cellular_operator',
        'balance',
        'active_periode_day',
        'grace_period',
        'expired_date',
        'status',
    ];

    protected $casts = [
        'balance' => 'float',
        'grace_period' => 'datetime',
        'expired_date' => 'datetime',
        'status' => 'integer',
    ];

    // !renew contact periode
    public function renew(int $days, int $graceDays = 7): void
    {
        if ($days <= 0) {
            throw new \InvalidArgumentException('Active period must be greater than 0');
        }

        $expired = now()->addDays($days);

        $this->update([
            'active_periode_day' => $days,
            'expired_date' => $expired,
            'grace_period' => $expired->copy()->addDays($graceDays),
            'status' => self::STATUS_ACTIVE,
        ]);
    }

    // !default value waktu buat contact baru
    protected $attributes = [
        'status' => self::STATUS_ACTIVE,
    ];

    // !helper check contact is active
    public function isActive(): bool
    {
        return $this->status === self::STATUS_ACTIVE
            && now()->lte($this->expired_date);
    }

    // !helper check contact in grace period
    public function isInGracePeriod(): bool
    {
        return now()->gt($this->expired_date)
            && now()->lte($this->grace_period);
    }

    // !helper check contact expired
    public function isExpired(): bool
    {
        return now()->gt($this->grace_period)
            || $this->status === self::STATUS_EXPIRED;
    }

    // !scope query active contacts
    public function scopeActive($query)
    {
        return $query->where('status', self::STATUS_ACTIVE);
    }

    // !scope query suspended contacts
    public function scopeSuspended($query)
    {
        return $query->where('status', self::STATUS_SUSPENDED);
    }

    // !scope query expired contacts
    public function scopeExpired($query)
    {
        return $query->where('status', self::STATUS_EXPIRED);
    }
}
