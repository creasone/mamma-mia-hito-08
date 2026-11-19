import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { pizzas as localPizzas } from "../data/pizzas";
import { fetchJson } from "../services/api";
import { useCart } from "../context/CartContext";

function Pizza() {
  const { id } = useParams();
  const { addPizza } = useCart();
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPizza = async () => {
      try {
        setPizza(await fetchJson(`/api/pizzas/${id}`));
      } catch (requestError) {
        setError(`${requestError.message} Se muestran datos locales de respaldo.`);
        setPizza(localPizzas.find((item) => item.id === id) ?? null);
      } finally {
        setLoading(false);
      }
    };
    loadPizza();
  }, [id]);

  if (loading) return <p className="status-message">Cargando pizza...</p>;
  if (!pizza) return <p className="status-message status-message--error">No se encontró la pizza.</p>;

  return (
    <section className="pizza-detail" aria-labelledby="pizza-title">
      {error && <p className="api-notice" role="status">{error}</p>}
      <article className="pizza-detail__card">
        <img src={pizza.img} alt={`Pizza ${pizza.name}`} />
        <div className="pizza-detail__content">
          <span className="auth-card__eyebrow">Detalle de la pizza</span>
          <h1 id="pizza-title">Pizza {pizza.name}</h1>
          <p>{pizza.desc}</p>
          <h2>Ingredientes</h2>
          <ul>{pizza.ingredients.map((ingredient) => <li key={ingredient}>🍕 {ingredient}</li>)}</ul>
          <div className="pizza-detail__footer">
            <strong>${pizza.price.toLocaleString("es-CL")}</strong>
            <button className="button button--primary" type="button" onClick={() => addPizza(pizza)}>Añadir 🛒</button>
          </div>
        </div>
      </article>
    </section>
  );
}

export default Pizza;
