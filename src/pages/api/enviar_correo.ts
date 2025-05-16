// src/pages/api/enviar.ts
import { Resend } from 'resend';
import type { APIRoute } from 'astro';

const resend = new Resend(import.meta.env.RESEND_API_KEY); // Usa .env

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get('email');

  if (typeof email !== 'string') {
    return new Response('Correo inválido', { status: 400 });
  }

  try {
    await resend.emails.send({
      from: 'TuNombre <onboarding@resend.dev>',
      to: email,
      subject: '¡Gracias por contactarnos!',
      html: `<p>Hola, hemos recibido tu mensaje. ¡Gracias por escribirnos!</p>`,
    });

    return new Response('Correo enviado con éxito', { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response('Error al enviar el correo', { status: 500 });
  }
};
