<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Expense extends Model
{
    protected $fillable = ["name", "user_id", "amount", "category_id", "currency_id"];

    /** @return BelongsTo<User, Expense> */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /** @return BelongsTo<Category, Expense> */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /** @return BelongsTo<Currency, Expense> */
    public function currency(): BelongsTo
    {
        return $this->belongsTo(Currency::class);
    }
}
