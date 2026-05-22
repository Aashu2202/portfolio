import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields required' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // Notify owner
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New enquiry from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;padding:24px;background:#0a0907;color:#f5e6d3;border-radius:12px;">
          <h2 style="color:#d4a574;">New Portfolio Enquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color:#d4a574;">${email}</a></p>
          <p><strong>Message:</strong></p>
          <p style="background:#1a1410;padding:16px;border-radius:8px;color:#a8997f;">${message.replace(/\n/g, '<br>')}</p>
        </div>
      `,
    });

    // Auto-reply to sender
    await transporter.sendMail({
      from: `"Aashish Yadav" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Got your message, ${name}!`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;padding:24px;background:#0a0907;color:#f5e6d3;border-radius:12px;">
          <h2 style="color:#d4a574;">Hey ${name},</h2>
          <p style="color:#a8997f;">Thanks for reaching out! I've received your message and will get back to you within 24–48 hours.</p>
          <p style="color:#a8997f;">In the meantime, feel free to connect on
            <a href="https://www.linkedin.com/in/aashish-yadav-679a81217" style="color:#d4a574;">LinkedIn</a>
            or WhatsApp me at
            <a href="https://wa.me/917489838868" style="color:#d4a574;">+91 7489838868</a>.
          </p>
          <p style="color:#5c5346;margin-top:24px;font-size:12px;">— Aashish Yadav</p>
        </div>
      `,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Email error:', err.message);
    res.status(500).json({ error: 'Failed to send email' });
  }
}
