import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import useInteraction from "../../Hooks/useInteraction";
import Loader from "../loader/Loader";

const Interactions = () => {
  const { id: merchantId } = useParams();
  const { interactions, fetchInteractionsByMerchant,loading } = useInteraction();

  useEffect(() => {
    fetchInteractionsByMerchant(merchantId);
  }, [merchantId]);

  if(loading){
    <Loader/>
  }



  return loading ? (
    <Loader/>
  ):(
    <div className="min-h-screen bg-orange-100 p-5">
      <div className="flex justify-between items-center bg-blue-900 rounded-md text-white p-4">
        <h1 className="font-bold md:text-xl">Ongoing Interactions</h1>
        <NavLink to={`/merchant/${merchantId}/start-interaction`}>
          <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
            Start New Interaction
          </button>
        </NavLink>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {interactions.map((interaction) => (
          <div
            key={interaction._id}
            className="bg-orange-200 md:h-44 p-5 cursor-pointer rounded shadow border-2 border-orange-300 flex flex-col items-center justify-between hover:bg-orange-300 transition"
          >
            <h2 className="text-lg font-bold">{interaction.title}</h2>
            <p className="text-sm text-gray-600">{interaction.description}</p>
            <div className="flex space-x-4 mt-4">
              <NavLink
                to={`/merchant/${merchantId}/interactions/${interaction._id}`}
                className="bg-orange-800 text-white px-4 py-2 rounded hover:bg-orange-900"
              >
                Details
              </NavLink>
              <NavLink
                to={`/merchant/${merchantId}/interactions/${interaction._id}/history`}
                className="bg-orange-800 text-white px-4 py-2 rounded hover:bg-orange-900"
              >
                View History
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Interactions;
