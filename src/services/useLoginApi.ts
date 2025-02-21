import { API_URL } from "@/constants";
import { useState } from "react";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const login = async (data: { email: string; password: string }) => {
    setLoading(true);
    setApiError(null);

    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Invalid email or password");
      }

      localStorage.setItem("token", result.token);
      window.location.href = "/";
    } catch (error: any) {
      setApiError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, apiError };
}
