"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";

type SourceMode = "youtube" | "upload" | "drive";

const demoClips = [
  {
    id: 1,
    title: "Hook paling kuat di awal video",
    score: 92,
    duration: "00:35",
  },
  {
    id: 2,
    title: "Momen insight bisnis yang paling menarik",
    score: 88,
    duration: "00:42",
  },
  {
    id: 3,
    title: "Bagian yang berpotensi viral untuk shorts",
    score: 84,
    duration: "00:29",
  },
];

const featureBadges = [
  { icon: "✦", title: "Long to shorts" },
  { icon: "CC", title: "AI Captions" },
  { icon: "✂", title: "Video editor" },
  { icon: "〰", title: "Enhance speech" },
  { icon: "▣", title: "AI Reframe" },
  { icon: "▦", title: "AI B-Roll" },
];

export default function HomePage() {
  const [sourceMode, setSourceMode] = useState<SourceMode>("youtube");
  const [sourceUrl, setSourceUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const primaryPlaceholder = useMemo(() => {
    if (sourceMode === "youtube") return "Tempel link YouTube di sini...";
    if (sourceMode === "upload") return "Pilih file video untuk di-upload...";
    return "Google Drive integration akan segera tersedia...";
  }, [sourceMode]);

  async function handleGenerate() {
    if (sourceMode === "youtube") {
      if (!sourceUrl.trim()) {
        alert("Masukkan link video dulu.");
        return;
      }

      try {
        setIsSubmitting(true);

        const res = await fetch("/api/projects/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sourceUrl,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.error || "Gagal membuat project");
          return;
        }

        window.location.href = `/clips/${data.projectId}`;
      } catch (error) {
        console.error("HOME_GENERATE_YOUTUBE_ERROR", error);
        alert("Terjadi kesalahan saat membuat project");
      } finally {
        setIsSubmitting(false);
      }

      return;
    }

    if (sourceMode === "upload") {
      if (!selectedFile) {
        alert("Pilih file video dulu.");
        return;
      }

      try {
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("file", selectedFile);

        const res = await fetch("/api/projects/create", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.error || "Gagal membuat project upload");
          return;
        }

        window.location.href = `/clips/${data.projectId}`;
      } catch (error) {
        console.error("HOME_GENERATE_UPLOAD_ERROR", error);
        alert("Terjadi kesalahan saat membuat project upload");
      } finally {
        setIsSubmitting(false);
      }

      return;
    }

    alert("Google Drive akan kita integrasikan di tahap berikutnya.");
  }

  function handleTrySampleProject() {
    window.location.href = "/clips/sample-demo-project";
  }

  function handleChooseFile() {
    fileInputRef.current?.click();
  }

  const selectedFileName = selectedFile?.name || "";

  return (
    <main className="min-h-screen overflow-hidden text-white">
      <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-14 md:px-10 md:pt-20">
        <div className="absolute inset-x-0 top-10 -z-10 flex justify-center">
          <div className="h-[520px] w-[900px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.14),transparent_55%)] blur-3xl" />
        </div>

        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300 shadow-lg shadow-blue-500/10">
            <span className="h-2 w-2 rounded-full bg-blue-400" />
            AI Video Clipper for Viral Shorts
          </div>

          <h1 className="mt-8 text-4xl font-bold leading-tight tracking-tight md:text-7xl">
            Ubah 1 Link Video
            <span className="mt-2 block bg-gradient-to-r from-white via-blue-300 to-violet-300 bg-clip-text text-transparent">
              Menjadi 5 Clip Paling Viral
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/60 md:text-xl">
            ClipForge membantu creator mengubah video panjang menjadi short-form
            content yang lebih cepat ditinjau, dipilih, dan disiapkan untuk
            workflow konten berikutnya.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl rounded-[32px] border border-white/10 bg-black/45 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:p-8">
          <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 md:p-5">
            <div className="flex flex-col gap-4">
              <div className="flex min-h-16 items-center rounded-2xl border border-white/10 bg-black/30 px-5">
                {sourceMode === "youtube" && (
                  <input
                    type="text"
                    value={sourceUrl}
                    disabled={isSubmitting}
                    onChange={(e) => setSourceUrl(e.target.value)}
                    placeholder={primaryPlaceholder}
                    className="w-full bg-transparent text-lg text-white outline-none placeholder:text-white/35 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                )}

                {sourceMode === "upload" && (
                  <button
                    type="button"
                    onClick={handleChooseFile}
                    className="flex w-full items-center justify-between text-left"
                  >
                    <span className={selectedFileName ? "text-white" : "text-white/35"}>
                      {selectedFileName || primaryPlaceholder}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/60">
                      Browse
                    </span>
                  </button>
                )}

                {sourceMode === "drive" && (
                  <div className="w-full text-left text-white/35">
                    {primaryPlaceholder}
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    setSelectedFile(file || null);
                  }}
                />
              </div>

              <div className="flex flex-wrap items-center gap-6 px-1">
                <button
                  type="button"
                  onClick={() => setSourceMode("youtube")}
                  className={`inline-flex items-center gap-2 text-lg transition ${
                    sourceMode === "youtube"
                      ? "text-white"
                      : "text-white/55 hover:text-white/80"
                  }`}
                >
                  <span>🔗</span>
                  <span>YouTube Link</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSourceMode("upload")}
                  className={`inline-flex items-center gap-2 text-lg transition ${
                    sourceMode === "upload"
                      ? "text-white"
                      : "text-white/55 hover:text-white/80"
                  }`}
                >
                  <span>⤴</span>
                  <span>Upload</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSourceMode("drive")}
                  className={`inline-flex items-center gap-2 text-lg transition ${
                    sourceMode === "drive"
                      ? "text-white"
                      : "text-white/55 hover:text-white/80"
                  }`}
                >
                  <span>△</span>
                  <span>Google Drive</span>
                </button>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isSubmitting}
                className="mt-2 h-16 rounded-2xl bg-white text-xl font-semibold text-black transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Memproses..." : "Get clips in 1 click"}
              </button>

              <button
                type="button"
                onClick={handleTrySampleProject}
                className="text-center text-lg text-white underline decoration-white/40 underline-offset-4 transition hover:text-blue-200"
              >
                Click here to try a sample project
              </button>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 text-center md:grid-cols-4 xl:grid-cols-7">
            {featureBadges.map((item) => (
              <div key={item.title} className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-2xl text-white/90 shadow-lg shadow-black/20">
                  {item.icon}
                </div>
                <p className="mt-4 text-base font-medium text-white/90">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        <section className="mt-20 grid gap-6 md:grid-cols-3">
          {demoClips.map((clip, index) => (
            <div
              key={clip.id}
              className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_8px_40px_rgba(0,0,0,0.25)] backdrop-blur"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-blue-500/15 px-3 py-1 text-sm font-medium text-blue-300">
                  Clip {index + 1}
                </span>
                <span className="text-sm text-white/35">{clip.duration}</span>
              </div>

              <h3 className="mt-6 text-2xl font-semibold leading-9 text-white">
                {clip.title}
              </h3>

              <div className="mt-10 flex items-end justify-between">
                <div>
                  <p className="text-sm text-white/40">Viral Score</p>
                  <p className="mt-2 text-4xl font-bold text-emerald-400">
                    {clip.score}
                  </p>
                </div>

                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/50">
                  Short-ready
                </span>
              </div>

              <Link
                href="/results"
                className="mt-8 block w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-center text-base font-medium text-white/85 transition hover:bg-white/10"
              >
                Preview Clip
              </Link>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}