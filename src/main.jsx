import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";
import "./styles.css";

// BrowserRouter conserva las rutas académicas en desarrollo. HashRouter evita
// errores 404 al recargar una ruta dentro de GitHub Pages.
const Router = import.meta.env.PROD ? HashRouter : BrowserRouter;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router basename={import.meta.env.PROD ? undefined : import.meta.env.BASE_URL}>
      <CartProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </CartProvider>
    </Router>
  </StrictMode>,
);
