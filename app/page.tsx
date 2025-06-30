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
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">Aplikasi Postingan</h1>

        <div className="flex flex-col items-center">
          <PostForm onPostCreated={handlePostCreated} />
        </div>

        <div className="flex flex-col items-center mt-8">
          <PostTable key={refreshKey} />
        </div>
      </div>

      <Toaster position="top-right" richColors />
    </main>
  );
}
