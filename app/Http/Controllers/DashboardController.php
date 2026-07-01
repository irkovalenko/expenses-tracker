<?php

namespace App\Http\Controllers;

use App\Models\Currency;
use App\Models\Expense;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $expenses = Expense::with(['currency', 'category'])
            ->where('user_id', $request->user()->id)
            ->get();

        $currencies = Currency::all();
        $defaultCurrency = Currency::where('symbol', '€')->first();

        return Inertia::render('Dashboard', compact('expenses', 'currencies', 'defaultCurrency'));
    }
}
