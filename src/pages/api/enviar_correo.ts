import { Resend } from 'resend';
import type { APIRoute } from 'astro';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get('email');

  if (typeof email !== 'string') {
    return new Response('Correo inválido', { status: 400 });
  }

  try {
    await resend.emails.send({
      from: 'BabyMonsters <BabyMonsters@marketpick.com.mx>',
      to: email,
      subject: '¡Gracias por contactarnos!',
      html: `<p>Hola, hemos recibido tu correo. ¡Gracias por escribirnos!</p>`,
    });

    return new Response('Correo enviado con éxito', { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response('Error al enviar el correo', { status: 500 });
  }
};

