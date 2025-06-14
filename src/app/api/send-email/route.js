import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req) {
  const { name, email, phone, company, message } = await req.json(); // Receive data from the frontend

  const emailContent = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Company:</strong> ${company}</p>
    <p><strong>Message:</strong> ${message}</p>
  `;

  try {
    await transporter.sendMail({
      from: `"ONETECH and AI" <${process.env.EMAIL_USER}>`,
      to:process.env.SEND_EMAIL,
      subject: 'New Contact Form Submission',
      html: emailContent,
    });

    console.log('Contact form email sent successfully to miangali927@gmail.com');
    return new Response(JSON.stringify({ message: 'Email sent successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ message: 'Failed to send email', error: error.message }), { status: 500 });
  }
}
