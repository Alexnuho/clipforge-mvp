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

  const features = [
    {
      title: "Top 5 Clip Otomatis",
      desc: "Sistem memilih maksimal 5 momen paling menarik dan paling potensial untuk short-form content.",
    },
    {
      title: "Viral Score Instan",
      desc: "Setiap clip diberi skor agar kamu lebih cepat menentukan potongan mana yang paling layak dipakai.",
    },
    {
      title: "Workflow Super Cepat",
      desc: "Cukup tempel link, tunggu proses, lalu review hasil. Cocok untuk creator yang ingin hemat waktu.",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Paste Link Video",
      desc: "Masukkan link YouTube yang ingin kamu ubah menjadi short clips.",
    },
    {
      step: "02",
      title: "AI Menganalisis Konten",
      desc: "ClipForge mensimulasikan proses transkrip, analisa momen, dan pemilihan segmen terbaik.",
    },
    {
      step: "03",
      title: "Review dan Publish",
      desc: "Lihat hasil clip, cek skor viral, lalu publish atau proses ulang dari dashboard.",
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
    <main className="min-h-screen text-white">
      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300 shadow-lg shadow-blue-500/10">
            <span className="h-2 w-2 rounded-full bg-blue-400" />
            AI Video Clipper for Viral Shorts
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-7xl">
            Ubah 1 Link Video
            <span className="mt-2 block bg-gradient-to-r from-white via-blue-300 to-violet-300 bg-clip-text text-transparent">
              Menjadi 5 Clip Paling Viral
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/65 md:text-lg">
            Paste link video, lalu ClipForge akan memproses momen paling
            menarik, memberi skor viral, dan menyiapkan clip siap upload ke
            berbagai sosial media.
          </p>

          <div className="mt-10 rounded-[28px] border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl">
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
                className="h-14 flex-1 rounded-2xl border border-white/10 bg-black/30 px-5 text-white placeholder:text-white/35 outline-none transition focus:border-blue-500/40 disabled:cursor-not-allowed disabled:opacity-60"
              />
              <button
                onClick={handleGenerate}
                disabled={isSubmitting}
                className="h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 px-6 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Processing..." : "Generate Clips"}
              </button>
            </div>

            {error && (
              <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-left">
                <p className="text-sm font-medium text-red-300">
                  Input tidak valid
                </p>
                <p className="mt-1 text-sm text-red-200">{error}</p>
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-white/40">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                YouTube Link Only
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Top 5 Viral Clips
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Personal MVP
              </span>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {demoClips.map((clip, index) => (
            <div
              key={index}
              className="group rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-white/15"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-blue-500/15 px-3 py-1 text-sm text-blue-300">
                  Clip {index + 1}
                </span>
                <span className="text-sm text-white/45">{clip.duration}</span>
              </div>

              <h2 className="text-xl font-semibold leading-8 text-white">
                {clip.title}
              </h2>

              <div className="mt-6 flex items-end justify-between">
                <div>
                  <p className="text-sm text-white/45">Viral Score</p>
                  <p className="mt-1 text-3xl font-bold text-emerald-400">
                    {clip.score}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/55">
                  Short-ready
                </div>
              </div>

              <button className="mt-6 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 font-medium text-white transition hover:bg-white/15">
                Preview Clip
              </button>
            </div>
          ))}
        </div>

        <section className="mt-24">
          <div className="mb-10 text-center">
            <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-white/70">
              Kenapa ClipForge
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-5xl">
              Workflow Lebih Cepat,
              <span className="mt-2 block bg-gradient-to-r from-white via-blue-300 to-violet-300 bg-clip-text text-transparent">
                Output Lebih Konsisten
              </span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 text-lg font-bold text-white shadow-lg shadow-blue-500/20">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="mt-3 leading-7 text-white/60">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24">
          <div className="mb-10 text-center">
            <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-white/70">
              Cara Kerja
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-5xl">
              3 Langkah Simple
              <span className="mt-2 block bg-gradient-to-r from-white via-blue-300 to-violet-300 bg-clip-text text-transparent">
                Dari Video ke Shorts
              </span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((item) => (
              <div
                key={item.step}
                className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20"
              >
                <p className="text-sm font-semibold text-blue-300">
                  Step {item.step}
                </p>
                <h3 className="mt-3 text-2xl font-semibold">{item.title}</h3>
                <p className="mt-4 leading-7 text-white/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 text-center shadow-2xl shadow-black/30 md:p-12">
            <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-white/70">
              Siap Uji Coba
            </p>
            <h2 className="mt-5 text-3xl font-bold md:text-5xl">
              Mulai Bangun Workflow
              <span className="mt-2 block bg-gradient-to-r from-white via-blue-300 to-violet-300 bg-clip-text text-transparent">
                Repurpose Konten Kamu
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-8 text-white/60">
              Tempel link YouTube, jalankan simulasi AI clipping, lalu lihat
              bagaimana ClipForge bisa jadi fondasi produk creator tools kamu.
            </p>

            <button
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
              className="mt-8 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-4 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:opacity-95"
            >
              Coba Sekarang
            </button>
          </div>
        </section>
      </section>
    </main>
  );
}