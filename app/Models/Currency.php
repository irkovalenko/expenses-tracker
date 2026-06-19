<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Currency extends Model
{
    protected $fillable = ["name", "symbol"];

    /** @return HasMany<Expense, Currency> */
    public function expenses(): HasMany
    {
        return $this->hasMany(Expense::class);
    }
}
