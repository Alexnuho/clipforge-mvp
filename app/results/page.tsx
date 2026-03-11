"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { clips } from "../data/clips";

function ResultsContent() {
  const searchParams = useSearchParams();
  const video = searchParams.get("video") || "";

  const handlePublish = (title: string) => {
    alert(`Clip "${title}" berhasil dipublish (simulasi).`);
  };

  return (
    <main className="min-h-screen px-6 py-14 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <Link
            href="/"
            className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10"
          >
            ← Kembali ke Home
          </Link>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20">
            <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-white/70">
              Hasil Analisa ClipForge
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
              5 Clip Paling Viral
              <span className="mt-2 block bg-gradient-to-r from-white via-blue-300 to-violet-300 bg-clip-text text-transparent">
                Siap Ditinjau
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-white/65">
              Ini masih versi simulasi, tetapi alurnya sudah seperti produk
              asli: user input link, sistem proses, lalu menampilkan clip
              terbaik.
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm text-white/45">Source Video</p>
              <p className="mt-2 break-all text-sm text-white/80">
                {video || "Belum ada link video"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {clips.map((clip) => (
            <div
              key={clip.id}
              className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-white/15"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-blue-500/15 px-3 py-1 text-sm text-blue-300">
                  Clip #{clip.id}
                </span>
                <span className="text-sm text-white/45">{clip.duration}</span>
              </div>

              <h2 className="text-2xl font-semibold leading-9">{clip.title}</h2>

              <p className="mt-4 text-sm leading-7 text-white/60">
                {clip.reason}
              </p>

              <div className="mt-6 flex items-end justify-between">
                <div>
                  <p className="text-sm text-white/45">Viral Score</p>
                  <p className="mt-1 text-3xl font-bold text-emerald-400">
                    {clip.score}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/55">
                  AI Selected
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Link
                  href={`/clips/${clip.id}`}
                  className="flex-1 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-center font-medium transition hover:bg-white/15"
                >
                  Preview
                </Link>

                <button
                  onClick={() => handlePublish(clip.title)}
                  className="flex-1 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 px-4 py-3 font-medium text-white shadow-lg shadow-blue-500/20 transition hover:opacity-95"
                >
                  Publish
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
          <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl">
            <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-white/10 border-t-blue-500" />
            <h1 className="text-3xl font-bold md:text-4xl">
              Menyiapkan hasil...
            </h1>
          </div>
        </main>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}