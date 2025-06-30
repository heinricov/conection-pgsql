"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function PostTable() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      if (!response.ok) {
        throw new Error("Gagal memuat data post");
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Gagal memuat data post");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Daftar Post</h2>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Daftar Post</h2>
      {posts.length === 0 ? (
        <p className="">Belum ada post. Silakan buat post baru.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Judul
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Konten
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Dibuat Pada
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {post.title}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {post.content.length > 50
                      ? `${post.content.substring(0, 50)}...`
                      : post.content}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {new Date(post.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
