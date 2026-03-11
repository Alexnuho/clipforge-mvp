"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type HistoryItem = {
  id: string;
  video: string;
  createdAt: string;
};

export default function Home() {
  const router = useRouter();
  const [videoLink, setVideoLink] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const demoClips = [
    {
      title: "Hook paling kuat di awal video",
      score: 92,
      duration: "00:35",
    },
    {
      title: "Momen insight bisnis yang paling menarik",
      score: 88,
      duration: "00:42",
    },
    {
      title: "Bagian yang berpotensi viral untuk shorts",
      score: 84,
      duration: "00:29",
    },
  ];

  const isValidYouTubeLink = (url: string) => {
    return url.includes("youtube.com/watch?v=") || url.includes("youtu.be/");
  };

  const handleGenerate = () => {
    const trimmedLink = videoLink.trim();

    if (!trimmedLink) {
      setError("Silakan tempel link video terlebih dahulu.");
      return;
    }

    if (!isValidYouTubeLink(trimmedLink)) {
      setError(
        "Masukkan link YouTube yang valid, misalnya youtube.com atau youtu.be."
      );
      return;
    }

    setError("");
    setIsSubmitting(true);

    const savedHistory = localStorage.getItem("clipforge-history");
    const parsedHistory: HistoryItem[] = savedHistory
      ? JSON.parse(savedHistory)
      : [];

    const newItem: HistoryItem = {
      id: Date.now().toString(),
      video: trimmedLink,
      createdAt: new Date().toLocaleString("id-ID"),
    };

    const updatedHistory = [newItem, ...parsedHistory];
    localStorage.setItem("clipforge-history", JSON.stringify(updatedHistory));

    setTimeout(() => {
      router.push(`/processing?video=${encodeURIComponent(trimmedLink)}`);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex max-w-6xl flex-col px-6 py-16 md:px-10">
        <div className="mb-10 flex items-center justify-center">
          <div className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
            ClipForge
          </div>
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-1 text-sm text-white/70">
            AI Video Clipper for Viral Shorts
          </div>

          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            Ubah 1 Link Video Menjadi
            <span className="block text-blue-400">5 Clip Paling Viral</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/70 md:text-lg">
            Paste link video, lalu ClipForge akan memproses momen paling
            menarik, memberi skor viral, dan menyiapkan clip siap upload ke
            berbagai sosial media.
          </p>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur">
            <div className="flex flex-col gap-3 md:flex-row">
              <input
                type="text"
                value={videoLink}
                disabled={isSubmitting}
                onChange={(e) => {
                  setVideoLink(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Tempel link video YouTube di sini..."
                className="h-14 flex-1 rounded-xl border border-white/10 bg-black/40 px-4 text-white placeholder:text-white/40 outline-none disabled:cursor-not-allowed disabled:opacity-60"
              />
              <button
                onClick={handleGenerate}
                disabled={isSubmitting}
                className="h-14 rounded-xl bg-blue-500 px-6 font-semibold text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Processing..." : "Generate Clips"}
              </button>
            </div>

            {error && (
              <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-left">
                <p className="text-sm font-medium text-red-300">
                  Input tidak valid
                </p>
                <p className="mt-1 text-sm text-red-200">{error}</p>
              </div>
            )}

            <p className="mt-3 text-sm text-white/50">
              Versi awal untuk uji coba pribadi. Nanti kita lanjutkan ke AI
              sungguhan.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {demoClips.map((clip, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-blue-500/20 px-3 py-1 text-sm text-blue-300">
                  Clip {index + 1}
                </span>
                <span className="text-sm text-white/50">{clip.duration}</span>
              </div>

              <h2 className="text-lg font-semibold">{clip.title}</h2>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-white/60">Viral Score</span>
                <span className="text-2xl font-bold text-green-400">
                  {clip.score}
                </span>
              </div>

              <button className="mt-6 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 font-medium transition hover:bg-white/20">
                Preview Clip
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}