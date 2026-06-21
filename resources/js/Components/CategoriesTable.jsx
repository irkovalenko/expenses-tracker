import { Link, router } from '@inertiajs/react';

export default function categoryTable({ categories }) {

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this category?')) {
            router.delete(route('categories.destroy', id));
        }
    };

    return (
        <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {categories.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">{category.name}</td>
                        <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                                <Link href={route('categories.show', category.id)} className="text-indigo-500 hover:text-indigo-700 text-sm">
                                    View
                                </Link>
                                <Link href={route('categories.edit', category.id)} className="text-blue-500 hover:text-blue-700 text-sm">
                                    Edit
                                </Link>
                                <button onClick={() => handleDelete(category.id)} className="text-red-500 hover:text-red-700 text-sm">
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