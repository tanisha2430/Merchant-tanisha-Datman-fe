import { useState } from "react";
import toast from "react-hot-toast";

const useAgent = () => {
  const [agents, setAgents] = useState([]);
  const [agent, setAgent] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const authToken = localStorage.getItem("authToken");

  // Fetch all agents
  const fetchAgents = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/agent`, {
        method: "GET",
        headers: {
          Authorization: `${authToken}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setAgents(data);
      } else {
        toast.error(data.error || "Failed to fetch agents");
      }
    } catch (error) {
      console.error("Error fetching agents:", error);
      toast.error("Error fetching agents");
    }
  };

  // Fetch a single agent by ID
  const fetchAgentById = async (agentId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/agents/${agentId}`, {
        method: "GET",
        headers: {
          Authorization: `${authToken}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setAgent(data);
      } else {
        toast.error(data.error || "Agent not found");
      }
    } catch (error) {
      console.error("Error fetching agent:", error);
      toast.error("Error fetching agent");
    }
  };

  return { agents, agent, fetchAgents, fetchAgentById };
};

export default useAgent;
