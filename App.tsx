import React, { useEffect } from "react";
import { LogBox } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import * as SplashScreen from "expo-splash-screen";
import useCachedResources from "./hooks/useCachedResources";
import createStore from "./store/configureStore";
import Navigator from "./navigation/MainNavigator";

const { store, persistor } = createStore();

const ignoreWarnings = [
  "ViewPropTypes will be removed from React Native.",
  "Setting a timer for a long period of time",
];

const warn = console.warn;
console.warn = (...arg) => {
  for (const warning of ignoreWarnings) {
    if (arg[0].startsWith(warning)) {
      return;
    }
  }
  warn(...arg);
};

export default function App() {
  const cacheLoadStatus = useCachedResources();

  useEffect(() => {
    LogBox.ignoreLogs([...ignoreWarnings, /AsyncStorage/gi]);
  }, []);

  useEffect(() => {
    (async function splashScreenController() {
      if (!cacheLoadStatus) {
        await SplashScreen.preventAutoHideAsync();
      } else {
        await SplashScreen.hideAsync();
      }
    })();
  }, [cacheLoadStatus]);

  if (!cacheLoadStatus) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigator />
      </PersistGate>
    </Provider>
  );
}
