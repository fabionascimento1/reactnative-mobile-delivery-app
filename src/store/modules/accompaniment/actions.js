export function addAccompaniment(accompaniment, idMenu) {
  return {
    type: "@cart/ADD_ACC",
    accompaniment,
    idMenu,
  };
}

export function removeAccompaniment(id, menu) {
  return {
    type: "@cart/REMOVE_ACC",
    id,
    menu,
  };
}
