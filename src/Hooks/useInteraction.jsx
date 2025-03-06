import { useState } from 'react';
import toast from 'react-hot-toast';

const useInteraction = () => {
  const [interactions, setInteractions] = useState([]);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const authToken = localStorage.getItem("authToken");


  // Create an interaction
  const createInteraction = async (interactionDetails) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/interactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${authToken}`,
        },
        body: JSON.stringify(interactionDetails),
      });

      const data = await response.json();
      console.log("Create interaction response:", data);

      if (response.ok) {
        toast.success(data.message);
        setInteractions((prev) => [...prev, data.interaction]);
      } else {
        toast.error(data.error || 'Failed to create interaction');
      }
    } catch (error) {
      console.error('Error creating interaction:', error);
      toast.error(error.message || 'Error creating interaction');
    }
  };

  // Fetch interaction by ID
  const fetchInteractionById = async (interactionId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/interactions/${interactionId}`, {
        headers: {
          Authorization: `${authToken}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        toast.error(data.error || 'Failed to fetch interaction');
      }
    } catch (error) {
      console.error('Error fetching interaction:', error);
      toast.error(error.message || 'Error fetching interaction');
    }
  };

  // Fetch all interactions by merchant ID
  const fetchInteractionsByMerchant = async (merchantId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/interactions/merchant/${merchantId}`, {
        headers: {
          Authorization: `${authToken}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setInteractions(data);
      } else {
        toast.error(data.error || 'Failed to fetch interactions');
      }
    } catch (error) {
      console.error('Error fetching interactions:', error);
      toast.error(error.message || 'Error fetching interactions');
    }
  };

  // Update an interaction
  const updateInteraction = async (interactionId, updatedDetails) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/interactions/${interactionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${authToken}`,
        },
        body: JSON.stringify(updatedDetails),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setInteractions((prev) => prev.map((interaction) => (interaction._id === interactionId ? data.interaction : interaction)));
      } else {
        toast.error(data.error || 'Failed to update interaction');
      }
    } catch (error) {
      console.error('Error updating interaction:', error);
      toast.error(error.message || 'Error updating interaction');
    }
  };

  // Delete an interaction
  const deleteInteraction = async (interactionId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/interactions/${interactionId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `${authToken}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setInteractions((prev) => prev.filter((interaction) => interaction._id !== interactionId));
      } else {
        toast.error(data.error || 'Failed to delete interaction');
      }
    } catch (error) {
      console.error('Error deleting interaction:', error);
      toast.error(error.message || 'Error deleting interaction');
    }
  };

  return { interactions, createInteraction, fetchInteractionById, fetchInteractionsByMerchant, updateInteraction, deleteInteraction };
};

export default useInteraction;
