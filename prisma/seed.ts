import { auth } from '../src/lib/auth';
import { PrismaClient } from '../generated/client';

const prisma = new PrismaClient();

async function main() {
  // Create a user with an associated account
  const user = await prisma.user.create({
    data: {
      id: 'default-user',
      email: 'user@example.com',
      name: 'Test User',
      emailVerified: true,
      accounts: {
        create: {
          id: 'default-account',
          accountId: 'default-user',
          providerId: 'credential',
          password: await (await auth.$context).password.hash('password123'),
        },
      },
    },
  });

  console.log('Seeded user:', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
