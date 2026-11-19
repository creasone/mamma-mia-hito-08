# Reporte final — Pizzería Mamma Mía Hito 8

## Estado

Implementación funcional completada, validada localmente y publicada. Los seis repositorios son públicos, sus workflows finalizaron correctamente y las seis aplicaciones respondieron HTTP 200 en GitHub Pages.

## Publicación verificada

| Hito | Repositorio público | GitHub Pages |
| --- | --- | --- |
| 3 | https://github.com/creasone/mamma-mia-hito-03 | https://creasone.github.io/mamma-mia-hito-03/ |
| 4 | https://github.com/creasone/mamma-mia-hito-04 | https://creasone.github.io/mamma-mia-hito-04/ |
| 5 | https://github.com/creasone/mamma-mia-hito-05 | https://creasone.github.io/mamma-mia-hito-05/ |
| 6 | https://github.com/creasone/mamma-mia-hito-06 | https://creasone.github.io/mamma-mia-hito-06/ |
| 7 | https://github.com/creasone/mamma-mia-hito-07 | https://creasone.github.io/mamma-mia-hito-07/ |
| 8 | https://github.com/creasone/mamma-mia-hito-08 | https://creasone.github.io/mamma-mia-hito-08/ |

## Evaluación de la rúbrica

| Criterio | Puntaje |
| --- | ---: |
| Login y Register reales en UserContext | 2/2 |
| Logout elimina token y email | 1/1 |
| Perfil mediante `GET /api/auth/me` y Bearer token | 1/1 |
| Formularios conectados al backend | 2/2 |
| Profile muestra email y permite cerrar sesión | 1/1 |
| Navbar conectado a logout real | 1/1 |
| Checkout autenticado con `{ cart: [...] }` | 1/1 |
| Éxito solo tras respuesta satisfactoria | 1/1 |
| **Total estimado** | **10/10** |

## Pruebas realizadas

- `pnpm install --frozen-lockfile`: correcto.
- `pnpm build`: correcto, 38 módulos transformados.
- GitHub Actions: seis despliegues completados con estado `success`.
- GitHub Pages: seis URL comprobadas con respuesta HTTP 200 y título «Pizzería Mamma Mía».
- Registro real de un usuario de prueba contra el backend: correcto.
- `GET /api/auth/me`: el perfil mostró el email autenticado.
- `POST /api/checkouts`: correcto; se mostró exactamente «¡Compra realizada con éxito!».
- Logout: eliminó la sesión, actualizó el Navbar y deshabilitó Pagar.
- Login inválido: mostró `User not found` y no presentó un falso mensaje de éxito.
- Rutas dinámicas, protegidas y carrito global: correctos.

## Limitación de la demo publicada

GitHub Pages aloja solo el frontend estático. Las operaciones autenticadas requieren que `VITE_API_URL` apunte a un backend público HTTPS con CORS; la configuración académica local se valida ejecutando frontend y backend en el equipo.
