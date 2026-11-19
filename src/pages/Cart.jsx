import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { useState } from "react";
import { fetchJson } from "../services/api";

function Cart() {
  const { cart, increasePizza, decreasePizza, total } = useCart();
  const { token } = useUser();
  const [message, setMessage] = useState({ type: "", text: "" });
  const [submitting, setSubmitting] = useState(false);

  const checkout = async () => {
    try {
      setSubmitting(true);
      setMessage({ type: "", text: "" });
      await fetchJson("/api/checkouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cart: cart.map(({ id, name, price, count }) => ({ id, name, price, count })),
        }),
      });
      setMessage({ type: "success", text: "¡Compra realizada con éxito!" });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="cart-page" aria-labelledby="cart-title">
      <div className="section-heading section-heading--left"><span>Tu pedido</span><h1 id="cart-title">Carrito de compras</h1><p>Aumenta o disminuye las cantidades antes de pagar.</p></div>
      {cart.length === 0 ? <p className="empty-state">Tu carrito está vacío.</p> : (
        <div className="cart-list">{cart.map((pizza) => (
          <article className="cart-item" key={pizza.id}>
            <img src={pizza.img} alt={`Pizza ${pizza.name}`} />
            <div className="cart-item__info"><h2>Pizza {pizza.name}</h2><p>${pizza.price.toLocaleString("es-CL")} c/u</p></div>
            <div className="quantity-control" aria-label={`Cantidad de ${pizza.name}`}>
              <button type="button" aria-label={`Disminuir ${pizza.name}`} onClick={() => decreasePizza(pizza.id)}>−</button>
              <strong>{pizza.count}</strong>
              <button type="button" aria-label={`Aumentar ${pizza.name}`} onClick={() => increasePizza(pizza.id)}>+</button>
            </div>
            <strong className="cart-item__subtotal">${(pizza.price * pizza.count).toLocaleString("es-CL")}</strong>
          </article>
        ))}</div>
      )}
      <div className="cart-summary"><p>Total: <strong>${total.toLocaleString("es-CL")}</strong></p><button className="button button--primary" type="button" disabled={!cart.length || !token || submitting} onClick={checkout}>{submitting ? "Procesando..." : "Pagar"}</button></div>
      {message.text && <p className={`form-message form-message--${message.type} cart-message`} role={message.type === "error" ? "alert" : "status"}>{message.text}</p>}
    </section>
  );
}

export default Cart;
