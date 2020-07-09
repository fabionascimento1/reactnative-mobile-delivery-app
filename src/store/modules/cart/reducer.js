import produce from "immer";

export default function cart(state = [], action) {
  switch (action.type) {
    case "@cart/ADD":
      return produce(state, (draft) => {
        const menuIndex = draft.findIndex((m) => m._id === action.menu._id);

        if (menuIndex >= 0) {
          draft[menuIndex].amount += 1;
        } else {
          draft.push({
            ...action.menu,
            amount: 1,
          });
        }
      });

    case "@cart/REMOVE":
      return produce(state, (draft) => {
        const menuIndex = draft.findIndex((m) => m._id === action.id);

        if (menuIndex >= 0) {
          draft.splice(menuIndex, 1);
        }
      });

    case "@cart/UPDATE_AMOUNT": {
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
