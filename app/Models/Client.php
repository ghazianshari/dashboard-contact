<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Client extends Model
{
    protected $fillable = ['name'];

    // !relasi one-to-many dengan model Akun
    public function akuns(): HasMany
    {
        return $this->hasMany(Akun::class);
    }

    // !relasi one-to-many dengan model AkunEwallet
    public function ewallets(): HasMany
    {
        return $this->hasMany(AkunEwallet::class);
    }
}
