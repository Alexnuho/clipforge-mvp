"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const clipData: Record<
  string,
  {
    title: string;
    score: number;
    duration: string;
    reason: string;
  }
> = {
  "1": {
    title: "Pernyataan pembuka yang paling bikin penasaran",
    score: 94,
    duration: "00:31",
    reason: "Hook kuat di 3 detik awal dan cocok untuk short video.",
  },
  "2": {
    title: "Insight utama yang punya nilai tinggi",
    score: 90,
    duration: "00:44",
    reason: "Bagian ini padat informasi dan berpotensi banyak disimpan.",
  },
  "3": {
    title: "Momen paling relate untuk audiens",
    score: 87,
    duration: "00:28",
    reason: "Kalimatnya mudah dipahami dan terasa dekat dengan penonton.",
  },
  "4": {
    title: "Bagian paling emosional dan engaging",
    score: 85,
    duration: "00:37",
    reason: "Ada unsur emosi yang biasanya bagus untuk retention.",
  },
  "5": {
    title: "Potongan terbaik untuk format viral shorts",
    score: 82,
    duration: "00:25",
    reason: "Durasi singkat, cepat, dan enak dijadikan konten pendek.",
  },
};

export default function ClipDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const clip = clipData[id];

  const handleDownload = () => {
    alert(`Download clip "${clip?.title}" dimulai (simulasi).`);
  };

  const handlePublish = () => {
    alert(`Clip "${clip?.title}" berhasil dipublish (simulasi).`);
  };

  if (!clip) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Clip tidak ditemukan</h1>
          <p className="mt-3 text-white/60">
            ID clip yang kamu buka tidak tersedia.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Link
            href="/results"
            className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10"
          >
            ← Kembali ke Hasil
          </Link>

          <p className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-white/70">
            Clip Detail Preview
          </p>
          <h1 className="text-4xl font-bold md:text-5xl">{clip.title}</h1>
          <p className="mt-4 max-w-2xl text-white/70">{clip.reason}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex aspect-[9/16] items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900 to-zinc-800">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/20 text-3xl">
                  ▶
                </div>
                <p className="text-lg font-semibold">Preview Video Dummy</p>
                <p className="mt-2 text-sm text-white/50">
                  Nanti di sini akan tampil video hasil clip sebenarnya
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="space-y-5">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-sm text-white/50">Clip ID</p>
                <p className="mt-1 text-lg font-semibold">#{id}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-sm text-white/50">Durasi</p>
                <p className="mt-1 text-lg font-semibold">{clip.duration}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-sm text-white/50">Viral Score</p>
                <p className="mt-1 text-3xl font-bold text-green-400">
                  {clip.score}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-sm text-white/50">Alasan AI Memilih Clip</p>
                <p className="mt-2 leading-7 text-white/80">{clip.reason}</p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleDownload}
                  className="flex-1 rounded-xl border border-white/10 bg-white/10 px-4 py-3 font-medium transition hover:bg-white/20"
                >
                  Download
                </button>
                <button
                  onClick={handlePublish}
                  className="flex-1 rounded-xl bg-blue-500 px-4 py-3 font-medium transition hover:bg-blue-400"
                >
                  Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}