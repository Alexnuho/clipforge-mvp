import Link from "next/link";
import { auth } from "../auth";
import { prisma } from "../lib/prisma";

type ProjectItem = {
  id: string;
  title: string | null;
  sourceUrl: string | null;
  sourceType: string;
  fileName: string | null;
  fileSize: number | null;
  mimeType: string | null;
  storagePath: string | null;
  storageUrl: string | null;
  status: string;
  createdAt: Date;
};

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

export default async function HistoryPage() {
  const session = await auth();

  if (!session?.user?.email) {
    return (
      <main className="mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col px-6 py-16">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl">
          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/50">
            History ClipForge
          </span>

          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white md:text-6xl">
            Login Dulu
            <br />
            Untuk Melihat Riwayat
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
            Riwayat project hanya tersedia untuk user yang sudah login. Masuk ke
            akun Google kamu lalu kembali ke halaman ini.
          </p>

          <div className="mt-10">
            <Link
              href="/api/auth/signin"
              className="rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-4 text-base font-semibold text-white shadow-[0_0_40px_rgba(59,130,246,0.28)] transition hover:opacity-95"
            >
              Login Sekarang
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      projects: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const projects: ProjectItem[] = (user?.projects ?? []) as ProjectItem[];

  const completedCount = projects.filter(
    (p: ProjectItem) => p.status === "completed"
  ).length;
  const processingCount = projects.filter(
    (p: ProjectItem) => p.status === "processing"
  ).length;
  const failedCount = projects.filter(
    (p: ProjectItem) => p.status === "failed"
  ).length;

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col px-6 py-16">
      <Link
        href="/"
        className="mb-8 inline-flex w-fit rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/70 transition hover:bg-white/10"
      >
        ← Kembali ke Home
      </Link>

      <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_10px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/50">
              History ClipForge
            </span>

            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white md:text-7xl">
              Riwayat
              <br />
              Project Kamu
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">
              Semua link video dan upload yang pernah kamu proses akan muncul di
              sini dan bisa langsung dibuka kembali untuk melihat detail hasil
              project.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
                Completed: {completedCount}
              </span>
              <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-sm text-amber-300">
                Processing: {processingCount}
              </span>
              <span className="rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-300">
                Failed: {failedCount}
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/60">
            <p className="font-medium text-white">
              {session.user.name || "User ClipForge"}
            </p>
            <p className="mt-1 text-white/45">{session.user.email}</p>
            <p className="mt-3 text-xs text-white/35">
              Total project: {projects.length}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10">
        {projects.length === 0 ? (
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-10 text-center backdrop-blur-xl">
            <h2 className="text-3xl font-semibold text-white">
              Belum Ada Project
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/55">
              Kamu belum menyimpan project apa pun. Kembali ke homepage, tempel
              link YouTube atau upload video, lalu klik Generate Clips untuk
              membuat project pertama.
            </p>

            <div className="mt-8">
              <Link
                href="/"
                className="rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-4 text-base font-semibold text-white shadow-[0_0_40px_rgba(59,130,246,0.28)] transition hover:opacity-95"
              >
                Buat Project Pertama
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            {projects.map((project: ProjectItem) => (
              <Link
                key={project.id}
                href={`/clips/${project.id}`}
                className="group block rounded-[28px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_8px_40px_rgba(0,0,0,0.25)] backdrop-blur transition hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.05]"
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-white/35">Source Video</p>

                    <h3 className="mt-3 text-2xl font-semibold text-white">
                      {project.title || "Project ClipForge"}
                    </h3>

                    <p className="mt-4 break-all text-base text-white/70">
                      {project.sourceType === "upload"
                        ? project.storagePath ||
                          project.fileName ||
                          "Uploaded Video"
                        : project.sourceUrl || "-"}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-3">
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

                      <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/45">
                        Dibuat:{" "}
                        {new Date(project.createdAt).toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <span className="rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(99,102,241,0.3)] transition group-hover:opacity-95">
                      Lihat Hasil
                    </span>

                    <span className="rounded-2xl border border-blue-500/30 bg-blue-500/10 px-5 py-3 text-sm font-medium text-blue-200">
                      Proses Ulang
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
