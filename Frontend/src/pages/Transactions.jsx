import { useEffect, useState } from 'react';
import { fetchTransactions, deleteTransaction } from '../api';

function Transactions() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchTransactions();
            setTransactions(response.data);
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        await deleteTransaction(id);
        setTransactions(transactions.filter((t) => t.id !== id));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Your Transactions
            </h1>
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
                {transactions.length > 0 ? (
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="text-left py-2 px-4">Description</th>
                                <th className="text-right py-2 px-4">Amount</th>
                                <th className="text-right py-2 px-4">Date</th>
                                <th className="text-center py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((t) => (
                                <tr key={t.id} className="border-b">
                                    <td className="py-2 px-4">{t.description}</td>
                                    <td className="text-right py-2 px-4">
                                        ${t.amount.toFixed(2)}
                                    </td>
                                    <td className="text-right py-2 px-4">
                                        {new Date(t.date).toLocaleDateString()}
                                    </td>
                                    <td className="text-center py-2 px-4">
                                        <button
                                            onClick={() => handleDelete(t.id)}
                                            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-500">No transactions found.</p>
                )}
            </div>
        </div>
    );
}

export default Transactions;
