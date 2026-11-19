import { useEffect, useState } from "react";
import CardPizza from "../components/CardPizza";
import Header from "../components/Header";
import { pizzas as localPizzas } from "../data/pizzas";
import { fetchJson } from "../services/api";
import { useCart } from "../context/CartContext";

function Home() {
  const { addPizza } = useCart();
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPizzas = async () => {
      try {
        setPizzas(await fetchJson("/api/pizzas"));
      } catch (requestError) {
        setError(`${requestError.message} Se muestran datos locales de respaldo.`);
        setPizzas(localPizzas);
      } finally {
        setLoading(false);
      }
    };
    loadPizzas();
  }, []);

  return (
    <>
      <Header />
      <section className="menu" aria-labelledby="menu-title">
        <div className="section-heading">
          <span>Nuestro menú</span>
          <h2 id="menu-title">Elige tu favorita</h2>
          <p>Pizzas obtenidas desde la API académica.</p>
        </div>
        {loading && <p className="status-message">Cargando pizzas...</p>}
        {error && <p className="api-notice" role="status">{error}</p>}
        <div className="pizza-grid">
          {pizzas.map((pizza) => <CardPizza key={pizza.id} {...pizza} onAdd={() => addPizza(pizza)} />)}
        </div>
      </section>
    </>
  );
}

export default Home;
