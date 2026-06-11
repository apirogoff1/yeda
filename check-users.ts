import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true },
    take: 10,
  })
  
  console.log('=== ПОЛЬЗОВАТЕЛИ В БАЗЕ ===')
  users.forEach(u => {
    console.log(`ID: ${u.id}`)
    console.log(`Имя: ${u.name}`)
    console.log(`Email: ${u.email}`)
    console.log(`Роль: ${u.role}`)
    console.log('---')
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })