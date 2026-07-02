import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer, PieChart, Pie, Legend, Area, AreaChart, CartesianGrid } from 'recharts';
import { useState } from 'react';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];

export default function Dashboard({ expenses, currencies, defaultCurrency }) {
    const [selectedCurrencyId, setSelectedCurrencyId] = useState(defaultCurrency?.id ?? currencies[0]?.id);

    const selectedCurrency = currencies.find(c => c.id === selectedCurrencyId);

    const barData = expenses
        .filter(expense => Number.parseInt(expense.currency_id) === Number.parseInt(selectedCurrencyId))
        .reduce((acc, expense) => {
            const category = expense.category.name;
            const existing = acc.find(item => item.category === category);
            if (existing) {
                existing.amount += Number.parseFloat(expense.amount);
            } else {
                acc.push({ category, amount: Number.parseFloat(expense.amount) });
            }
            return acc;
        }, [])
        .sort((a, b) => b.amount - a.amount);

    const pieData = expenses
        .reduce((acc, expense) => {
            const currency = expense.currency.symbol;
            const existing = acc.find(item => item.name === currency);
            if (existing) {
                existing.value += Number.parseFloat(expense.amount);
            } else {
                acc.push({ name: currency, value: Number.parseFloat(expense.amount) });
            }
            return acc;
        }, []);

    const lineData = expenses
    .filter(expense => Number.parseInt(expense.currency_id) === Number.parseInt(selectedCurrencyId))
    .reduce((acc, expense) => {
        const date = expense.created_at.split('T')[0]; // gives you "2024-01-15"
        const existing = acc.find(item => item.date === date);
        if (existing) {
            existing.amount += Number.parseFloat(expense.amount);
        } else {
            acc.push({ date, amount: Number.parseFloat(expense.amount) });
        }
        return acc;
    }, [])
    .sort((a, b) => new Date(a.date) - new Date(b.date));

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-slate-900 p-2 border rounded shadow">
                    <p className="text-sm text-indigo-400">{label}</p>
                    <p className="text-sm font-semibold text-indigo-400">{payload[0].value.toFixed(2)}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            {/* Bar chart */}
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
    <div className="grid grid-cols-3 gap-6">

        {/* Bar chart */}
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-4 text-gray-900">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-sm">
                        Expenses by category ({selectedCurrency?.symbol ?? '€'})
                    </h3>
                    <select
                        value={selectedCurrencyId ?? ''}
                        onChange={(e) => setSelectedCurrencyId(parseInt(e.target.value))}
                        className="border rounded px-2 py-1 text-xs"
                    >
                        {currencies.map(currency => (
                            <option key={currency.id} value={currency.id}>
                                {currency.symbol} — {currency.name}
                            </option>
                        ))}
                    </select>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={barData}>
                        <XAxis dataKey="category" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip content={<CustomTooltip />} />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar dataKey="amount" fill="#6366f1" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Pie chart */}
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-4 text-gray-900">
                <h3 className="font-semibold text-sm mb-4">Expenses by currency</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={70}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => value.toFixed(2)} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Area chart */}
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-4 text-gray-900">
                <h3 className="font-semibold text-sm mb-4">
                    Spending over time ({selectedCurrency?.symbol ?? '€'})
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={lineData}>
                        <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip formatter={(value) => value.toFixed(2)} />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Area type="monotone" dataKey="amount" stroke="#6366f1" fill="#6366f1" dot={false} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

    </div>
</div>
                
                
            </div>

        </AuthenticatedLayout>
    );
}