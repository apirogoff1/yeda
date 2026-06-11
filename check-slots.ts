import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()
async function main() {
  const doctor = await p.doctor.findFirst({ include: { user: true } })
  console.log('Doctor ID:', doctor?.id)
  console.log('Doctor Name:', doctor?.user?.name)
  
  const today = new Date().toISOString().split('T')[0]
  console.log('Today:', today)
  
  const startOfDay = new Date(today)
  startOfDay.setHours(0, 0, 0, 0)
  const endOfDay = new Date(today)
  endOfDay.setHours(23, 59, 59, 999)
  
  if (doctor) {
    const slots = await p.timeSlot.findMany({
      where: {
        doctorId: doctor.id,
        startTime: { gte: startOfDay, lte: endOfDay },
        status: 'AVAILABLE',
      },
      take: 5,
      orderBy: { startTime: 'asc' },
    })
    console.log('Slots for today:', slots.length)
    console.log(JSON.stringify(slots, null, 2))
  }
  
  const total = await p.timeSlot.count()
  console.log('Total slots in DB:', total)
  
  await p.$disconnect()
}
main()