"use client";

import { useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
  role: string;
  created_at: string;
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      if (query.trim() === "") return; // Không tìm nếu input trống

      setLoading(true);
      try {
        const res = await fetch(`/api/users?q=${query}`);
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Lỗi tìm kiếm:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [query]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tìm kiếm người dùng</h1>
      <input
        type="text"
        placeholder="Nhập email cần tìm..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 mb-4 w-full max-w-md"
      />

      {loading && <p>Đang tìm kiếm...</p>}

      {users.length > 0 ? (
        <ul className="space-y-2">
          {users.map((user) => (
            <li key={user.id} className="p-2 border rounded">
              <strong>{user.email}</strong> - {user.role}
            </li>
          ))}
        </ul>
      ) : (
        !loading && query !== "" && <p>Không tìm thấy kết quả nào.</p>
      )}
    </div>
  );
}
