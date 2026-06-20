<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Currency;
use App\Models\Expense;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    public function index(Request $request)
    {
        $expenses = Expense::with(['currency', 'category'])
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return Inertia::render('Expenses/Index', [
            'expenses' => $expenses,
        ]);
    }


    public function create()
    {
        return Inertia::render('Expenses/Create', [
            'categories' => Category::all(),
            'currencies' => Currency::all(),
        ]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate(
            [
                'name' => 'required|string|max:255|min:3',
                'amount' => 'required|numeric|min:0',
                'category_id' => 'required|exists:categories,id',
                'currency_id' => 'required|exists:currencies,id'
            ]
        );

        $validated['user_id'] = $request->user()->id;

        Expense::create($validated);

        return redirect()->route('expenses.index');
    }


    public function show(Expense $expense)
    {
        return Inertia::render('Expenses/Show', [
            'expense' => $expense->load(['currency', 'category'])
        ]);
    }


    public function edit(Expense $expense)
    {
        //
    }


    public function update(Request $request, Expense $expense)
    {
        //
    }


    public function destroy(Expense $expense)
    {
        //
    }
}
