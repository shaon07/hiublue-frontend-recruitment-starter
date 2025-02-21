import { useEffect, useState } from "react";

interface Params {
  page?: number;
  per_page?: number;
  search?: string;
  type?: string;
  status?: string;
}

const useUserListApi = ({
  page = 1,
  per_page = 5,
  search = "",
  type = "",
  status = "",
}: Params) => {
  const [users, setUsers] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      const queryParams = new URLSearchParams({
        page: String(page),
        per_page: String(per_page),
        ...(search && { search }),
        ...(type && { type }),
        ...(status && { status }),
      }).toString();

      try {
        const response = await fetch(
          `https://dummy-1.hiublue.com/api/offers?${queryParams}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch offers");
        }

        const data = await response.json();
        setUsers(data.data);
        setMeta(data.meta);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, per_page, search, type, status]);

  return { users, meta, loading, error };
};

export default useUserListApi;
