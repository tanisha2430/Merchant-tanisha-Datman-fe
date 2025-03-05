import React from 'react';

const InteractionHistory = () => {
    const history = [
        { date: '01-03-2024', action: 'Interaction created', updatedBy: 'Agent ABC', status: 'Pending' },
        { date: '03-03-2024', action: 'Status updated', updatedBy: 'Agent XYZ', status: 'In Progress' },
        { date: '05-03-2024', action: 'Follow-up added', updatedBy: 'Agent XYZ', status: 'In Progress' },
    ];

    return (
        <div className="min-h-screen bg-orange-100 flex items-center justify-center p-5">
            <div className="max-w-3xl w-full bg-orange-200 p-6 rounded-lg shadow-md">
                <h1 className="bg-blue-900 text-white px-4 py-2 text-lg rounded mb-4">Interaction History</h1>
                <div className="border p-4 rounded-lg">
                    {history.length > 0 ? (
                        <ul className="space-y-4">
                            {history.map((item, index) => (
                                <li key={index} className="bg-orange-50 p-4 rounded-lg shadow">
                                    <p><span className="font-semibold">Date:</span> {item.date}</p>
                                    <p><span className="font-semibold">Action:</span> {item.action}</p>
                                    <p><span className="font-semibold">Updated By:</span> {item.updatedBy}</p>
                                    <p><span className="font-semibold">Status:</span> <span className={`px-2 py-1 rounded ${item.status === 'Pending' ? 'bg-yellow-200' : item.status === 'In Progress' ? 'bg-blue-200' : 'bg-green-200'}`}>{item.status}</span></p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No history available for this interaction.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InteractionHistory;
