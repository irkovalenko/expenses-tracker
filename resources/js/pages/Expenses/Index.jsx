import ExpenseTable from '@/Components/ExpensesTable';
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

                               <ExpenseTable expenses={expenses} />

                        {expenses.length === 0 && (
                            <p className="text-center text-gray-500 py-6">No expenses yet!</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}