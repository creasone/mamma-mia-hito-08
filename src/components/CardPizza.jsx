import { Link } from "react-router-dom";

function CardPizza({ id, name, price, ingredients, img, onAdd }) {
  return (
    <article className="pizza-card">
      <img className="pizza-card__image" src={img} alt={`Pizza ${name}`} />

      <div className="pizza-card__body">
        <h2>Pizza {name}</h2>
        <div className="pizza-card__ingredients">
          <p>Ingredientes</p>
          <ul>
            {ingredients.map((ingredient) => (
              <li key={ingredient}>🍕 {ingredient}</li>
            ))}
          </ul>
        </div>
        <p className="pizza-card__price">
          Precio: <strong>${price.toLocaleString("es-CL")}</strong>
        </p>

        {/* Las acciones globales del catálogo se incorporan en hitos posteriores. */}
        <div className="pizza-card__actions">
          <Link className="button button--secondary" to={`/pizza/${id}`}>
            Ver más 👀
          </Link>
          <button className="button button--primary" type="button" onClick={onAdd}>
            Añadir 🛒
          </button>
        </div>
      </div>
    </article>
  );
}

export default CardPizza;
