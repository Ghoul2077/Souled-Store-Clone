import React from "react";
import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainStackParamsList } from "./types";
import DrawerStack from "./DrawerNavigator";
import CollectionScreen from "../screens/CollectionScreen";
import ProductScreen from "../screens/ProductScreen";
import SearchScreen from "../screens/SearchScreen";
import routes from "./routes";
import LoginScreen from "../screens/LoginScreen";

// This is the main stack where you would wrap up all other stack and serve to
// your app

enableScreens();

const MainStackNavigator = createNativeStackNavigator<MainStackParamsList>();

export default function Navigator() {
  const navigationRef = createNavigationContainerRef();

  return (
    <NavigationContainer ref={navigationRef}>
      <MainStackNavigator.Navigator screenOptions={{ headerShown: false }}>
        <MainStackNavigator.Screen name="Drawer" component={DrawerStack} />
        <MainStackNavigator.Screen
          name={routes.COLLECTION_SCREEN}
          component={CollectionScreen}
        />
        <MainStackNavigator.Screen
          name={routes.PRODUCT_SCREEN}
          component={ProductScreen}
        />
        <MainStackNavigator.Screen
          options={{ headerShown: true }}
          name={routes.SEARCH_SCREEN}
          component={SearchScreen}
        />
        <MainStackNavigator.Screen
          name={routes.FAVOURITES_SCREEN}
          component={SearchScreen}
        />
        <MainStackNavigator.Screen
          name={routes.CART_SCREEN}
          component={SearchScreen}
        />
        <MainStackNavigator.Screen
          name={routes.LOGIN_SCREEN}
          component={LoginScreen}
        />
      </MainStackNavigator.Navigator>
    </NavigationContainer>
  );
}
