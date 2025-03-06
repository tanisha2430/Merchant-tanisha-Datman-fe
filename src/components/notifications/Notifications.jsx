import { useState } from 'react';

export default function NotificationsPage() {
    const [selectedFilter, setSelectedFilter] = useState('all');

    const notifications = [
        { id: 2, type: 'alert', message: 'Payment failed for Merchant B' },
        { id: 3, type: 'reminder', message: 'Follow up with Merchant C' },
    ];

    const filteredNotifications = selectedFilter === 'all'
        ? notifications
        : notifications.filter((notif) => notif.type === selectedFilter);

    return (
        <div className="p-6 bg-orange-100 h-screen">
            <h1 className="text-2xl font-bold mb-4">Notifications</h1>
            <div className="flex gap-4 mb-6">
                <button 
                    className={`px-4 py-2 rounded ${selectedFilter === 'all' ? 'bg-orange-800' : 'bg-blue-900'} text-white`}
                    onClick={() => setSelectedFilter('all')}
                >
                    All
                </button>
              
                <button 
                    className={`px-4 py-2 rounded ${selectedFilter === 'alert' ? 'bg-orange-800' : 'bg-blue-900'} text-white`}
                    onClick={() => setSelectedFilter('alert')}
                >
                    Alert
                </button>
                <button 
                    className={`px-4 py-2 rounded ${selectedFilter === 'reminder' ? 'bg-orange-800' : 'bg-blue-900'} text-white`}
                    onClick={() => setSelectedFilter('reminder')}
                >
                    Reminder
                </button>
            </div>
            <div className="space-y-4">
                {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notif) => (
                        <div key={notif.id} className="bg-white p-4 rounded shadow border border-gray-300">
                            <p className="text-lg font-medium">{notif.message}</p>
                            <span className="text-sm text-gray-500">Type: {notif.type}</span>
                        </div>
                    ))
                ) : (
                    <p className="text-red-500">No notifications found!</p>
                )}
            </div>
        </div>
    );
}
