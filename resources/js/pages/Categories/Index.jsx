import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function Categories({ categories }) {
    const [editingId, setEditingId] = useState(null);
    const [editingName, setEditingName] = useState('');

    const startEditing = (category) => {
        setEditingId(category.id);
        setEditingName(category.name);
    };

    const saveEdit = (id) => {
        router.put(route('categories.update', id), {
            name: editingName,
        }, {
            onSuccess: () => setEditingId(null),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Categories" />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
                        </div>

                        <table className="w-full text-sm text-left">
                            <tbody>
                                {categories.map((category) => (
                                    <tr key={category.id}>
                                        <td className="px-4 py-3">
                                            {editingId === category.id ? (
                                                <input
                                                    value={editingName}
                                                    onChange={(e) => setEditingName(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') saveEdit(category.id);
                                                        if (e.key === 'Escape') setEditingId(null);
                                                    }}
                                                    autoFocus
                                                    className="border rounded px-2 py-1 w-full"
                                                />
                                            ) : (
                                                <span
                                                    onClick={() => startEditing(category)}
                                                    className="cursor-pointer hover:text-indigo-500"
                                                >
                                                    {category.name}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}