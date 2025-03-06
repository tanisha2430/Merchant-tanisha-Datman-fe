import { useEffect, useState } from "react";
import useTask from "../../Hooks/useTask";
import { useParams } from "react-router-dom";

export default function NotificationsPage() {
    const { tasks, fetchTasksByMerchant, loading } = useTask();
    const { id } = useParams();
    const [selectedFilter, setSelectedFilter] = useState("all");

    useEffect(() => {
        fetchTasksByMerchant(id);
    }, [id]);

    console.log(tasks);

    const filteredNotifications = selectedFilter === "all"
        ? tasks
        : tasks.filter((task) => task.status === selectedFilter);

    return (
        <div className="p-6 bg-orange-100 h-auto">
            <h1 className="text-2xl font-bold mb-4">Notifications</h1>

            <div className="flex gap-4 mb-6">
                {["all", "open", "inprogress", "complete"].map((status) => (
                    <button
                        key={status}
                        className={`px-4 py-2 rounded ${
                            selectedFilter === status ? "bg-orange-800" : "bg-blue-900"
                        } text-white`}
                        onClick={() => setSelectedFilter(status)}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                ))}
            </div>

            {loading ? (
                <p className="text-gray-700">Loading notifications...</p>
            ) : (
                <div className="space-y-4">
                    {filteredNotifications.length > 0 ? (
                        filteredNotifications.map((task) => {
                            const reminderDateObj = task.reminderDate ? new Date(task.reminderDate) : null;
                            const formattedDate = reminderDateObj
                                ? reminderDateObj.toLocaleDateString("en-IN", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })
                                : "N/A";
                            const formattedTime = reminderDateObj
                                ? reminderDateObj.toLocaleTimeString("en-IN", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                })
                                : "N/A";

                            return (
                                <div key={task._id} className="bg-white p-4 rounded shadow border border-gray-300">
                                    <p className="text-lg font-medium">Task Reminder: {task.title}</p>
                                    <p className="text-sm font-medium text-blue-900">
                                        Task Reminder: {formattedDate} at {formattedTime}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        Business Type: {task.businessType}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        Assigned To: {task.assignedTo?.username || "Unassigned"}
                                    </p>
                                    <span className="text-sm font-medium text-yellow-800">Status: {task.status}</span>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-red-500">No notifications found!</p>
                    )}
                </div>
            )}
        </div>
    );
}
