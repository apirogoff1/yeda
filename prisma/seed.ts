import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting clinic seeding...')

  await prisma.doctorReview.deleteMany()
  await prisma.clinicReview.deleteMany()
  await prisma.notification.deleteMany()
  await prisma.clinicPayment.deleteMany()
  await prisma.appointment.deleteMany()
  await prisma.timeSlot.deleteMany()
  await prisma.service.deleteMany()
  await prisma.doctor.deleteMany()
  await prisma.user.deleteMany({ where: { role: { in: ['patient', 'doctor'] } } })
  await prisma.specialization.deleteMany()
  console.log('Tables cleared')

  const specializations = [
    { slug: 'terapiya', name: 'Терапия' },
    { slug: 'kardiologiya', name: 'Кардиология' },
    { slug: 'nevrologiya', name: 'Неврология' },
    { slug: 'endokrinologiya', name: 'Эндокринология' },
    { slug: 'gastroenterologiya', name: 'Гастроэнтерология' },
    { slug: 'dermatologiya', name: 'Дерматология' },
    { slug: 'oftalmologiya', name: 'Офтальмология' },
    { slug: 'ortopediya', name: 'Ортопедия' },
  ]

  for (const spec of specializations) {
    await prisma.specialization.create({
      data: { name: spec.name, slug: spec.slug },
    })
  }

  console.log('Specializations created')

  const doctorsData = [
    { firstName: 'Борис', patronymic: 'Львович', lastName: 'Штерн', specSlug: 'terapiya', exp: 15 },
    { firstName: 'Наталья', patronymic: 'Игоревна', lastName: 'Васильева', specSlug: 'terapiya', exp: 12 },
    { firstName: 'Кирилл', patronymic: 'Станиславович', lastName: 'Зайцев', specSlug: 'terapiya', exp: 17 },
    { firstName: 'Мария', patronymic: 'Сергеевна', lastName: 'Козлова', specSlug: 'kardiologiya', exp: 16 },
    { firstName: 'Сергей', patronymic: 'Николаевич', lastName: 'Волков', specSlug: 'kardiologiya', exp: 20 },
    { firstName: 'Юлия', patronymic: 'Артуровна', lastName: 'Саркисян', specSlug: 'kardiologiya', exp: 14 },
    { firstName: 'Дмитрий', patronymic: 'Робертович', lastName: 'Левин', specSlug: 'nevrologiya', exp: 11 },
    { firstName: 'Елена', patronymic: 'Викторовна', lastName: 'Попова', specSlug: 'nevrologiya', exp: 10 },
    { firstName: 'Артём', patronymic: 'Геннадьевич', lastName: 'Куликов', specSlug: 'nevrologiya', exp: 25 },
    { firstName: 'Владимир', patronymic: 'Борисович', lastName: 'Морозов', specSlug: 'endokrinologiya', exp: 9 },
    { firstName: 'Татьяна', patronymic: 'Олеговна', lastName: 'Семёнова', specSlug: 'endokrinologiya', exp: 6 },
    { firstName: 'Виктория', patronymic: 'Львовна', lastName: 'Юдина', specSlug: 'endokrinologiya', exp: 11 },
    { firstName: 'Андрей', patronymic: 'Олегович', lastName: 'Ким', specSlug: 'gastroenterologiya', exp: 18 },
    { firstName: 'Максим', patronymic: 'Юрьевич', lastName: 'Голубев', specSlug: 'gastroenterologiya', exp: 8 },
    { firstName: 'Ирина', patronymic: 'Константиновна', lastName: 'Виноградова', specSlug: 'gastroenterologiya', exp: 21 },
    { firstName: 'Анна', patronymic: 'Дмитриевна', lastName: 'Лебедева', specSlug: 'dermatologiya', exp: 8 },
    { firstName: 'Павел', patronymic: 'Денисович', lastName: 'Беляев', specSlug: 'dermatologiya', exp: 7 },
    { firstName: 'Екатерина', patronymic: 'Робертовна', lastName: 'Тарасова', specSlug: 'dermatologiya', exp: 5 },
    { firstName: 'Игорь', patronymic: 'Михайлович', lastName: 'Соколов', specSlug: 'oftalmologiya', exp: 22 },
    { firstName: 'Роман', patronymic: 'Фёдорович', lastName: 'Богданов', specSlug: 'oftalmologiya', exp: 19 },
    { firstName: 'Алина', patronymic: 'Эдуардовна', lastName: 'Комиссарова', specSlug: 'oftalmologiya', exp: 15 },
    { firstName: 'Ольга', patronymic: 'Александровна', lastName: 'Новикова', specSlug: 'ortopediya', exp: 14 },
    { firstName: 'Даниил', patronymic: 'Валентинович', lastName: 'Белов', specSlug: 'ortopediya', exp: 10 },
    { firstName: 'Светлана', patronymic: 'Вадимовна', lastName: 'Воронова', specSlug: 'ortopediya', exp: 8 },
    { firstName: 'Елена', patronymic: 'Олеговна', lastName: 'Захарова', specSlug: 'ortopediya', exp: 12 },
  ]

  for (const d of doctorsData) {
    const spec = await prisma.specialization.findUnique({ where: { slug: d.specSlug } })
    if (!spec) continue

    const fullName = `${d.lastName} ${d.firstName} ${d.patronymic}`
    const email = `${d.firstName.toLowerCase()}.${d.lastName.toLowerCase()}@medpremium.ru`

    const user = await prisma.user.create({
      data: {
        name: fullName,
        email,
        password: '$2b$10$dummyhashfortestingpurposesonlynotrealpassword1234567890ab',
        role: 'patient',
      },
    })

    await prisma.doctor.create({
      data: {
        userId: user.id,
        specializationId: spec.id,
        experienceYears: d.exp,
        bio: `Врач высшей категории. Опыт работы ${d.exp} лет. Специализируется на диагностике и лечении широкого спектра заболеваний. Регулярно проходит повышение квалификации.`,
        rating: parseFloat((4.8 + Math.random() * 0.2).toFixed(1)),
        reviewsCount: Math.floor(Math.random() * 50) + 10,
      },
    })
  }

  console.log('Doctors created')

  const allDoctors = await prisma.doctor.findMany({ include: { specialization: true } })

  const serviceTemplates: Record<string, { name: string; price: number; duration: number }[]> = {
    terapiya: [
      { name: 'Первичная консультация терапевта', price: 4500, duration: 30 },
      { name: 'Повторная консультация терапевта', price: 3500, duration: 20 },
      { name: 'Программа профилактики', price: 5000, duration: 60 },
    ],
    kardiologiya: [
      { name: 'Консультация кардиолога', price: 5500, duration: 30 },
      { name: 'ЭКГ с расшифровкой', price: 2500, duration: 15 },
      { name: 'Суточное мониторирование ЭКГ', price: 6500, duration: 20 },
    ],
    nevrologiya: [
      { name: 'Консультация невролога', price: 5500, duration: 30 },
      { name: 'Программа диагностики головной боли', price: 6000, duration: 40 },
      { name: 'Лечебные процедуры', price: 4500, duration: 30 },
    ],
    endokrinologiya: [
      { name: 'Консультация эндокринолога', price: 5500, duration: 30 },
      { name: 'Комплексное обследование щитовидной железы', price: 7500, duration: 45 },
    ],
    gastroenterologiya: [
      { name: 'Консультация гастроэнтеролога', price: 5500, duration: 30 },
      { name: 'Комплексное обследование ЖКТ', price: 8500, duration: 60 },
    ],
    dermatologiya: [
      { name: 'Консультация дерматолога', price: 4500, duration: 20 },
      { name: 'Дерматоскопия', price: 2000, duration: 15 },
      { name: 'Удаление новообразований', price: 5000, duration: 30 },
    ],
    oftalmologiya: [
      { name: 'Консультация офтальмолога', price: 5000, duration: 20 },
      { name: 'Компьютерная диагностика зрения', price: 3500, duration: 25 },
      { name: 'Подбор очковой коррекции', price: 2500, duration: 15 },
    ],
    ortopediya: [
      { name: 'Консультация ортопеда', price: 5500, duration: 30 },
      { name: 'Внутрисуставные инъекции', price: 7500, duration: 20 },
    ],
  }

  for (const doctor of allDoctors) {
    const templates = serviceTemplates[doctor.specialization.slug] || serviceTemplates.terapiya
    for (const tpl of templates) {
      await prisma.service.create({
        data: {
          name: tpl.name,
          price: tpl.price,
          duration: tpl.duration,
          doctorId: doctor.id,
        },
      })
    }
  }

  console.log('Services created')

  const startDate = new Date()
  startDate.setHours(0, 0, 0, 0)

  for (const doctor of allDoctors) {
    for (let day = 0; day < 14; day++) {
      const date = new Date(startDate)
      date.setDate(date.getDate() + day)

      const dow = date.getDay()
      if (dow === 0 || dow === 6) continue

      for (let hour = 9; hour < 18; hour++) {
        for (let min = 0; min < 60; min += 30) {
          const start = new Date(date)
          start.setHours(hour, min, 0, 0)
          const end = new Date(start)
          end.setMinutes(end.getMinutes() + 30)

          await prisma.timeSlot.create({
            data: {
              doctorId: doctor.id,
              startTime: start,
              endTime: end,
              status: 'AVAILABLE',
            },
          })
        }
      }
    }
  }

  console.log('Time slots created')
  console.log('Clinic seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })