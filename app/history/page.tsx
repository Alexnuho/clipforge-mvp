"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type HistoryItem = {
  id: string;
  video: string;
  createdAt: string;
};

export default function HistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("clipforge-history");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleDeleteItem = (id: string) => {
    const updatedHistory = history.filter((item) => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem("clipforge-history", JSON.stringify(updatedHistory));
  };

  const handleClearAll = () => {
    const confirmed = window.confirm(
      "Apakah kamu yakin ingin menghapus semua riwayat?"
    );

    if (!confirmed) return;

    setHistory([]);
    localStorage.removeItem("clipforge-history");
  };

  const handleReprocess = (video: string) => {
    router.push(`/processing?video=${encodeURIComponent(video)}`);
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
            <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-white/70">
                History ClipForge
              </p>

              {history.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300 transition hover:bg-red-500/20"
                >
                  Hapus Semua Riwayat
                </button>
              )}
            </div>

            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Riwayat
              <span className="mt-2 block bg-gradient-to-r from-white via-blue-300 to-violet-300 bg-clip-text text-transparent">
                Project Kamu
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-white/65">
              Semua link video yang pernah kamu proses akan muncul di sini dan
              bisa langsung dibuka kembali atau diproses ulang.
            </p>
          </div>
        </div>

        {history.length === 0 ? (
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-10 text-center shadow-xl shadow-black/20">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/5 text-3xl">
              📂
            </div>
            <p className="mt-5 text-2xl font-semibold">Belum ada riwayat</p>
            <p className="mt-2 text-white/55">
              Coba generate video dari halaman utama terlebih dahulu.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {history.map((item) => (
              <div
                key={item.id}
                className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20 transition hover:border-white/15"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-white/45">Source Video</p>
                    <p className="mt-2 break-all text-base leading-7 text-white/90">
                      {item.video}
                    </p>
                    <div className="mt-4 inline-flex rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/50">
                      Diproses pada: {item.createdAt}
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3 lg:w-auto">
                    <Link
                      href={`/results?video=${encodeURIComponent(item.video)}`}
                      className="rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-3 text-center font-medium text-white shadow-lg shadow-blue-500/20 transition hover:opacity-95"
                    >
                      Lihat Hasil
                    </Link>

                    <button
                      onClick={() => handleReprocess(item.video)}
                      className="rounded-2xl border border-blue-500/30 bg-blue-500/10 px-5 py-3 font-medium text-blue-300 transition hover:bg-blue-500/20"
                    >
                      Proses Ulang
                    </button>

                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-3 font-medium text-red-300 transition hover:bg-red-500/20"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}