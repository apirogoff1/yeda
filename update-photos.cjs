const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const photos = [
    { name: 'Штерн', photo: '/doctors/doctor-5.jpg' },
    { name: 'Васильева', photo: '/doctors/doctor-1.jpg' },
    { name: 'Зайцев', photo: '/doctors/doctor-6.jpg' },
    { name: 'Козлова', photo: '/doctors/doctor-2.jpg' },
    { name: 'Волков', photo: '/doctors/doctor-8.jpg' },
    { name: 'Саркисян', photo: '/doctors/doctor-3.jpg' },
    { name: 'Левин', photo: '/doctors/doctor-10.jpg' },
    { name: 'Попова', photo: '/doctors/doctor-4.jpg' },
    { name: 'Куликов', photo: '/doctors/doctor-11.jpg' },
    { name: 'Морозов', photo: '/doctors/doctor-13.jpg' },
    { name: 'Семёнова', photo: '/doctors/doctor-7.jpg' },
    { name: 'Юдина', photo: '/doctors/doctor-9.jpg' },
    { name: 'Ким', photo: '/doctors/doctor-15.jpg' },
    { name: 'Голубев', photo: '/doctors/doctor-16.jpg' },
    { name: 'Виноградова', photo: '/doctors/doctor-12.jpg' },
    { name: 'Лебедева', photo: '/doctors/doctor-14.jpg' },
    { name: 'Беляев', photo: '/doctors/doctor-17.jpg' },
    { name: 'Тарасова', photo: '/doctors/doctor-18.jpg' },
    { name: 'Соколов', photo: '/doctors/doctor-19.jpg' },
    { name: 'Богданов', photo: '/doctors/doctor-23.jpg' },
    { name: 'Комиссарова', photo: '/doctors/doctor-20.jpg' },
    { name: 'Новикова', photo: '/doctors/doctor-21.jpg' },
    { name: 'Белов', photo: '/doctors/doctor-25.jpg' },
    { name: 'Воронова', photo: '/doctors/doctor-22.jpg' },
    { name: 'Захарова', photo: '/doctors/doctor-24.jpg' },
  ]

  for (const p of photos) {
    const users = await prisma.user.findMany({ where: { name: { contains: p.name } } })
    for (const user of users) {
      const doctor = await prisma.doctor.findUnique({ where: { userId: user.id } })
      if (doctor) {
        await prisma.doctor.update({ where: { id: doctor.id }, data: { photoUrl: p.photo } })
        console.log('Updated: ' + user.name + ' -> ' + p.photo)
      }
    }
  }
  console.log('Done!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
