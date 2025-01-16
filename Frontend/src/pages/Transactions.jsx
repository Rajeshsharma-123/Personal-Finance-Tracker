import { useState } from "react";

function Transactions() {
    // Example data for transactions
    const [transactions, setTransactions] = useState([
        { id: 1, date: "2025-01-01", description: "Groceries", amount: -50.75 },
        { id: 2, date: "2025-01-05", description: "Salary", amount: 1500 },
        { id: 3, date: "2025-01-10", description: "Electricity Bill", amount: -120.5 },
    ]);

    const [newTransaction, setNewTransaction] = useState({
        date: "",
        description: "",
        amount: "",
    });

    const handleAddTransaction = (e) => {
        e.preventDefault();
        const { date, description, amount } = newTransaction;

        if (!date || !description || !amount) {
            alert("Please fill in all fields.");
            return;
        }

        setTransactions([
            ...transactions,
            { id: transactions.length + 1, date, description, amount: parseFloat(amount) },
        ]);

        setNewTransaction({ date: "", description: "", amount: "" });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-gray-800 my-6">
                Transactions Page
            </h1>

            {/* Transactions Table */}
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Transaction History</h2>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="p-2 border">Date</th>
                            <th className="p-2 border">Description</th>
                            <th className="p-2 border">Amount</th>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Transaction Form */}
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Transaction</h2>
                <form onSubmit={handleAddTransaction} className="space-y-4">
                    <div className="flex flex-col space-y-2">
                        <label className="font-semibold">Date</label>
                        <input
                            type="date"
                            className="w-full px-4 py-2 border rounded-lg"
                            value={newTransaction.date}
                            onChange={(e) =>
                                setNewTransaction({ ...newTransaction, date: e.target.value })
                            }
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label className="font-semibold">Description</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg"
                            placeholder="E.g., Rent, Salary, etc."
                            value={newTransaction.description}
                            onChange={(e) =>
                                setNewTransaction({ ...newTransaction, description: e.target.value })
                            }
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label className="font-semibold">Amount ($)</label>
                        <input
                            type="number"
                            className="w-full px-4 py-2 border rounded-lg"
                            placeholder="E.g., 100 or -50"
                            value={newTransaction.amount}
                            onChange={(e) =>
                                setNewTransaction({ ...newTransaction, amount: e.target.value })
                            }
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                    >
                        Add Transaction
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Transactions;
