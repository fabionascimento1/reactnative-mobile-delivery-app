export function addToCart(menu) {
  return {
    type: "@cart/ADD",
    menu,
  };
}

export function removeFromCart(id) {
  return {
    type: "@cart/REMOVE",
    id,
  };
}

export function updateAmount(id, amount) {
  return {
    type: "@cart/UPDATE_AMOUNT",
    id,
    amount,
  };
}
