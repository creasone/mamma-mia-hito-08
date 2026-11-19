# Pizzería Mamma Mía — Hito 8

Examen final React de Pizzería Mamma Mía. Integra React Router, Context API, autenticación JWT y checkout contra el backend académico.

## Funcionalidades

- Registro e inicio de sesión reales.
- Perfil protegido consultado con token Bearer.
- Cierre de sesión y Navbar dinámico.
- Catálogo y detalles dinámicos desde la API.
- Carrito global y checkout autenticado.
- Mensajes diferenciados para operaciones exitosas y errores HTTP.

## Configuración y ejecución

1. Copia `.env.example` como `.env` y ajusta `VITE_API_URL` si el backend usa otra dirección.
2. Inicia el backend académico en `http://localhost:5000`.
3. Ejecuta:

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Compila con `pnpm build`.

## GitHub Pages

La interfaz puede publicarse en Pages. Registro, login, perfil y checkout requieren un backend público con CORS y HTTPS; con la configuración predeterminada `localhost` se prueban localmente.
