import { CartContext } from "../context/Cart";
import { useContext, useState } from "react";

export const useCart = () => {
  const context = useContext(CartContext);

  if (context == undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
