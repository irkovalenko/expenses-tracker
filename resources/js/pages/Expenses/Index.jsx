import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Expenses({ expenses }) {
    return (
        <AuthenticatedLayout>
            <Head title="Expenses" />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">Expenses overview</h2>
                            <Link
                                href={route('expenses.create')}
                                className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 text-sm"
                            >
                                Add Expense
                            </Link>
                        </div>

                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                                <tr>
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Amount</th>
                                    <th className="px-4 py-3">Category</th>
                                    <th className="px-4 py-3">Date</th>
                                    <th className="px-4 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {expenses.map((expense) => (
                                    <tr key={expense.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3">{expense.name}</td>
                                        <td className="px-4 py-3">
                                            {expense.currency?.symbol} {expense.amount}
                                        </td>
                                        <td className="px-4 py-3">{expense.category?.name}</td>
                                        <td className="px-4 py-3">{new Date(expense.created_at).toLocaleDateString()}</td>
                                       <td className="px-4 py-3">
                                            <Link
                                                href={route('expenses.show', expense.id)}
                                                className="text-indigo-500 hover:text-indigo-700 text-sm"
                                            >
                                                View
                                            </Link>
                                        </td>
                                    
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {expenses.length === 0 && (
                            <p className="text-center text-gray-500 py-6">No expenses yet!</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}