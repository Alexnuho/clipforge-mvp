import { NextResponse } from "next/server";
import { auth } from "../../../auth";
import { prisma } from "../../../lib/prisma";
import { supabaseServer } from "../../../lib/supabase-server";

const BUCKET_NAME = "clipforge-videos";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const body = await req.json();
      const sourceUrl = body.sourceUrl?.trim();

      if (!sourceUrl) {
        return NextResponse.json(
          { error: "Source URL wajib diisi" },
          { status: 400 }
        );
      }

      const project = await prisma.project.create({
        data: {
          title: "Project dari YouTube Link",
          sourceUrl,
          sourceType: "youtube",
          status: "processing",
          userId: user.id,
        },
      });

      const completedProject = await prisma.project.update({
        where: {
          id: project.id,
        },
        data: {
          status: "completed",
        },
      });

      return NextResponse.json({
        ok: true,
        projectId: completedProject.id,
        project: completedProject,
      });
    }

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file");

      if (!(file instanceof File)) {
        return NextResponse.json(
          { error: "File video wajib dipilih" },
          { status: 400 }
        );
      }

      const initialProject = await prisma.project.create({
        data: {
          title: file.name || "Uploaded Video Project",
          sourceType: "upload",
          fileName: file.name,
          fileSize: file.size,
          mimeType: file.type || "video/mp4",
          status: "processing",
          userId: user.id,
        },
      });

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const safeFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
      const storagePath = `${user.id}/${Date.now()}-${safeFileName}`;

      const { error: uploadError } = await supabaseServer.storage
        .from(BUCKET_NAME)
        .upload(storagePath, buffer, {
          contentType: file.type || "video/mp4",
          upsert: false,
        });

      if (uploadError) {
        console.error("SUPABASE_UPLOAD_ERROR", uploadError);

        await prisma.project.update({
          where: {
            id: initialProject.id,
          },
          data: {
            status: "failed",
          },
        });

        return NextResponse.json(
          { error: "Gagal upload file ke storage" },
          { status: 500 }
        );
      }

      const { data: signedData, error: signedError } = await supabaseServer.storage
        .from(BUCKET_NAME)
        .createSignedUrl(storagePath, 60 * 60 * 24 * 7);

      if (signedError) {
        console.error("SUPABASE_SIGNED_URL_ERROR", signedError);
      }

      const completedProject = await prisma.project.update({
        where: {
          id: initialProject.id,
        },
        data: {
          storagePath,
          storageUrl: signedData?.signedUrl || null,
          status: "completed",
        },
      });

      return NextResponse.json({
        ok: true,
        projectId: completedProject.id,
        project: completedProject,
      });
    }

    return NextResponse.json(
      { error: "Format request tidak didukung" },
      { status: 400 }
    );
  } catch (error) {
    console.error("CREATE_PROJECT_ERROR", error);

    return NextResponse.json(
      { error: "Gagal membuat project" },
      { status: 500 }
    );
  }
}
