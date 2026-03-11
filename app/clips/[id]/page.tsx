"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { clips } from "../../data/clips";

export default function ClipDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const clip = clips.find((item) => item.id.toString() === id);

  const handleDownload = () => {
    alert(`Download clip "${clip?.title}" dimulai (simulasi).`);
  };

  const handlePublish = () => {
    alert(`Clip "${clip?.title}" berhasil dipublish (simulasi).`);
  };

  if (!clip) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 text-white">
        <div className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-white/5 p-10 text-center shadow-2xl shadow-black/30">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/5 text-3xl">
            🎬
          </div>
          <h1 className="mt-5 text-3xl font-bold">Clip tidak ditemukan</h1>
          <p className="mt-3 text-white/60">
            ID clip yang kamu buka tidak tersedia.
          </p>
          <Link
            href="/results"
            className="mt-6 inline-flex rounded-2xl border border-white/10 bg-white/10 px-5 py-3 font-medium transition hover:bg-white/15"
          >
            Kembali ke Hasil
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-14 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <Link
            href="/results"
            className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10"
          >
            ← Kembali ke Hasil
          </Link>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20">
            <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-white/70">
              Clip Detail Preview
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
              {clip.title}
            </h1>

            <p className="mt-4 max-w-2xl text-white/65">{clip.reason}</p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20">
            <div className="flex aspect-[9/16] items-center justify-center rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(24,24,27,0.95),rgba(15,15,20,0.95))]">
              <div className="text-center">
                <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-4xl text-white shadow-xl shadow-blue-500/20">
                  ▶
                </div>
                <p className="text-2xl font-semibold text-white">
                  Preview Video Dummy
                </p>
                <p className="mt-3 text-sm text-white/50">
                  Nanti di sini akan tampil video hasil clip sebenarnya
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20">
            <div className="space-y-5">
              <div className="rounded-[22px] border border-white/10 bg-black/20 p-5">
                <p className="text-sm text-white/45">Clip ID</p>
                <p className="mt-2 text-xl font-semibold text-white">#{id}</p>
              </div>

              <div className="rounded-[22px] border border-white/10 bg-black/20 p-5">
                <p className="text-sm text-white/45">Durasi</p>
                <p className="mt-2 text-xl font-semibold text-white">
                  {clip.duration}
                </p>
              </div>

              <div className="rounded-[22px] border border-white/10 bg-black/20 p-5">
                <p className="text-sm text-white/45">Viral Score</p>
                <div className="mt-2 flex items-end justify-between">
                  <p className="text-4xl font-bold text-emerald-400">
                    {clip.score}
                  </p>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/55">
                    AI Selected
                  </span>
                </div>
              </div>

              <div className="rounded-[22px] border border-white/10 bg-black/20 p-5">
                <p className="text-sm text-white/45">Alasan AI Memilih Clip</p>
                <p className="mt-3 leading-7 text-white/80">{clip.reason}</p>
              </div>

              <div className="grid gap-3 pt-1 md:grid-cols-2">
                <button
                  onClick={handleDownload}
                  className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 font-medium text-white transition hover:bg-white/15"
                >
                  Download
                </button>

                <button
                  onClick={handlePublish}
                  className="rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-4 font-medium text-white shadow-lg shadow-blue-500/20 transition hover:opacity-95"
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