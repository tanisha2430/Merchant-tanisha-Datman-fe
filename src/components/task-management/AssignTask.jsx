// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import Select from 'react-select';

// const merchants = [
//     { id: 1, name: 'PQRS Company' },
//     { id: 2, name: 'ABCD Company' },
//     { id: 3, name: 'UVWX Company' },
//     { id: 4, name: 'MNOP Company' },
//     { id: 5, name: 'EFGH Company' },
// ];

// const options = {
//     businessTypes: [
//         { value: 'Retail', label: 'Retail' },
//         { value: 'Wholesale', label: 'Wholesale' },
//         { value: 'Service', label: 'Service' },
//     ],
//     interactionTypes: [
//         { value: 'Call', label: 'Call' },
//         { value: 'Meeting', label: 'Meeting' },
//         { value: 'Email', label: 'Email' },
//     ],
//     statuses: [
//         { value: 'Open', label: 'Open' },
//         { value: 'In Progress', label: 'In Progress' },
//         { value: 'Closed', label: 'Closed' },
//     ],
// };

// const AssignTask = () => {
//     const { id } = useParams();
//     const [merchant, setMerchant] = useState({ id: '', name: '' });

//     useEffect(() => {
//         const foundMerchant = merchants.find((m) => m.id === parseInt(id));
//         if (foundMerchant) {
//             setMerchant(foundMerchant);
//         }
//     }, [id]);


//     return (
//         <div className="min-h-screen bg-orange-100 flex items-center justify-center p-3">
//             <div className="max-w-3xl w-full bg-orange-200 p-6 rounded-lg shadow-md">
//                 {/* <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4">Start a new Interaction</button> */}

//                 <div className="border p-6 rounded-lg">
//                     <h2 className="bg-blue-900 text-white px-4 py-2 rounded mb-4">Assign Task</h2>
//                     <div className="grid grid-cols-2 gap-4">
//                         <div>
//                             <label className="block font-semibold">Merchant ID:</label>
//                             <input value={merchant.id} disabled className="w-full p-2 border rounded" />
//                         </div>
//                         <div>
//                             <label className="block font-semibold">Merchant Name:</label>
//                             <input value={merchant.name} disabled className="w-full p-2 border rounded" />
//                         </div>
//                         <div>
//                             <label className="block font-semibold">Business Type:</label>
//                             <Select options={options.businessTypes} />
//                         </div>


//                         <div>
//                             <label className="block font-semibold">Assigned to:</label>
//                             <input className="w-full p-2 border rounded" />
//                         </div>
//                         <div>
//                             <label className="block font-semibold">Follow-up date:</label>
//                             <input type="date" className="w-full p-2 border rounded" />
//                         </div>
//                         <div>
//                             <label className="block font-semibold">Status:</label>
//                             <Select options={options.statuses} />
//                         </div>
//                     </div>
//                     <div className='mt-2'>
//                             <label className="block font-semibold">Task Title:</label>
//                             <input className="w-full p-2 border rounded" />
//                         </div>
//                         <div className='mt-2'>
//                             <label className="block font-semibold">Task Description:</label>
//                             <textarea className="w-full p-2 border rounded" />
//                         </div>
//                         <div>
//                             <label className="block font-semibold">Reminder date:</label>
//                             <input type="date" className="w-full p-2 border rounded" />
//                         </div>
//                         <div>
//                             <label className="block font-semibold">Reminder time:</label>
//                             <input type="time" className="w-full p-2 border rounded" />
//                         </div>
//                     <div className='flex justify-center items-center'>
//                     <button className="bg-orange-700  text-white px-4 py-3 rounded mt-6">Assign</button>

//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AssignTask;































import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import toast from 'react-hot-toast';
import useTask from '../../Hooks/useTask';
import useAgent from '../../Hooks/useAgent';
import useInteraction from '../../Hooks/useInteraction';

const options = {
    businessTypes: [
        { value: 'retail', label: 'Retail' },
        { value: 'wholesale', label: 'Wholesale' },
        { value: 'service', label: 'Service' },
        { value: 'others', label: 'Others' },
        
    ],
    statuses: [
        { value: 'open', label: 'Open' },
        { value: 'inprogress', label: 'In Progress' },
        { value: 'complete', label: 'Closed' },
    ],
};

const AssignTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { createTask } = useTask();
    const { fetchAgents, agents } = useAgent(); // Fetching agents
    const { fetchInteractionsByMerchant , interactions } = useInteraction();

    useEffect(() => {
        fetchAgents()
        if(id){
            fetchInteractionsByMerchant(id)
        }
    }, [id])

    

console.log(interactions)
    const [taskData, setTaskData] = useState({
        interactionId:'',
        merchantId: id,
        businessType: '',
        assignedTo: '',
        followUpDate: '',
        status: '',
        title: '',
        description: '',
        reminderDate: '',
        reminderTime: '',
    });

    const handleChange = (field, value) => {
        setTaskData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createTask(taskData);
        // toast.success('Task assigned successfully');
        navigate(`/merchant/:${merchantId}/tasks`);
    };

    return (
        <div className="min-h-screen bg-orange-100 flex items-center justify-center p-3">
            <div className="max-w-3xl w-full bg-orange-200 p-6 rounded-lg shadow-md">
                <div className="border p-6 rounded-lg">
                    <h2 className="bg-blue-900 text-white px-4 py-2 rounded mb-4">Assign Task</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block font-semibold">Business Type:</label>
                            <Select options={options.businessTypes} onChange={(selected) => handleChange('businessType', selected.value)} />
                        </div>
                        {/* <div>
                            <label className="block font-semibold">Assigned to:</label>
                            <input className="w-full p-2 border rounded" value={taskData.assignedTo} onChange={(e) => handleChange('assignedTo', e.target.value)} />
                        </div> */}



                        <div>
                            <label className="block font-semibold">Assign to Agent:</label>
                            <Select
                                options={agents.map((agent) => ({
                                    value: agent._id, // Store _id instead of name/email
                                    label: agent.username, // Display name in dropdown
                                }))}
                                onChange={(selected) => handleChange("assignedTo", selected.value)}
                                isClearable
                            />
                        </div>


                        <div>
                            <label className="block font-semibold">Select Interaction:</label>
                            <Select
                                options={interactions?.map((interactions) => ({
                                    value: interactions._id, // Store _id instead of name/email
                                    label: interactions.title, // Display name in dropdown
                                }))}
                                onChange={(selected) => handleChange("interactionId", selected.value)}
                                isClearable
                            />
                        </div>




                        <div>
                            <label className="block font-semibold">Follow-up Date:</label>
                            <input type="date" className="w-full p-2 border rounded" value={taskData.followUpDate} onChange={(e) => handleChange('followUpDate', e.target.value)} />
                        </div>
                        <div>
                            <label className="block font-semibold">Status:</label>
                            <Select options={options.statuses} onChange={(selected) => handleChange('status', selected.value)} />
                        </div>
                        <div className='col-span-2'>
                            <label className="block font-semibold">Task Title:</label>
                            <input className="w-full p-2 border rounded" value={taskData.title} onChange={(e) => handleChange('title', e.target.value)} />
                        </div>
                        <div className='col-span-2'>
                            <label className="block font-semibold">Task Description:</label>
                            <textarea className="w-full p-2 border rounded" value={taskData.description} onChange={(e) => handleChange('description', e.target.value)} />
                        </div>
                        <div>
                            <label className="block font-semibold">Reminder Date:</label>
                            <input type="date" className="w-full p-2 border rounded" value={taskData.reminderDate} onChange={(e) => handleChange('reminderDate', e.target.value)} />
                        </div>
                        <div>
                            <label className="block font-semibold">Reminder Time:</label>
                            <input type="time" className="w-full p-2 border rounded" value={taskData.reminderTime} onChange={(e) => handleChange('reminderTime', e.target.value)} />
                        </div>
                        <div className='col-span-2 flex justify-center'>
                            <button type="submit" className="bg-orange-700 text-white px-4 py-3 rounded mt-6">Assign Task</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AssignTask;
