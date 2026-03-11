"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProcessingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const video = searchParams.get("video") || "";

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(`/results?video=${encodeURIComponent(video)}`);
    }, 3000);

    return () => clearTimeout(timer);
  }, [router, video]);

  const steps = [
    "Memvalidasi link video...",
    "Mengambil source video...",
    "Menganalisis audio dan transkrip...",
    "Mencari momen paling menarik...",
    "Menyiapkan 5 clip terbaik...",
  ];

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-white/10 border-t-blue-500" />
          <p className="mb-2 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-white/70">
            ClipForge AI Processing
          </p>
          <h1 className="text-3xl font-bold md:text-4xl">
            Sedang Memproses Video
          </h1>
          <p className="mt-3 text-white/65">
            Mohon tunggu sebentar, sistem sedang mencari momen paling potensial
            untuk dijadikan short video.
          </p>
        </div>

        <div className="mb-6 rounded-2xl border border-white/10 bg-black/30 p-4">
          <p className="text-sm text-white/50">Source Video</p>
          <p className="mt-2 break-all text-sm text-white/80">
            {video || "Tidak ada link video"}
          </p>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-4"
            >
              <div className="h-3 w-3 rounded-full bg-blue-500" />
              <p className="text-white/80">{step}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 overflow-hidden rounded-full bg-white/10">
          <div className="h-3 w-2/3 animate-pulse rounded-full bg-blue-500" />
        </div>

        <p className="mt-4 text-center text-sm text-white/50">
          Simulasi 3 detik, lalu otomatis masuk ke halaman hasil.
        </p>
      </div>
    </main>
  );
}