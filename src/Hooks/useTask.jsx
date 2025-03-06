import { useState } from "react";
import toast from "react-hot-toast";

const useTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const authToken = localStorage.getItem("authToken");

  // Fetch a task by ID
  const fetchTaskById = async (taskId) => {
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
        method: "GET",
        headers: {
          Authorization: `${authToken}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        toast.error(data.error || "Failed to fetch task");
      }
    } catch (error) {
      console.error("Error fetching task:", error);
      toast.error("Error fetching task");
    }
    setLoading(false);

  };

  // Fetch tasks by interaction ID
  const fetchTasksByInteraction = async (interactionId) => {
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/tasks/interaction/${interactionId}`, {
        method: "GET",
        headers: {
          Authorization: `${authToken}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setTasks(data);
      } else {
        toast.error(data.error || "Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Error fetching tasks");
    }
    setLoading(false);

  };



  const fetchTasksByMerchant = async (merchantId) => {
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/tasks/merchantId/${merchantId}`, {
        method: "GET",
        headers: {
          Authorization: `${authToken}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setTasks(data);
      } else {
        toast.error(data.error || "Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Error fetching tasks");
    }
    setLoading(false);

  };



  // Create a new task
  const createTask = async (taskDetails) => {
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authToken}`,
        },
        body: JSON.stringify(taskDetails),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Task created successfully");
        setTasks((prev) => [...prev, data.task]); 
      } else {
        toast.error(data.error || "Failed to create task");
      }
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Error creating task");
    }
    setLoading(false);

  };

  // Update a task by ID
  const updateTask = async (taskId, updatedDetails) => {
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authToken}`,
        },
        body: JSON.stringify(updatedDetails),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Task updated successfully");
        setTasks((prev) => prev.map((task) => (task._id === taskId ? data.task : task)));
      } else {
        toast.error(data.error || "Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Error updating task");
    }
    setLoading(false);

  };

  // Delete a task by ID
  const deleteTask = async (taskId) => {
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `${authToken}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Task deleted successfully");
        setTasks((prev) => prev.filter((task) => task._id !== taskId));
      } else {
        toast.error(data.error || "Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Error deleting task");
    }
    setLoading(false);

  };

  return { tasks, fetchTaskById, fetchTasksByInteraction, createTask, updateTask,fetchTasksByMerchant, deleteTask ,loading};
};

export default useTask;
