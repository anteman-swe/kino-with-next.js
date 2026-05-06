import { PrismaClient } from '@prisma/client/extension'
const prisma = new PrismaClient()

async function main() {
  await prisma.user.deleteMany({})

  // Skapa dummy-data
  await prisma.user.createMany({
    data: [
      { name: 'Anders', email: 'anders@example.com' },
      { name: 'Bertil', email: 'bertil@example.com' },
      { name: 'Cecilia', email: 'cecilia@example.com' },
    ],
  })
  console.log('Seedning klar!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })