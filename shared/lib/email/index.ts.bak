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
