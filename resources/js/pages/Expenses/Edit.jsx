import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit( { expense, categories, currencies }) {
    const { data, setData, put, processing, errors } = useForm({
        name: expense.name,
        category_id: expense.category_id,
        currency_id: expense.currency_id,
        amount: expense.amount,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('expenses.update', expense.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit expense" />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <h2 className="text-xl font-semibold mb-6">Edit expense</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="border rounded w-full py-2 px-3"
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>

                            <div className="mb-4">
                               <select
                                    value={data.category_id}
                                    onChange={(e) => setData('category_id', e.target.value)}
                                    className="border rounded w-full py-2 px-3"
                                >
                                    <option value="">Select category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                  <select
                                    value={data.currency_id}
                                    onChange={(e) => setData('currency_id', e.target.value)}
                                    className="border rounded w-full py-2 px-3"
                                >
                                    <option value="">Select currency</option>
                                    {currencies.map((currency) => (
                                        <option key={currency.id} value={currency.id}>
                                            {currency.symbol}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <input
                                    type="number"
                                    placeholder="Amount"
                                    value={data.amount}
                                    onChange={(e) => setData('amount', e.target.value)}
                                    className="border rounded w-full py-2 px-3"
                                />
                            </div>
                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
                            >
                                Update
                            </button>

                                <a href={route('expenses.index')}
                                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}