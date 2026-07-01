import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function Categories({ categories }) {

    const [showModal, setShowModal] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editingName, setEditingName] = useState('');

    useEffect(() => {
        const handleClickOutside = () => setEditingId(null);
        if (editingId) {
            document.addEventListener('click', handleClickOutside);
        }
        return () => document.removeEventListener('click', handleClickOutside);
    }, [editingId]);

    const handleCreate = (e) => {
        e.preventDefault();
        router.post(route('categories.store'), { name: newCategoryName }, {
            onSuccess: () => {
                setNewCategoryName('');
                setShowModal(false);
            },
        });
    };

    const startEditing = (e, category) => {
        e.stopPropagation();
        setEditingId(category.id);
        setEditingName(category.name);
    };

    const saveEdit = (id) => {
        router.put(route('categories.update', id), { name: editingName }, {
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
                            <button
                                type="button"
                                onClick={() => setShowModal(true)}
                                className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 text-sm"
                            >
                                + Add new category
                            </button>
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
                                                    onClick={(e) => e.stopPropagation()}
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

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Add New Category</h3>
                        <form onSubmit={handleCreate}>
                            <input
                                type="text"
                                placeholder="Category name"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                className="border rounded w-full py-2 px-3 mb-4"
                                autoFocus
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}