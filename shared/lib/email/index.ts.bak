import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(to: string, name: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'MyProject <onboarding@resend.dev>',
      to,
      subject: 'Welcome to MyProject!',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 40px; border-radius: 16px; text-align: center; margin-bottom: 32px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to MyProject!</h1>
          </div>
          <h2 style="color: #111827;">Hello, ${name}!</h2>
          <p style="color: #6b7280; line-height: 1.6;">
            Your account has been created successfully. You now have access to AI chat, dashboard and all features.
          </p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
             style="display: inline-block; background: #3b82f6; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 24px 0;">
            Go to Dashboard
          </a>
          <p style="color: #9ca3af; font-size: 14px; margin-top: 32px;">
            MyProject &mdash; AI-powered starter kit
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Email send error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Email error:', err);
    return { success: false, error: err };
  }
}

export async function sendSubscriptionEmail(to: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'MyProject <onboarding@resend.dev>',
      to,
      subject: 'You are subscribed to MyProject updates!',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 40px; border-radius: 16px; text-align: center; margin-bottom: 32px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">You are in!</h1>
          </div>
          <p style="color: #6b7280; line-height: 1.6;">
            Thank you for subscribing. We will send you updates about new features and tips.
          </p>
          <p style="color: #9ca3af; font-size: 14px; margin-top: 32px;">
            MyProject &mdash; AI-powered starter kit
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Email send error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Email error:', err);
    return { success: false, error: err };
  }
}

export async function sendContactEmail(data: { name: string; contact: string; order: string; topic: string; message: string }) {
  try {
    const { error } = await resend.emails.send({
      from: 'YEDA Contact <onboarding@resend.dev>',
      to: 'apirogoff1@gmail.com',
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
    });
    if (error) return { success: false, error };
    return { success: true };
  } catch (err) {
    return { success: false, error: err };
  }
}
