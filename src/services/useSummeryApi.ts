import { API_URL } from "@/constants";
import { useState } from "react";

interface DashboardData {
  data: any;
  loading: boolean;
  error: string | null;
  fetchDashboardData: (filter: string) => Promise<void>;
}

export const useSummeryApi = (): DashboardData => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async (filter: string) => {
    setLoading(true);
    setError(null);

    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer fake-jwt-token");

      const url = new URL(`${API_URL}/dashboard/summary`);
      url.searchParams.append("filter", filter);

      const requestOptions: RequestInit = {
        method: "GET",
        headers: myHeaders,
      };

      const response = await fetch(url.toString(), requestOptions);

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      const result = await response.json();
      setData(result);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchDashboardData };
};
