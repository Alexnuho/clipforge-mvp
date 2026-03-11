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
    <main className="min-h-screen bg-black px-6 py-14 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <Link
            href="/"
            className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10"
          >
            ← Kembali ke Home
          </Link>

          <div className="mb-3 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-white/70">
              History ClipForge
            </p>

            {history.length > 0 && (
              <button
                onClick={handleClearAll}
                className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/20"
              >
                Hapus Semua Riwayat
              </button>
            )}
          </div>

          <h1 className="text-4xl font-bold md:text-5xl">Riwayat Project</h1>

          <p className="mt-4 max-w-2xl text-white/70">
            Semua link video yang pernah kamu proses akan muncul di sini.
          </p>
        </div>

        {history.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
            <p className="text-lg font-medium">Belum ada riwayat project</p>
            <p className="mt-2 text-white/60">
              Coba generate video dari halaman utama terlebih dahulu.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-white/50">Source Video</p>
                    <p className="mt-1 break-all text-white/90">{item.video}</p>
                    <p className="mt-2 text-sm text-white/50">
                      Diproses pada: {item.createdAt}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 md:w-auto">
                    <Link
                      href={`/results?video=${encodeURIComponent(item.video)}`}
                      className="inline-flex rounded-xl bg-blue-500 px-4 py-3 text-center font-medium transition hover:bg-blue-400"
                    >
                      Lihat Hasil
                    </Link>

                    <button
                      onClick={() => handleReprocess(item.video)}
                      className="rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 font-medium text-blue-300 transition hover:bg-blue-500/20"
                    >
                      Proses Ulang
                    </button>

                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 font-medium text-red-300 transition hover:bg-red-500/20"
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