import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <span>404</span>
      <h1 id="not-found-title">Página no encontrada</h1>
      <p>La ruta que buscas no existe.</p>
      <Link className="button button--primary" to="/">Volver al inicio</Link>
    </section>
  );
}

export default NotFound;
