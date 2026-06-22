import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function Categories({ categories }) {

    const [newCategoryName, setNewCategoryName] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editingName, setEditingName] = useState('');

    // clicking anywhere cancels editing
    useEffect(() => {
        const handleClickOutside = () => setEditingId(null);
        if (editingId) {
            document.addEventListener('click', handleClickOutside);
        }
        return () => document.removeEventListener('click', handleClickOutside);
    }, [editingId]);

    const handleCreate = (e) => {
        e.preventDefault();
        router.post(route('categories.store'), {
            name: newCategoryName,
        }, {
            onSuccess: () => setNewCategoryName(''),
        });
    };

    const startEditing = (e, category) => {
        e.stopPropagation(); // prevent click from bubbling to document
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

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this category?')) {
            router.delete(route('categories.delete', id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Categories" />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
                            <form onSubmit={handleCreate} className="flex gap-2">
                                <input
                                    type="text"
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    placeholder="New category name"
                                    className="border rounded px-3 py-2 text-sm"
                                />
                                <button
                                    type="submit"
                                    className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 text-sm"
                                >
                                    Add new category
                                </button>
                            </form>
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
                                                    onClick={(e) => e.stopPropagation()} // prevent cancel when clicking input
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') saveEdit(category.id);
                                                        if (e.key === 'Escape') setEditingId(null);
                                                    }}
                                                    autoFocus
                                                    className="border rounded px-2 py-1 w-full"
                                                />
                                            ) : (
                                                <span
                                                    onClick={(e) => !category.is_default && startEditing(e, category)}
                                                    className={!category.is_default ? 'cursor-pointer hover:text-indigo-500' : 'text-gray-400'}
                                                >
                                                    {category.name} {category.is_default ? '🔒' : ''}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            {!category.is_default && (
                                                <button
                                                    onClick={() => handleDelete(category.id)}
                                                    className="text-red-500 hover:text-red-700 text-sm"
                                                >
                                                    Delete
                                                </button>
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