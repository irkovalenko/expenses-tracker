<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();

        return Inertia::render('Categories/Index', compact('categories'));
    }



    public function store(Request $request)
    {
        $validated = $request->validate(
            [
                'name' => 'required|string|max:255|unique:categories,name'
            ]
        );

        Category::create([
            'name' => $validated['name'],
            'user_id' => $request->user()->id,
            'is_default' => false,
        ]);


        return redirect()->route('categories.index');
    }

    public function update(Request $request, Category $category)
    {
        if ($category->is_default) {
            abort(403, "This category can\'t be edited.");
        }

        $category->update($request->validate([
            'name' => 'required|string|max:255|unique:categories.name',
        ]));

        return redirect()->route('categories.index');
    }



    public function destroy(Category $category)
    {
        if ($category->is_default) {
            abort(403, "This category can\'t be deleted.");
        }

        $category->delete();
        return redirect()->route('categories.index');
    }
}
