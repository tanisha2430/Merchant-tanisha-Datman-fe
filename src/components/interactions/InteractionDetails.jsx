import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useInteraction from '../../Hooks/useInteraction';
import Loader from '../loader/Loader';

const InteractionDetails = () => {
    const { iid } = useParams();
    const { fetchInteractionById,loading } = useInteraction();
    const [interaction, setInteraction] = useState(null);
    console.log(iid)
    useEffect(() => {
        const fetchDetails = async () => {
            const data = await fetchInteractionById(iid);
            setInteraction(data);
        };
        fetchDetails();
    }, [iid]);

    
    if(loading){
        <Loader/>
    }

    if (!interaction) {
        return <div className="text-center text-red-500">Loading interaction details...</div>;
    }


    return (
        <div className="h-[70vh] bg-orange-100 flex items-center justify-center">
            <div className="max-w-3xl w-full bg-orange-200 p-6 rounded-lg shadow-md">
                <button className="bg-blue-900 text-white px-4 py-2 rounded mb-4">
                    {interaction.title} Details
                </button>
                <div className="border bg-white p-3 rounded-lg">
                    <p className="mb-2"><strong>Interaction ID:</strong> {interaction._id}</p>
                    <p className="mb-2"><strong>Merchant Name:</strong> {interaction.merchantId?.name}</p>
                    <p className="mb-2"><strong>Interaction Title:</strong> {interaction.title}</p>
                    <p className="mb-2"><strong>Interaction Description:</strong> {interaction.description}</p>
                    <strong>Follow-up date:</strong> {new Date(interaction.followUpDate).toLocaleDateString("en-IN")}
                    <p className="mb-2"><strong>Interaction-type:</strong> {interaction.interactionType}</p>
                    <p className="mb-2"><strong>Status:</strong> <span className="text-red-500">{interaction.status}</span></p>
                </div>
            </div>
        </div>
    );
};

export default InteractionDetails;
