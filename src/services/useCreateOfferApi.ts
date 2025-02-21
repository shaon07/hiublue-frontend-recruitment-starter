import { API_URL } from "@/constants";
import { useState } from "react";

interface OfferPayload {
  plan_type: string;
  additions: string[];
  user_id: string;
  expired: string;
  price: number;
}

const useCreateOffer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const createOffer = async (offerData: OfferPayload) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found in localStorage.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/offers`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(offerData),
      });

      if (!response.ok) {
        throw new Error("Failed to create offer");
      }

      const data = await response.json();
      setSuccess(true);
      console.log("Offer Created Successfully", data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { createOffer, isLoading, error, success };
};

export default useCreateOffer;
