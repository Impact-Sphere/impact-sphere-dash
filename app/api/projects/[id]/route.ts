import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      ngo: {
        select: {
          id: true,
          name: true,
          image: true,
          ngoInfo: true,
        },
      },
      donations: {
        include: {
          company: {
            select: {
              id: true,
              name: true,
              image: true,
              companyInfo: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      },
      _count: { select: { donations: true } },
    },
  });

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(project);
}
