import { useState } from "react";
import { fetchTransactions, addTransaction, updateTransaction, deleteTransaction } from "../api";

function Transactions() {
    // Example data for transactions
    const [transactions, setTransactions] = useState([]);
    const [formData, setFormData] = useState({ amount: '', description:'', date: ''});
    const [editing, setEditing] = useState(null);
    const [error, setError] = useState('');

        // Fetch all transactions on component mount
        useEffect(() => {
            const getTransactions = async () => {
                try {
                    const { data } = await fetchTransactions();
                    setTransactions(data);
                } catch (err) {
                    setError("Failed to fetch transactions. Please try again.");
                }
            };
            getTransactions();
        }, []);
    
        const handleSubmit = async (e) => {
            e.preventDefault();
    
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
                setFormData({ amount: '', description: '', date: '' });
            } catch (err) {
                setError("Failed to save transaction. Please try again.");
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
            try {
                await deleteTransaction(id);
                setTransactions((prev) => prev.filter((txn) => txn.id !== id));
            } catch (err) {
                setError("Failed to delete transaction. Please try again.");
            }
        };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-gray-800 my-6">
                Transactions Page
            </h1>

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
                                <td className="p-2 border">
                                    {transaction.description}
                                </td>
                                <td
                                    className={`p-2 border ${
                                        transaction.amount < 0
                                            ? "text-red-500"
                                            : "text-green-500"
                                    }`}
                                >
                                    {transaction.amount < 0 ? "-" : "+"}$
                                    {Math.abs(transaction.amount).toFixed(2)}
                                </td>
                                <td className="p-2 border space-x-2">
                                    <button
                                        onClick={() =>
                                            handleEditTransaction(transaction)
                                        }
                                        className="bg-yellow-500 text-white px-4 py-1 rounded-lg hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDeleteTransaction(
                                                transaction.id
                                            )
                                        }
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
                    {editTransaction
                        ? "Update Transaction"
                        : "Add Transaction"}
                </h2>
                <form
                    onSubmit={
                        editTransaction
                            ? handleUpdateTransaction
                            : handleAddTransaction
                    }
                    className="space-y-4"
                >
                    <div className="flex flex-col space-y-2">
                        <label className="font-semibold">Date</label>
                        <input
                            type="date"
                            className="w-full px-4 py-2 border rounded-lg"
                            value={
                                editTransaction
                                    ? editTransaction.date
                                    : newTransaction.date
                            }
                            onChange={(e) =>
                                editTransaction
                                    ? setEditTransaction({
                                          ...editTransaction,
                                          date: e.target.value,
                                      })
                                    : setNewTransaction({
                                          ...newTransaction,
                                          date: e.target.value,
                                      })
                            }
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label className="font-semibold">Description</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg"
                            placeholder="E.g., Rent, Salary, etc."
                            value={
                                editTransaction
                                    ? editTransaction.description
                                    : newTransaction.description
                            }
                            onChange={(e) =>
                                editTransaction
                                    ? setEditTransaction({
                                          ...editTransaction,
                                          description: e.target.value,
                                      })
                                    : setNewTransaction({
                                          ...newTransaction,
                                          description: e.target.value,
                                      })
                            }
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label className="font-semibold">Amount ($)</label>
                        <input
                            type="number"
                            className="w-full px-4 py-2 border rounded-lg"
                            placeholder="E.g., 100 or -50"
                            value={
                                editTransaction
                                    ? editTransaction.amount
                                    : newTransaction.amount
                            }
                            onChange={(e) =>
                                editTransaction
                                    ? setEditTransaction({
                                          ...editTransaction,
                                          amount: e.target.value,
                                      })
                                    : setNewTransaction({
                                          ...newTransaction,
                                          amount: e.target.value,
                                      })
                            }
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                    >
                        {editTransaction ? "Update Transaction" : "Add Transaction"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Transactions;
