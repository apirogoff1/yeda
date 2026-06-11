import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const specs = await prisma.specialization.findMany()
  console.log('=== SPECIALIZATIONS ===')
  specs.forEach(s => console.log(`${s.slug}: ${s.name}`))

  const doctors = await prisma.doctor.findMany({ 
    include: { user: true, specialization: true, services: true } 
  })
  console.log('\n=== DOCTORS (first 3) ===')
  doctors.slice(0, 3).forEach(d => {
    console.log(`Name: ${d.user.name}`)
    console.log(`Specialization: ${d.specialization.name}`)
    console.log(`Bio: ${d.bio}`)
    console.log(`Services: ${d.services.map(s => s.name).join(', ')}`)
    console.log('---')
  })
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())