import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ expense }) {
    return (
        <AuthenticatedLayout>
            <Head title={expense.name} />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">{expense.name}</h2>
                            <Link
                                href={route('expenses.index')}
                                className="text-indigo-500 hover:text-indigo-700 text-sm"
                            >
                                ← Back to Expenses
                            </Link>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <span className="text-gray-500 text-sm">Amount</span>
                                <p className="font-semibold">{expense.currency?.symbol} {expense.amount}</p>
                            </div>
                            <div>
                                <span className="text-gray-500 text-sm">Category</span>
                                <p className="font-semibold">{expense.category?.name}</p>
                            </div>
                            <div>
                                <span className="text-gray-500 text-sm">Date</span>
                                <p className="font-semibold">{new Date(expense.created_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}