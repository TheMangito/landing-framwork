document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formulario');
  const emailInput = document.getElementById('email');
  const mensaje = document.getElementById('mensaje');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', emailInput.value);

    try {
      console.log(emailInput.value)
      const res = await fetch('/api/enviar_correo', {
        method: 'POST',
        body: formData, // ✅ FormData automáticamente usa "multipart/form-data"
        // ❌ No pongas headers manuales aquí
      });

      const msg = await res.text();
      mensaje.textContent = msg;
      mensaje.style.color = res.ok ? 'green' : 'red';
    } catch (error) {
      mensaje.textContent = 'Error al enviar el correo.';
      mensaje.style.color = 'red';
      console.error(error);
    }
  });
});
