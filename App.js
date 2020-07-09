import "react-native-gesture-handler";
import React from "react";
import AppNavigator from "./src/navigator/AppNavigator";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "./src/config/ReactotronConfig";

import { store, persistor } from "./src/store";

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <AppNavigator />
    </PersistGate>
  </Provider>
);

export default App;
