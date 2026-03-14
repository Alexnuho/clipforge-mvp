import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "../../auth";
import { prisma } from "../../lib/prisma";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const mockClips = [
  { id: "1", title: "Hook paling kuat di awal video", score: 92, duration: "00:35" },
  { id: "2", title: "Momen insight bisnis yang paling menarik", score: 88, duration: "00:42" },
  { id: "3", title: "Bagian yang berpotensi viral untuk shorts", score: 84, duration: "00:29" },
  { id: "4", title: "Potongan paling cocok untuk engagement", score: 81, duration: "00:31" },
  { id: "5", title: "Segmen paling kuat untuk teaser pendek", score: 79, duration: "00:27" },
];

function getStatusStyle(status: string) {
  switch (status) {
    case "completed":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-300";
    case "processing":
      return "border-amber-500/20 bg-amber-500/10 text-amber-300";
    case "failed":
      return "border-red-500/20 bg-red-500/10 text-red-300";
    default:
      return "border-white/10 bg-white/5 text-white/45";
  }
}

function getSourceTypeStyle(sourceType: string) {
  switch (sourceType) {
    case "upload":
      return "border-blue-500/20 bg-blue-500/10 text-blue-300";
    case "youtube":
      return "border-violet-500/20 bg-violet-500/10 text-violet-300";
    default:
      return "border-white/10 bg-white/5 text-white/45";
  }
}

export default async function ClipProjectPage({ params }: PageProps) {
  const session = await auth();

  if (!session?.user?.email) {
    return (
      <main className="mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col px-6 py-16">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl">
          <h1 className="text-4xl font-semibold text-white">Login Dulu</h1>
          <p className="mt-4 max-w-2xl text-white/60">
            Kamu perlu login untuk membuka halaman hasil project.
          </p>
          <div className="mt-8">
            <Link
              href="/api/auth/signin"
              className="rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-4 text-base font-semibold text-white"
            >
              Login Sekarang
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    notFound();
  }

  const project = await prisma.project.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!project) {
    notFound();
  }

  const statusDescription =
    project.status === "completed"
      ? "Project selesai diproses dan siap direview."
      : project.status === "failed"
      ? "Project gagal diproses. Nanti bisa kita tambahkan retry flow."
      : "Project masih diproses.";

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col px-6 py-16">
      <div className="flex flex-wrap items-center gap-4">
        <Link
          href="/history"
          className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/70 transition hover:bg-white/10"
        >
          ← Kembali ke History
        </Link>

        <span
          className={`rounded-full border px-4 py-2 text-sm ${getStatusStyle(
            project.status
          )}`}
        >
          Status: {project.status}
        </span>

        <span
          className={`rounded-full border px-4 py-2 text-sm ${getSourceTypeStyle(
            project.sourceType
          )}`}
        >
          Source: {project.sourceType}
        </span>
      </div>

      <section className="mt-8 rounded-[32px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_10px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-10">
        <p className="text-sm text-white/35">Project Detail</p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">
          {project.title || "Project ClipForge"}
        </h1>

        <p className="mt-6 break-all text-lg leading-8 text-white/60">
          {project.sourceType === "upload"
            ? project.storagePath || project.fileName || "Uploaded Video"
            : project.sourceUrl || "-"}
        </p>

        <p className="mt-4 text-base text-white/45">{statusDescription}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/45">
            Dibuat: {new Date(project.createdAt).toLocaleString("id-ID")}
          </span>

          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/45">
            Project ID: {project.id}
          </span>

          {project.fileName && (
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/45">
              File: {project.fileName}
            </span>
          )}

          {project.fileSize && (
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/45">
              Size: {(project.fileSize / 1024 / 1024).toFixed(2)} MB
            </span>
          )}

          {project.mimeType && (
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/45">
              Type: {project.mimeType}
            </span>
          )}

          {project.storagePath && (
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/45">
              Storage: {project.storagePath}
            </span>
          )}
        </div>

        {project.storageUrl && (
          <div className="mt-6">
            <a
              href={project.storageUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-2xl border border-blue-500/30 bg-blue-500/10 px-5 py-3 text-sm font-medium text-blue-200 transition hover:bg-blue-500/15"
            >
              Buka File di Storage
            </a>
          </div>
        )}
      </section>

      <section className="mt-10">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-white">Hasil Clip</h2>
            <p className="mt-2 text-white/55">
              Demo hasil sementara untuk project ini. Project yang sukses sekarang
              otomatis berstatus completed.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/50">
            Download clip masih berupa mock export `.txt`
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {mockClips.map((clip) => (
            <div
              key={clip.id}
              className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_8px_40px_rgba(0,0,0,0.25)] backdrop-blur"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-blue-500/15 px-3 py-1 text-sm font-medium text-blue-300">
                  Clip {clip.id}
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

              <div className="mt-8 grid grid-cols-2 gap-3">
                <button className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-base font-medium text-white/85 transition hover:bg-white/10">
                  Preview
                </button>

                <a
                  href={`/api/download/${project.id}/${clip.id}`}
                  className="rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-4 text-center text-base font-semibold text-white shadow-[0_0_30px_rgba(99,102,241,0.3)] transition hover:opacity-95"
                >
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
