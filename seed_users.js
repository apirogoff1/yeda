const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()
async function main() {
  const hash = await bcrypt.hash('admin123', 10)
  const user = await prisma.user.upsert({
    where: { email: 'admin@yeda.ru' },
    update: {},
    create: { name: 'Admin', email: 'admin@yeda.ru', password: hash, role: 'ADMIN' }
  })
  console.log('Admin created:', user.email, user.role)
  const hash2 = await bcrypt.hash('user123', 10)
  const user2 = await prisma.user.upsert({
    where: { email: 'user@yeda.ru' },
    update: {},
    create: { name: 'User', email: 'user@yeda.ru', password: hash2, role: 'USER' }
  })
  console.log('User created:', user2.email, user2.role)
  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
