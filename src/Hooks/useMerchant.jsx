import { useState } from "react";
import toast from "react-hot-toast";

const useMerchant = () => {
  const [merchants, setMerchants] = useState([]);
  const [merchant, setMerchant] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const authToken = localStorage.getItem("authToken");

  // Fetch all merchants
  const fetchMerchants = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/merchants`, {
        method: "GET",
        headers: {
          Authorization: `${authToken}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setMerchants(data);
      } else {
        toast.error(data.error || "Failed to fetch merchants");
      }
    } catch (error) {
      console.error("Error fetching merchants:", error);
      toast.error("Error fetching merchants");
    }
    setLoading(false);
  };

  // Fetch a single merchant by ID
  // const fetchMerchantById = async (merchantId) => {
  //   setLoading(true);

  //   try {
  //     const response = await fetch(`${API_BASE_URL}/api/merchants/${merchantId}`, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `${authToken}`,
  //       },
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       setMerchant(data);
  //     } else {
  //       toast.error(data.error || "Merchant not found");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching merchant:", error);
  //     toast.error("Error fetching merchant");
  //   }
  //   setLoading(false);

  // };
  const fetchMerchantById = async (merchantId) => {
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/merchants/${merchantId}`, {
        method: "GET",
        headers: {
          Authorization: `${authToken}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setMerchant(data);
      } else {
        toast.error(data.error || "Merchant not found");
      }
    } catch (error) {
      console.error("Error fetching merchant:", error);
      toast.error("Error fetching merchant");
    }

    setLoading(false);
};


  // Create a new merchant
  const createMerchant = async (merchantDetails) => {
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/merchants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authToken}`,
        },
        body: JSON.stringify(merchantDetails),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Merchant created successfully");
        setMerchants((prev) => [...prev, data.merchant]);
      } else {
        toast.error(data.error || "Failed to create merchant");
      }
    } catch (error) {
      console.error("Error creating merchant:", error);
      toast.error("Error creating merchant");
    }
    setLoading(false);

  };

  return { merchants, merchant, fetchMerchants, fetchMerchantById, createMerchant,loading };
};

export default useMerchant;
