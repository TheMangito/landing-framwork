// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import node from '@astrojs/node';
//import dotenv from 'dotenv';
//dotenv.config();



// https://astro.build/config
export default defineConfig({
    vite: {
    plugins: [tailwindcss()],
  },
    output: 'server', // importante para puntos API que usan request.formData()
    adapter: node({ mode: 'standalone' }),
});
