// import React from 'react';
// import { NavLink, useParams } from 'react-router-dom';



// const Tasks = () => {

//     const merchants = [
//         { id: 1, name: 'PQRS Company' },
//         { id: 2, name: 'ABCD Company' },
//         { id: 3, name: 'UVWX Company' },
//         { id: 4, name: 'MNOP Company' },
//         { id: 5, name: 'EFGH Company' },
//     ];


//     const tasks = [
//         { id: 1, name: 'Task 1', status: 'pending' },
//         { id: 2, name: 'Task 2', status: 'completed' },
//         { id: 3, name: 'Task 3', status: 'in progress' },
//     ];

//     const { id } = useParams(); 
//     const merchant = merchants.find((m) => m.id === parseInt(id));

//     if (!merchant) {
//         return <div className="text-center text-red-500">Merchant not found!</div>;
//     }

//     const getStatusStyle = (status) => {
//         switch (status) {
//             case 'pending':
//                 return 'border-2 border-red-500';
//             case 'completed':
//                 return 'border-2 border-green-500';
//             case 'in progress':
//                 return 'border-2 border-yellow-500';
//             default:
//                 return '';
//         }
//     };

//     return (
//         <div className="min-h-screen bg-orange-100 p-6">
//             <div className="  p-4 ">
//             <div className="flex justify-around mb-6">
//     <input 
//         type="text" 
//         placeholder="Search by Interactions" 
//         className="p-2 border mr-3 rounded w-1/3"
//     />
//     <input 
//         type="text" 
//         placeholder="Search by Assigned Agent" 
//         className="p-2 border mr-3 rounded w-1/3"
//     />
//     <input 
//         type="text" 
//         placeholder="Search by Task Status" 
//         className="p-2 border rounded w-1/3"
//     />
// </div>

//                 <div className="space-y-8">
//                     {/* Interaction A Tasks */}
//                     <div>
//                         <div className="flex justify-between items-center mb-4">
//                             <h2 className="text-xl font-bold text-blue-900">Interaction A Tasks</h2>
//                             <NavLink to={`/merchant/${merchant.id}/tasks/assign-task`}>

//                             <button className="bg-blue-900 text-white px-4 py-2 rounded-md">Assign Task</button>
//                             </NavLink>
//                         </div>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                             {tasks.map((task) => (
//                                 <NavLink to={`/merchant/${merchant.id}/tasks/${task.id}`}>
//                                 <div key={task.id} className="bg-orange-200 p-5 cursor-pointer rounded shadow border-2 border-orange-300  hover:bg-orange-300 transition">
//                                     <div className={`inline-block px-2 py-1 text-sm rounded ${getStatusStyle(task.status)}`}>
//                                         Status: {task.status}
//                                     </div>
//                                     <h3 className="mt-2 text-xl font-semibold">{task.name}</h3>
//                                     <NavLink to={`/merchant/${merchant.id}/tasks/${task.id}/history`}>
//                                     <button className="mt-4 bg-orange-800 text-white hover:bg-orange-900 p-2 rounded">View History</button>
//                                     </NavLink>
//                                 </div>
//                                 </NavLink>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Interaction B Tasks */}
//                     <div>
//                         <div className="flex justify-between items-center mb-4">
//                             <h2 className="text-xl font-bold text-blue-900">Interaction B Tasks</h2>
//                             <NavLink to={`/merchant/${merchant.id}/tasks/assign-task`}>

//                             <button className="bg-blue-900 text-white px-4 py-2 rounded">Assign Task</button>
//                             </NavLink>
//                         </div>
//                         <div className="p-6 border rounded-lg bg-gray-50 text-center">
//                             No tasks scheduled yet!
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Tasks;

















import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import useTask from '../../Hooks/useTask';
import useMerchant from '../../Hooks/useMerchant';
import useInteraction from '../../Hooks/useInteraction';

const Tasks = () => {
    const { id } = useParams();
    const { tasks, fetchTasksByInteraction,fetchTasksByMerchant } = useTask();
    const { merchant, fetchMerchantById } = useMerchant();
    const { interactions, fetchInteractionsByMerchant } = useInteraction();

    useEffect(() => {
        if (id) {
            fetchMerchantById(id);
            fetchInteractionsByMerchant(id);
        }
    }, [id]);

    useEffect(() => {
        if (interactions.length > 0) {
            fetchTasksByMerchant(id); // Fetching tasks for first interaction
        }
    }, [interactions]);

    if (!merchant) {
        return <div className="text-center text-red-500">Merchant not found!</div>;
    }
console.log(tasks)
    const getStatusStyle = (status) => {
        switch (status) {
            case 'open':
                return 'border-2 border-red-500';
            case 'complete':
                return 'border-2 border-green-500';
            case 'inprogress':
                return 'border-2 border-yellow-500';
            default:
                return '';
        }
    };

    return (
        <div className="min-h-screen bg-orange-100 p-6">
            <div className="p-4">
                <div className="flex justify-around mb-6">
                    <input type="text" placeholder="Search by Interactions" className="p-2 border mr-3 rounded w-1/3" />
                    <input type="text" placeholder="Search by Assigned Agent" className="p-2 border mr-3 rounded w-1/3" />
                    <input type="text" placeholder="Search by Task Status" className="p-2 border rounded w-1/3" />
                </div>

                <div className="space-y-8">
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-blue-900">Interaction Tasks</h2>
                            <NavLink to={`/merchant/${merchant._id}/tasks/assign-task`}>
                                <button className="bg-blue-900 text-white px-4 py-2 rounded-md">Assign Task</button>
                            </NavLink>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {tasks.length > 0 ? (
                                tasks.map((task) => (
                                    <NavLink to={`/merchant/${merchant._id}/tasks/${task._id}`}>
                                    <div key={task._id} className="bg-orange-200 p-5 cursor-pointer rounded shadow border-2 border-orange-300 hover:bg-orange-300 transition">
                                        <div className={`inline-block px-2 py-1 text-sm rounded ${getStatusStyle(task.status)}`}>
                                            Status: {task.status}
                                        </div>
                                        <h3 className="mt-2 text-xl font-semibold">
                                            {/* <NavLink to={`/merchant/${merchant._id}/tasks/${task._id}`}> */}
                                                {task.title}
                                            {/* </NavLink> */}
                                        </h3>
                                        <h5>
                                            {task?.interactionId.title}
                                        </h5>
                                        <NavLink to={`/merchant/${merchant._id}/tasks/${task._id}/history`}>
                                            <button className="mt-4 bg-orange-800 text-white hover:bg-orange-900 p-2 rounded">View History</button>
                                        </NavLink>
                                    </div>
                                    </NavLink>
                                ))
                            ) : (
                                <div className="p-6 border rounded-lg bg-gray-50 text-center">No tasks scheduled yet!</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tasks;
