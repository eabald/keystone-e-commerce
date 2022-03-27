import data from './data.json';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const { users } = data;
  for await (const user of users) {
    const currentUser = await prisma.user.findFirst({
      where: { email: user.email },
    });
    if (!currentUser) {
      await prisma.user.create({ data: { ...user, role: user.role as any } });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
