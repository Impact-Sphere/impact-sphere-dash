import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const {
    userType,
    organizationName,
    taxIdentificationNumber,
    contactInfo,
    causesSupported,
    mainGoals,
    challenges,
  } = body;

  if (!["NGO", "COMPANY"].includes(userType)) {
    return NextResponse.json(
      { error: "Invalid user type. Must be NGO or COMPANY." },
      { status: 400 }
    );
  }

  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: session.user.id },
      data: { userType },
    });

    if (userType === "COMPANY") {
      await tx.companyInfo.create({
        data: {
          id: crypto.randomUUID(),
          userId: session.user.id,
          companyName: organizationName || "",
          taxIdentificationNumber: taxIdentificationNumber || "",
          contactInfo: contactInfo || "",
          causesSupported: causesSupported || "",
        },
      });
    } else if (userType === "NGO") {
      await tx.ngoInfo.create({
        data: {
          id: crypto.randomUUID(),
          userId: session.user.id,
          ngoName: organizationName || "",
          taxIdentificationNumber: taxIdentificationNumber || "",
          contactInfo: contactInfo || "",
          mainGoals: mainGoals || "",
          challenges: challenges || "",
        },
      });
    }
  });

  return NextResponse.json({ success: true });
}
