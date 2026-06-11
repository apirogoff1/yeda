import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
prisma.user.findMany({ select: { name: true } })
  .then(users => users.forEach(u => console.log(u.name)))
  .finally(() => prisma.$disconnect())