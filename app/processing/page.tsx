"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function ProcessingContent() {
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
    "Memvalidasi link video",
    "Mengambil source video",
    "Menganalisis audio dan transkrip",
    "Mencari momen paling menarik",
    "Menyiapkan 5 clip terbaik",
  ];

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-14 text-white">
      <div className="w-full max-w-3xl rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-blue-500/20 bg-blue-500/10 shadow-lg shadow-blue-500/10">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-blue-500" />
          </div>

          <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-white/70">
            ClipForge AI Processing
          </p>

          <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
            Sedang Memproses
            <span className="mt-2 block bg-gradient-to-r from-white via-blue-300 to-violet-300 bg-clip-text text-transparent">
              Source Video Kamu
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-white/65">
            Sistem sedang membaca link, menganalisis isi video, lalu memilih
            momen terbaik untuk dijadikan short video viral.
          </p>
        </div>

        <div className="mt-8 rounded-[24px] border border-white/10 bg-black/20 p-5">
          <p className="text-sm text-white/45">Source Video</p>
          <p className="mt-2 break-all text-sm leading-7 text-white/85">
            {video || "Tidak ada link video"}
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center gap-4 rounded-[22px] border border-white/10 bg-white/5 px-5 py-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-sm font-semibold text-white shadow-lg shadow-blue-500/20">
                {index + 1}
              </div>
              <div>
                <p className="font-medium text-white/90">{step}...</p>
                <p className="text-sm text-white/45">AI pipeline aktif</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <div className="overflow-hidden rounded-full bg-white/10">
            <div className="h-3 w-2/3 animate-pulse rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
          </div>
          <p className="mt-3 text-center text-sm text-white/45">
            Simulasi proses 3 detik sebelum hasil ditampilkan
          </p>
        </div>
      </div>
    </main>
  );
}

export default function ProcessingPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center px-6 text-white">
          <div className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-white/5 p-8 text-center shadow-2xl">
            <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-white/10 border-t-blue-500" />
            <h1 className="text-3xl font-bold md:text-4xl">
              Menyiapkan halaman proses...
            </h1>
          </div>
        </main>
      }
    >
      <ProcessingContent />
    </Suspense>
  );
}