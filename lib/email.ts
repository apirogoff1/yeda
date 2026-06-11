import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface AppointmentEmailData {
  patientName: string
  patientPhone: string
  doctorName: string
  serviceName: string
  date: string
  time: string
  totalAmount: number
  patientEmail?: string
}

export async function sendAppointmentConfirmation(data: AppointmentEmailData) {
  // Отправляем на почту администратора клиники
  await resend.emails.send({
    from: 'МедПремиум <onboarding@resend.dev>',
    to: ['apirogoff1@gmail.com'],
    subject: `Новая запись: ${data.patientName}`,
    html: `
      <h2>Новая запись к врачу</h2>
      <p><b>Пациент:</b> ${data.patientName}</p>
      <p><b>Телефон:</b> ${data.patientPhone}</p>
      <p><b>Врач:</b> ${data.doctorName}</p>
      <p><b>Услуга:</b> ${data.serviceName}</p>
      <p><b>Дата:</b> ${data.date}</p>
      <p><b>Время:</b> ${data.time}</p>
      <p><b>Стоимость:</b> ${data.totalAmount} руб.</p>
    `,
  })
}
