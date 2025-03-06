import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useTask from '../../Hooks/useTask';

const TaskDetails = () => {
    const { tid } = useParams();
    const { fetchTaskById } = useTask();
    const [task, setTask] = useState(null);

    useEffect(() => {
        const getTask = async () => {
            if (tid) {
                const fetchedTask = await fetchTaskById(tid);
                if (fetchedTask) setTask(fetchedTask);
            }
        };
        getTask();
    }, [tid]);

    if (!task) {
        return <div className="text-center text-red-500">Loading task details...</div>;
    }

    return (
        <div className="h-screen bg-orange-100 flex items-center justify-center">
            <div className="max-w-3xl w-full bg-orange-200 p-6 rounded-lg shadow-md">
                <button className="bg-blue-900 text-white px-4 py-2 rounded mb-4">
                    {task.interactionId?.title} - Task Details
                </button>
                <div className="border p-6 rounded-lg">
                    <p className="mb-2"><strong>Interaction:</strong> {task.interactionId?.title}</p>
                    <p className="mb-2"><strong>Task Title:</strong> {task.title}</p>
                    <p className="mb-2"><strong>Task ID:</strong> {task._id}</p>
                    <p className="mb-2"><strong>Merchant Name:</strong> {task.merchantId?.name}</p>
                    <p className="mb-2"><strong>Business Type:</strong> {task.businessType}</p>
                    <p className="mb-2"><strong>Assigned to:</strong> {task.assignedTo?.username} ({task.assignedTo?.email})</p>
                    <p className="mb-2"><strong>Created by:</strong> {task.createdBy?.username} ({task.createdBy?.email})</p>
                    <p className="mb-2"><strong>Created on:</strong> {new Date(task.createdOn).toLocaleString()}</p>
                    <p className="mb-2"><strong>Description:</strong> {task.description}</p>
                    <p className="mb-2"><strong>Follow-up Date:</strong> {new Date(task.followUpDate).toLocaleString()}</p>
                    <p className="mb-2"><strong>Reminder Date:</strong> {new Date(task.reminderDate).toLocaleDateString()} at {task.reminderTime}</p>
                    <p className="mb-2"><strong>Status:</strong> 
                        <span className={`ml-2 ${task.status === 'open' ? 'text-red-500' : 'text-green-500'}`}>
                            {task.status}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TaskDetails;
