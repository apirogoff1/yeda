import { PrismaClient, MenuCategory } from '@prisma/client'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()
async function main() {
  const adminHash = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@yeda.ru' },
    update: {},
    create: { name: 'Admin', email: 'admin@yeda.ru', password: adminHash, role: 'ADMIN' }
  })
  console.log('Admin:', admin.email, admin.role)
  const userHash = await bcrypt.hash('user123', 10)
  const user = await prisma.user.upsert({
    where: { email: 'user@yeda.ru' },
    update: {},
    create: { name: 'User', email: 'user@yeda.ru', password: userHash, role: 'USER' }
  })
  console.log('User:', user.email, user.role)
  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
