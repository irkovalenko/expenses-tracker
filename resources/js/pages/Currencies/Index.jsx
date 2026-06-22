import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function Categories({ currencies }) {
    const [editingId, setEditingId] = useState(null);
    const [editingName, setEditingName] = useState('');

    const startEditing = (currency) => {
        setEditingId(currency.id);
        setEditingName(currency.name);
    };

    const saveEdit = (id) => {
        router.put(route('currencies.update', id), {
            name: editingName,
        }, {
            onSuccess: () => setEditingId(null),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Currencies" />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">Currencies</h2>
                        </div>

                        <table className="w-full text-sm text-left">
                            <tbody>
                                {currencies.map((currency) => (
                                    <tr key={currency.id}>
                                        <td className="px-4 py-3">
                                            {editingId === currency.id ? (
                                                <input
                                                    value={editingName}
                                                    onChange={(e) => setEditingName(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') saveEdit(currency.id);
                                                        if (e.key === 'Escape') setEditingId(null);
                                                    }}
                                                    autoFocus
                                                    className="border rounded px-2 py-1 w-full"
                                                />
                                            ) : (
                                                <span
                                                    onClick={() => startEditing(currency)}
                                                    className="cursor-pointer hover:text-indigo-500"
                                                >
                                                    {currency.name} ({currency.symbol})
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