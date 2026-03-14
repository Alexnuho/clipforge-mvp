import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function GET() {
  return NextResponse.json({
    hasUser: !!prisma.user,
    hasProject: !!prisma.project,
    hasAccount: !!prisma.account,
    hasSession: !!prisma.session,
    hasVerificationToken: !!prisma.verificationToken,
  });
}