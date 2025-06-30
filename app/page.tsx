"use client";

import { useState } from "react";
import { Toaster } from "sonner";
import dynamic from "next/dynamic";

// Gunakan dynamic import untuk menghindari SSR pada komponen yang menggunakan window
const PostForm = dynamic(() => import("@/components/posts/PostForm"), {
  ssr: false,
});

const PostTable = dynamic(() => import("@/components/posts/PostTable"), {
  ssr: false,
});

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handlePostCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          NextJS + PostgreSQL via Prisma
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Section - Kiri */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-8">
              <h2 className="text-xl font-semibold mb-4">Tambah Post Baru</h2>
              <PostForm onPostCreated={handlePostCreated} />
            </div>
          </div>

          {/* Table Section - Kanan */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-xl font-semibold mb-4">Daftar Post</h2>
            <PostTable key={refreshKey} />
          </div>
        </div>
      </div>

      <Toaster position="top-right" richColors />
    </main>
  );
}
