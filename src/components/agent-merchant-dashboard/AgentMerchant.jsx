// import React from 'react';
// import { useParams, NavLink } from 'react-router-dom';

// const merchants = [
//     { id: 1, name: 'PQRS Company' },
//     { id: 2, name: 'ABCD Company' },
//     { id: 3, name: 'UVWX Company' },
//     { id: 4, name: 'MNOP Company' },
//     { id: 5, name: 'EFGH Company' },
// ];

// const AgentMerchant = () => {
//     const { id } = useParams(); // Get merchant ID from URL
//     const merchant = merchants.find((m) => m.id === parseInt(id));

//     if (!merchant) {
//         return <div className="text-center text-red-500">Merchant not found!</div>;
//     }

//     return (
//         <div className="min-h-screen bg-orange-100 p-5">
//             <div className="flex justify-center items-center bg-blue-900 rounded-md text-white p-4">
//                 <h1 className="text-center font-bold md:text-xl">Agent - {merchant.name} Dashboard</h1>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//                 <NavLink to={`/merchant/${merchant.id}/interactions`} className="no-underline">
//                     <div className="bg-orange-200 p-5 md:h-44 cursor-pointer rounded shadow border-2 border-orange-300 flex items-center justify-center hover:bg-orange-300 transition">
//                         <h2 className="text-lg font-bold">Ongoing Interactions</h2>
//                     </div>
//                 </NavLink>
//                 <NavLink to={`/merchant/${merchant.id}/tasks`} className="no-underline">
//                     <div className="bg-orange-200 p-5 md:h-44 cursor-pointer rounded shadow border-2 border-orange-300 flex items-center justify-center hover:bg-orange-300 transition">
//                         <h2 className="text-lg font-bold">Task Management</h2>
//                     </div>
//                 </NavLink>
//                 <NavLink to={`/merchant/${merchant.id}/notifications`} className="no-underline">
//                     <div className="bg-orange-200 p-5 md:h-44 cursor-pointer rounded shadow border-2 border-orange-300 flex items-center justify-center hover:bg-orange-300 transition">
//                         <h2 className="text-lg font-bold">Notifications and Alerts</h2>
//                     </div>
//                 </NavLink>
//             </div>
//         </div>
//     );
// };

// export default AgentMerchant;










import React, { useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import useMerchant from "../../Hooks/useMerchant";

const AgentMerchant = () => {
    const { id } = useParams(); // Get merchant ID from URL
    const { merchant, fetchMerchantById } = useMerchant(); // Get merchant data & fetch function

    useEffect(() => {
        if (id) fetchMerchantById(id); // Fetch merchant details on mount
    }, [id]);

    if (!merchant) {
        return <div className="text-center text-red-500">Merchant not found!</div>;
    }

    return (
        <div className="min-h-screen bg-orange-100 p-5">
            <div className="flex justify-center items-center bg-blue-900 rounded-md text-white p-4">
                <h1 className="text-center font-bold md:text-xl">Agent - {merchant?.name} Dashboard</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                <NavLink to={`/merchant/${merchant?._id}/interactions`} className="no-underline">
                    <div className="bg-orange-200 p-5 md:h-44 cursor-pointer rounded shadow border-2 border-orange-300 flex items-center justify-center hover:bg-orange-300 transition">
                        <h2 className="text-lg font-bold">Ongoing Interactions</h2>
                    </div>
                </NavLink>
                <NavLink to={`/merchant/${merchant?._id}/tasks`} className="no-underline">
                    <div className="bg-orange-200 p-5 md:h-44 cursor-pointer rounded shadow border-2 border-orange-300 flex items-center justify-center hover:bg-orange-300 transition">
                        <h2 className="text-lg font-bold">Task Management</h2>
                    </div>
                </NavLink>
                <NavLink to={`/merchant/${merchant?._id}/notifications`} className="no-underline">
                    <div className="bg-orange-200 p-5 md:h-44 cursor-pointer rounded shadow border-2 border-orange-300 flex items-center justify-center hover:bg-orange-300 transition">
                        <h2 className="text-lg font-bold">Notifications and Alerts</h2>
                    </div>
                </NavLink>
            </div>
        </div>
    );
};

export default AgentMerchant;
