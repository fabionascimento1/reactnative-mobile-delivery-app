import { AsyncStorage } from "react-native";
import { persistReducer } from "redux-persist";

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: "deliverxxxy",
      storage: AsyncStorage,
      whitelist: ["auth", "user", "cart", "accompaniment"],
    },
    reducers
  );

  return persistedReducer;
};
