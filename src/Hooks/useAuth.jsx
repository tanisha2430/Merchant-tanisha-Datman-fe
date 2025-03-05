import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [agent, setAgent] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  // Register an agent
  const registerAgent = async (agentDetails) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: agentDetails.username,
          email: agentDetails.email,
          password: agentDetails.password,
        }),
      });

      const data = await response.json();
      console.log("Register agent response:", data);

      if (response.ok) {
        toast.success(data.message);
        localStorage.setItem('authToken', data.token);
        setAgent(data.newAgent);
        navigate('/');
      } else {
        toast.error(data.message || 'Failed to register');
      }
    } catch (error) {
      console.error('Error registering agent:', error);
      toast.error(error.message || 'Error registering agent');
    }
  };

  // Login an agent
  const loginAgent = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Login agent response:", data);

      if (response.ok) {
        toast.success('Login successful');
        localStorage.setItem('authToken', data.token);
        setAgent(data.agent);
        navigate('/');
      } else {
        toast.error(data.error || 'Failed to login');
      }
    } catch (error) {
      console.error('Error logging in agent:', error);
      toast.error(error.message || 'Error logging in');
    }
  };

  return { agent, registerAgent, loginAgent };
};

export default useAuth;
