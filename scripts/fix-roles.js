const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Находим всех врачей (у кого есть запись в таблице Doctor)
  const doctors = await prisma.doctor.findMany({ select: { userId: true } })
  const doctorUserIds = doctors.map(d => d.userId)
  console.log('Врачей найдено:', doctorUserIds.length)

  // Обновляем роль на doctor
  const updated = await prisma.user.updateMany({
    where: { id: { in: doctorUserIds } },
    data: { role: 'doctor' }
  })
  console.log('Роли обновлены:', updated.count)

  // Удаляем пользователей с ролью patient у которых нет записей и они не врачи
  const deleted = await prisma.user.deleteMany({
    where: {
      role: 'patient',
      patientAppointments: { none: {} },
      doctor: null
    }
  })
  console.log('Удалено лишних пользователей:', deleted.count)
}

main().then(() => prisma.$disconnect()).catch(console.error)
