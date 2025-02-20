import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UseListUsersProps {
  page: number;
  perPage: number;
}

export function useListUsersApi({ page, perPage }: UseListUsersProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://dummy-1.hiublue.com/api/users?page=${page}&per_page=${perPage}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data.data);
      setMeta(data.meta);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, perPage]);

  return { users, loading, error, meta };
}
