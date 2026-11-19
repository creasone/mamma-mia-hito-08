import { createContext, useContext, useMemo, useState } from "react";
import { pizzaCart } from "../data/pizzas";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(pizzaCart);

  const addPizza = (pizza) => {
    setCart((items) => {
      const existingPizza = items.find((item) => item.id === pizza.id);
      if (existingPizza) {
        return items.map((item) => item.id === pizza.id ? { ...item, count: item.count + 1 } : item);
      }
      return [...items, { ...pizza, count: 1 }];
    });
  };

  const increasePizza = (id) => setCart((items) => items.map((pizza) => pizza.id === id ? { ...pizza, count: pizza.count + 1 } : pizza));
  const decreasePizza = (id) => setCart((items) => items.map((pizza) => pizza.id === id ? { ...pizza, count: pizza.count - 1 } : pizza).filter((pizza) => pizza.count > 0));
  const total = cart.reduce((sum, pizza) => sum + pizza.price * pizza.count, 0);

  const value = useMemo(() => ({ cart, addPizza, increasePizza, decreasePizza, total }), [cart, total]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
}
