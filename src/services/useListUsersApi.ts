import { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UseListUsersProps {
  page?: number;
  perPage?: number;
  search?: string;
}

export function useListUsersApi() {
  const [users, setUsers] = useState<User[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async ({
    page = 1,
    perPage = 5,
    search,
  }: UseListUsersProps) => {
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
        `https://dummy-1.hiublue.com/api/users?page=${page}&per_page=${perPage}${
          search ? `&search=${search}` : ""
        }`,
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

  return { users, loading, error, meta, fetchUsers };
}
