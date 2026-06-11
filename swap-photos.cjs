const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
async function main() {
  const users = await prisma.user.findMany({ where: { name: { contains: 'Ким' } } })
  const users2 = await prisma.user.findMany({ where: { name: { contains: 'Левин' } } })
  const kim = await prisma.doctor.findUnique({ where: { userId: users[0].id } })
  const levin = await prisma.doctor.findUnique({ where: { userId: users2[0].id } })
  const kimPhoto = kim.photoUrl
  await prisma.doctor.update({ where: { id: kim.id }, data: { photoUrl: levin.photoUrl } })
  await prisma.doctor.update({ where: { id: levin.id }, data: { photoUrl: kimPhoto } })
  console.log('Поменяли местами!')
}
main().catch(console.error).finally(() => prisma.$disconnect())
