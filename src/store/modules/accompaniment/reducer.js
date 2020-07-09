import produce from "immer";

export default function accompaniment(state = [], action) {
  switch (action.type) {
    case "@cart/ADD_ACC":
      return produce(state, (draft) => {
        draft.push({
          ...action.accompaniment,
          menu: action.idMenu,
          amount: draft.length + 1,
        });
      });

    case "@cart/REMOVE_ACC":
      return produce(state, (draft) => {
        for (var i = 0; i < draft.length; i++) {
          if (draft[i].menu == action.menu && draft[i]._id === action.id) {
            draft.splice(i, 1);
          }
        }
      });

    case "@cart/UPDATE_ACC_PRICE": {
      if (action.amount <= 0) {
        return state;
      }
      return produce(state, (draft) => {
        const menuIndex = draft.findIndex((m) => m._id === action.id);

        if (menuIndex >= 0) {
          draft[menuIndex].amount = Number(action.amount);
        }
      });
    }

    default:
      return state;
  }
}
