import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-select";
import toast from "react-hot-toast";
import useMerchant from "../../Hooks/useMerchant";
import useInteraction from "../../Hooks/useInteraction";
import useAgent from "../../Hooks/useAgent"; 

const options = {
  businessTypes: [
    { value: "retail", label: "Retail" },
    { value: "wholesale", label: "Wholesale" },
    { value: "service", label: "Service" },
    { value: "others", label: "Other" },
  ],
  interactionTypes: [
    { value: "phone", label: "Phone" },
    { value: "chat", label: "Chat" },
    { value: "email", label: "Email" },
    { value: "others", label: "Other" },
  ],
  statuses: [
    { value: "open", label: "Open" },
    { value: "inprogress", label: "In Progress" },
    { value: "closed", label: "Closed" },
  ],
};

const CreateInteraction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchMerchantById, merchant } = useMerchant();
  const { createInteraction } = useInteraction();
  const { fetchAgents, agents } = useAgent(); 

  const [interactionData, setInteractionData] = useState({
    businessType: "",
    interactionType: "",
    title: "",
    assignedTo: "", //stores agent._id
    followUpDate: "",
    status: "",
    description: "",
  });

  useEffect(() => {
    if (id) fetchMerchantById(id);
    fetchAgents(); 
  }, [id]);
  console.log(agents)

  const handleChange = (field, value) => {
    setInteractionData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!merchant) {
      toast.error("Merchant not found.");
      return;
    }

    const newInteraction = {
      merchantId: id,
      ...interactionData,
    };

    await createInteraction(newInteraction);
    navigate(`/merchant/${id}/interactions`);
  };

  return (
    <div className="min-h-screen bg-orange-100 flex items-center justify-center p-3">
      <div className="max-w-3xl w-full bg-orange-200 p-6 rounded-lg shadow-md">
        <div className="border p-6 rounded-lg">
          <h2 className="bg-blue-900 text-white px-4 py-2 rounded mb-4">
            New Interaction Details
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold">Merchant ID:</label>
              <input value={merchant?._id || ""} disabled className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block font-semibold">Merchant Name:</label>
              <input value={merchant?.name || ""} disabled className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block font-semibold">Business Type:</label>
              <Select
                options={options.businessTypes}
                onChange={(selected) => handleChange("businessType", selected.value)}
              />
            </div>
            <div>
              <label className="block font-semibold">Interaction Type:</label>
              <Select
                options={options.interactionTypes}
                onChange={(selected) => handleChange("interactionType", selected.value)}
              />
            </div>
            <div>
              <label className="block font-semibold">Interaction Title:</label>
              <input
                className="w-full p-2 border rounded"
                value={interactionData.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>
            <div>
              <label className="block font-semibold">Assign to Agent:</label>
              <Select
                options={agents.map((agent) => ({
                  value: agent._id, 
                  label: agent.username, 
                }))}
                onChange={(selected) => handleChange("assignedTo", selected.value)}
                isClearable
              />
            </div>
            <div>
              <label className="block font-semibold">Follow-up Date:</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={interactionData.followUpDate}
                onChange={(e) => handleChange("followUpDate", e.target.value)}
              />
            </div>
            <div>
              <label className="block font-semibold">Status:</label>
              <Select
                options={options.statuses}
                onChange={(selected) => handleChange("status", selected.value)}
              />
            </div>
            <div className="col-span-2">
              <label className="block font-semibold">Interaction Description:</label>
              <textarea
                className="w-full p-2 border rounded"
                value={interactionData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
            <div className="col-span-2 flex justify-center">
              <button type="submit" className="bg-orange-700 text-white px-4 py-3 rounded mt-6">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateInteraction;
