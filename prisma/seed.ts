import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "better-auth/crypto";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@impactsphere.local";
  const password = process.env.ADMIN_PASSWORD || "adminpassword123";
  const name = process.env.ADMIN_NAME || "Admin User";

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    console.log(`Admin user ${email} already exists.`);
    if (existing.userType !== "ADMIN") {
      await prisma.user.update({
        where: { id: existing.id },
        data: { userType: "ADMIN" },
      });
      console.log("Promoted to ADMIN.");
    }
    await prisma.$disconnect();
    return;
  }

  const hashedPassword = await hashPassword(password);
  const id = crypto.randomUUID();
  const now = new Date();

  await prisma.user.create({
    data: {
      id,
      email,
      name,
      emailVerified: true,
      userType: "ADMIN",
      createdAt: now,
      updatedAt: now,
    },
  });

  await prisma.account.create({
    data: {
      id: crypto.randomUUID(),
      userId: id,
      accountId: email,
      providerId: "credential",
      password: hashedPassword,
      createdAt: now,
      updatedAt: now,
    },
  });

  console.log(`Admin user created: ${email}`);
  console.log(`Password: ${password}`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
