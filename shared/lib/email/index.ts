import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
})

export async function sendWelcomeEmail(to: string, name: string) {
  try {
    await transporter.sendMail({
      from: `YEDA <${process.env.GMAIL_USER}>`,
      to,
      subject: 'Welcome to YEDA!',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <div style="background: linear-gradient(135deg, #FF4D00, #ff7a3d); padding: 40px; border-radius: 16px; text-align: center; margin-bottom: 32px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Dobro pozhalovat v YEDA!</h1>
          </div>
          <h2 style="color: #433932;">Zdravstvuyte, ${name}!</h2>
          <p style="color: #6b7280; line-height: 1.6;">Vash akkaunt uspeshno sozdan.</p>
          <p style="color: #9ca3af; font-size: 14px; margin-top: 32px;">YEDA &mdash; dostavka edy</p>
        </div>
      `,
    })
    return { success: true }
  } catch (err) {
    console.error('Email error:', err)
    return { success: false, error: err }
  }
}

export async function sendSubscriptionEmail(to: string) {
  try {
    await transporter.sendMail({
      from: `YEDA <${process.env.GMAIL_USER}>`,
      to,
      subject: 'Vy podpisalis na rassylku YEDA!',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <div style="background: linear-gradient(135deg, #FF4D00, #ff7a3d); padding: 40px; border-radius: 16px; text-align: center; margin-bottom: 32px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Spasibo za podpisku!</h1>
          </div>
          <p style="color: #6b7280; line-height: 1.6;">Vy podpisalis na obnovleniya YEDA. My budem soobshchat vam o novinkakh i aktsiyakh.</p>
          <p style="color: #9ca3af; font-size: 14px; margin-top: 32px;">YEDA &mdash; dostavka edy</p>
        </div>
      `,
    })
    return { success: true }
  } catch (err) {
    console.error('Email error:', err)
    return { success: false, error: err }
  }
}

export async function sendContactEmail(data: { name: string; contact: string; order: string; topic: string; message: string }) {
  try {
    await transporter.sendMail({
      from: `YEDA Contact <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `Novoe obrashenie: ${data.topic || 'bez temy'} — ${data.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <div style="background: linear-gradient(135deg, #5BC4D8, #3DA8BE); padding: 32px; border-radius: 16px; text-align: center; margin-bottom: 32px;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Novoe obrashenie s sayta YEDA</h1>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 0; color: #6b7280; width: 140px;">Imya:</td><td style="padding: 10px 0; color: #111827; font-weight: 600;">${data.name}</td></tr>
            <tr><td style="padding: 10px 0; color: #6b7280;">Kontakt:</td><td style="padding: 10px 0; color: #111827; font-weight: 600;">${data.contact}</td></tr>
            <tr><td style="padding: 10px 0; color: #6b7280;">Nomer zakaza:</td><td style="padding: 10px 0; color: #111827;">${data.order || 'ne ukazan'}</td></tr>
            <tr><td style="padding: 10px 0; color: #6b7280;">Tema:</td><td style="padding: 10px 0; color: #111827;">${data.topic || 'ne ukazana'}</td></tr>
          </table>
          <div style="margin-top: 24px; padding: 20px; background: #f9fafb; border-radius: 12px; border-left: 4px solid #5BC4D8;">
            <p style="color: #6b7280; margin: 0 0 8px; font-size: 13px;">Soobshenie:</p>
            <p style="color: #111827; margin: 0; line-height: 1.6;">${data.message}</p>
          </div>
          <p style="color: #9ca3af; font-size: 13px; margin-top: 32px; text-align: center;">YEDA — dostavka edy</p>
        </div>
      `,
    })
    return { success: true }
  } catch (err) {
    return { success: false, error: err }
  }
}
