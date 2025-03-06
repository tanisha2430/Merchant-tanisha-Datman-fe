import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import useMerchant from "../../Hooks/useMerchant";
import Loader from "../loader/Loader";

const AgentDashboard = () => {
    const { merchants, fetchMerchants,loading } = useMerchant(); 

    useEffect(() => {
        fetchMerchants(); 
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <>
            <div className="min-h-screen bg-orange-100 p-5">
                <div className="flex justify-center items-center bg-blue-900 rounded-md text-white p-4">
                    <h1 className="text-center font-bold md:text-xl">Agent Dashboard</h1>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {merchants?.length > 0 ? (
                        merchants?.map((merchant) => (
                            <NavLink 
                                to={`/merchant/${merchant?._id}`} 
                                key={merchant?._id} 
                                className="no-underline"
                            >
                                <div
                                    className="bg-orange-200 p-5 cursor-pointer rounded shadow border-2 border-orange-300 flex items-center justify-center hover:bg-orange-300 transition"
                                >
                                    <h2 className="text-lg font-bold">Merchant: {merchant?.name}</h2>
                                </div>
                            </NavLink>
                        ))
                    ) : (
                        <p className="text-center text-gray-600 mt-4">No merchants available.</p>
                    )}
                </div>
            </div>
        </>
    );
    
};

export default AgentDashboard;
