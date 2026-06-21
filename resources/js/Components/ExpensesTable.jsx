import { Link, router } from '@inertiajs/react';

export default function ExpenseTable({ expenses }) {

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this expense?')) {
            router.delete(route('expenses.destroy', id));
        }
    };

    return (
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
                        <td className="px-4 py-3">{expense.currency?.symbol} {expense.amount}</td>
                        <td className="px-4 py-3">{expense.category?.name}</td>
                        <td className="px-4 py-3">{new Date(expense.created_at).toLocaleDateString()}</td>
                        <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                                <Link href={route('expenses.show', expense.id)} className="text-indigo-500 hover:text-indigo-700 text-sm">
                                    View
                                </Link>
                                <Link href={route('expenses.edit', expense.id)} className="text-blue-500 hover:text-blue-700 text-sm">
                                    Edit
                                </Link>
                                <button onClick={() => handleDelete(expense.id)} className="text-red-500 hover:text-red-700 text-sm">
                                    Delete
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}