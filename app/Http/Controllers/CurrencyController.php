<?php

namespace App\Http\Controllers;

use App\Models\Currency;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CurrencyController extends Controller
{
    public function index()
    {
        $currencies = Currency::all();

        return Inertia::render('Currencies/Index', compact('currencies'));
    }



    public function store(Request $request)
    {
        Currency::create($request->validate([
            'name' => 'required|string|max:255',
            'symbol' => 'required'
        ]));

        return redirect()->route('Currencies.index');
    }

    public function update(Request $request, Currency $currency)
    {
        $currency->update($request->validate([
            'name' => 'required|string|max:255',
            'symbol' => 'required'
        ]));

        return redirect()->route('currencies.index');
    }



    public function destroy(Currency $currency)
    {
        $currency->delete();
        return redirect()->route('currencies.index');
    }
}
