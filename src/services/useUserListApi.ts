import { useEffect, useState } from "react";

const useUserListApi = (search: string) => {
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

      if (!search) return;

      try {
        const response = await fetch(
          `https://dummy-1.hiublue.com/api/offers?search=${search}`,
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
  }, [search]);

  return { users, meta, loading, error };
};

export default useUserListApi;
