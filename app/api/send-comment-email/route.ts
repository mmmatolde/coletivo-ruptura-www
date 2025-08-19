import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, comment, tribuneTitle } = await req.json();

    if (!comment) {
      return NextResponse.json({ message: 'Comentário é obrigatório.' }, { status: 400 });
    }

    // Configura o transportador de email (substitua com as suas credenciais)
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: parseInt(process.env.EMAIL_SERVER_PORT || '587', 10),
      secure: process.env.EMAIL_SERVER_PORT === '465',
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO, // O email para onde o comentário será enviado
      subject: `Comentário à tribuna: "${tribuneTitle}"`, 
      html: `
        <p><strong>Nome:</strong> ${name || 'Não fornecido'}</p>
        <p><strong>Email:</strong> ${email || 'Não fornecido'}</p>
        <p><strong>Comentário:</strong></p>
        <p>${comment}</p>
        <p>---</p>
        <p>Este comentário foi submetido através do formulário de comentários privados na página da tribuna.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email enviado com sucesso!' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return NextResponse.json({ message: 'Erro ao enviar email.', error: (error as Error).message }, { status: 500 });
  }
}
