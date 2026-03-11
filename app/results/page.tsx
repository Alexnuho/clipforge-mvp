"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { clips } from "../data/clips";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const video = searchParams.get("video") || "";

  const handlePublish = (title: string) => {
    alert(`Clip "${title}" berhasil dipublish (simulasi).`);
  };

  return (
    <main className="min-h-screen bg-black px-6 py-14 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <Link
            href="/"
            className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10"
          >
            ← Kembali ke Home
          </Link>

          <p className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-white/70">
            Hasil Analisa ClipForge
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            5 Clip Paling Viral Siap Ditinjau
          </h1>

          <p className="mt-4 max-w-2xl text-white/70">
            Ini masih versi simulasi, tetapi alurnya sudah seperti produk asli:
            user input link, sistem proses, lalu menampilkan clip terbaik.
          </p>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-white/50">Source Video</p>
            <p className="mt-2 break-all text-sm text-white/80">
              {video || "Belum ada link video"}
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {clips.map((clip) => (
            <div
              key={clip.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-blue-500/20 px-3 py-1 text-sm text-blue-300">
                  Clip #{clip.id}
                </span>
                <span className="text-sm text-white/50">{clip.duration}</span>
              </div>

              <h2 className="text-xl font-semibold leading-8">{clip.title}</h2>

              <p className="mt-4 text-sm leading-6 text-white/65">
                {clip.reason}
              </p>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-white/60">Viral Score</span>
                <span className="text-2xl font-bold text-green-400">
                  {clip.score}
                </span>
              </div>

              <div className="mt-6 flex gap-3">
                <Link
                  href={`/clips/${clip.id}`}
                  className="flex-1 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-center font-medium transition hover:bg-white/20"
                >
                  Preview
                </Link>

                <button
                  onClick={() => handlePublish(clip.title)}
                  className="flex-1 rounded-xl bg-blue-500 px-4 py-3 font-medium transition hover:bg-blue-400"
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