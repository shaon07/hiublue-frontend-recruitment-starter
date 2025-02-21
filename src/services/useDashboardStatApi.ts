import { API_URL } from "@/constants";
import { useCallback, useState } from "react";

interface UseDashboardStatResult {
  data: any;
  loading: boolean;
  error: string | null;
  fetchStat: (filter: string) => Promise<void>;
}

export const useDashboardStatApi = (): UseDashboardStatResult => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStat = useCallback(async (filter: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Authorization token not found!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_URL}/dashboard/stat?filter=${filter}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard stat");
      }

      const result = await response.json();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchStat };
};
