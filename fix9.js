const fs = require('fs');
let content = fs.readFileSync('prisma/seed.ts', 'utf8');

const oldClear = `  await prisma.timeSlot.deleteMany()
  await prisma.service.deleteMany()
  await prisma.appointment.deleteMany()
  await prisma.doctor.deleteMany()
  await prisma.user.deleteMany({ where: { role: 'patient' } })
  await prisma.specialization.deleteMany()`;

const newClear = `  await prisma.review.deleteMany()
  await prisma.notification.deleteMany()
  await prisma.payment.deleteMany()
  await prisma.appointment.deleteMany()
  await prisma.timeSlot.deleteMany()
  await prisma.service.deleteMany()
  await prisma.doctor.deleteMany()
  await prisma.user.deleteMany({ where: { role: { in: ['patient', 'doctor'] } } })
  await prisma.specialization.deleteMany()`;

content = content.replace(oldClear, newClear);
fs.writeFileSync('prisma/seed.ts', content, 'utf8');
console.log('done');
