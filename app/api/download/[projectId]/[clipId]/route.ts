import { auth } from "../../../../auth";
import { prisma } from "../../../../lib/prisma";

const mockClips = [
  { id: "1", title: "Hook paling kuat di awal video", score: 92, duration: "00:35" },
  { id: "2", title: "Momen insight bisnis yang paling menarik", score: 88, duration: "00:42" },
  { id: "3", title: "Bagian yang berpotensi viral untuk shorts", score: 84, duration: "00:29" },
  { id: "4", title: "Potongan paling cocok untuk engagement", score: 81, duration: "00:31" },
  { id: "5", title: "Segmen paling kuat untuk teaser pendek", score: 79, duration: "00:27" },
];

type RouteContext = {
  params: Promise<{
    projectId: string;
    clipId: string;
  }>;
};

export async function GET(_: Request, context: RouteContext) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { projectId, clipId } = await context.params;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return new Response("User tidak ditemukan", { status: 404 });
    }

    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: user.id,
      },
    });

    if (!project) {
      return new Response("Project tidak ditemukan", { status: 404 });
    }

    const clip = mockClips.find((item) => item.id === clipId);

    if (!clip) {
      return new Response("Clip tidak ditemukan", { status: 404 });
    }

    const sourceLabel =
      project.sourceType === "upload"
        ? project.fileName || "Uploaded Video"
        : project.sourceUrl || "-";

    const fileContent = `
ClipForge Mock Export
=====================

Project ID   : ${project.id}
Project Title: ${project.title || "Project ClipForge"}
Source Type  : ${project.sourceType}
Source       : ${sourceLabel}
Status       : ${project.status}

Clip Detail
-----------
Clip ID      : ${clip.id}
Clip Title   : ${clip.title}
Viral Score  : ${clip.score}
Duration     : ${clip.duration}

Note:
File ini masih mock export untuk tahap MVP.
Tahap berikutnya bisa diganti menjadi hasil render MP4 sungguhan.
`.trim();

    const safeProjectTitle = (project.title || "project")
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .toLowerCase();

    const safeClipTitle = clip.title
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .toLowerCase();

    return new Response(fileContent, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Disposition": `attachment; filename="${safeProjectTitle}-${safeClipTitle}.txt"`,
      },
    });
  } catch (error) {
    console.error("DOWNLOAD_CLIP_ERROR", error);
    return new Response("Gagal mengunduh clip", { status: 500 });
  }
}