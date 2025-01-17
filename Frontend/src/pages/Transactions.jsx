import { useState, useEffect } from "react";
import {
    fetchTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
} from "../api";

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [formData, setFormData] = useState({ amount: "", description: "", date: "" });
    const [editing, setEditing] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Fetch all transactions on component mount
    useEffect(() => {
        const getTransactions = async () => {
            setLoading(true);
            try {
                const { data } = await fetchTransactions();
                setTransactions(data);
            } catch (err) {
                setError("Failed to fetch transactions. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        getTransactions();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editing) {
                // Update transaction
                const { data } = await updateTransaction(editing.id, formData);
                setTransactions((prev) =>
                    prev.map((txn) => (txn.id === editing.id ? data : txn))
                );
                setEditing(null);
            } else {
                // Add transaction
                const { data } = await addTransaction(formData);
                setTransactions((prev) => [...prev, data]);
            }
            setFormData({ amount: "", description: "", date: "" });
            setError("");
        } catch (err) {
            setError(
                editing
                    ? "Failed to update the transaction. Please try again."
                    : "Failed to add the transaction. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (transaction) => {
        setEditing(transaction);
        setFormData({
            amount: transaction.amount,
            description: transaction.description,
            date: transaction.date.split("T")[0], // Format date for input
        });
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await deleteTransaction(id);
            setTransactions((prev) => prev.filter((txn) => txn.id !== id));
            setError("");
        } catch (err) {
            setError("Failed to delete the transaction. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-gray-800 my-6">
                Transactions Page
            </h1>

            {/* Error Message */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Loading Indicator */}
            {loading && <p className="text-blue-500 mb-4">Loading...</p>}

            {/* Transactions Table */}
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Transaction History
                </h2>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="p-2 border">Date</th>
                            <th className="p-2 border">Description</th>
                            <th className="p-2 border">Amount</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id} className="text-center">
                                <td className="p-2 border">{transaction.date}</td>
                                <td className="p-2 border">{transaction.description}</td>
                                <td
                                    className={`p-2 border ${
                                        transaction.amount < 0
                                            ? "text-red-500"
                                            : "text-green-500"
                                    }`}
                                >
                                    {transaction.amount < 0 ? "-" : "+"}${Math.abs(transaction.amount).toFixed(2)}
                                </td>
                                <td className="p-2 border space-x-2">
                                    <button
                                        onClick={() => handleEdit(transaction)}
                                        className="bg-yellow-500 text-white px-4 py-1 rounded-lg hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(transaction.id)}
                                        className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Transaction Form */}
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    {editing ? "Update Transaction" : "Add Transaction"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col space-y-2">
                        <label className="font-semibold">Date</label>
                        <input
                            type="date"
                            className="w-full px-4 py-2 border rounded-lg"
                            value={formData.date}
                            onChange={(e) =>
                                setFormData({ ...formData, date: e.target.value })
                            }
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label className="font-semibold">Description</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg"
                            placeholder="E.g., Rent, Salary, etc."
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label className="font-semibold">Amount ($)</label>
                        <input
                            type="number"
                            className="w-full px-4 py-2 border rounded-lg"
                            placeholder="E.g., 100 or -50"
                            value={formData.amount}
                            onChange={(e) =>
                                setFormData({ ...formData, amount: e.target.value })
                            }
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                    >
                        {editing ? "Update Transaction" : "Add Transaction"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Transactions;
