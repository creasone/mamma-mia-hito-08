import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Ruta pública del repositorio usada por GitHub Pages.
  base: "/mamma-mia-hito-08/",
  plugins: [react()],
});
