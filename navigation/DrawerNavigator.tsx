import React from "react";
import { Image, StyleSheet, View } from "react-native";
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CompositeNavigationProp } from "@react-navigation/native";
import AppButton from "../components/AppButton";
import AppDrawer from "../components/AppDrawer";
import useThemeColors from "../hooks/useThemeColors";
import { DrawerParamsList, MainStackParamsList } from "./types";
import routes from "./routes";

// This is the main stack where you would wrap up all other stack and server to
// your app

const DrawerNavigator = createDrawerNavigator<DrawerParamsList>();

const Logo = () => {
  return (
    <View style={styles.logoContainer}>
      <Image
        style={styles.image}
        source={require("../assets/images/logo.png")}
        resizeMode="contain"
        resizeMethod="resize"
        progressiveRenderingEnabled
      />
    </View>
  );
};

const HeaderButton = ({
  navigation,
}: {
  navigation: CompositeNavigationProp<
    NativeStackNavigationProp<MainStackParamsList>,
    DrawerNavigationProp<DrawerParamsList>
  >;
}) => {
  return (
    <View style={styles.headerButtonContainer}>
      <AppButton
        style={styles.btn}
        iconColor="black"
        leftIconName="ios-search-outline"
        iconSize={28}
        onPress={() => navigation.navigate(routes.SEARCH_SCREEN)}
      />
      <AppButton
        style={styles.btn}
        iconColor="black"
        leftIconName="ios-heart-outline"
        iconSize={28}
        onPress={() => navigation.navigate(routes.CART_SCREEN)}
      />
      <AppButton
        style={styles.btn}
        iconColor="black"
        leftIconName="ios-cart-outline"
        iconSize={28}
        onPress={() => navigation.navigate(routes.FAVOURITES_SCREEN)}
      />
    </View>
  );
};

export default function DrawerStack() {
  const colors = useThemeColors();

  return (
    <DrawerNavigator.Navigator
      drawerContent={(props) => <AppDrawer {...props} />}
      screenOptions={{
        headerTitleContainerStyle: styles.headerTitleContainer,
        headerStyle: styles.header,
        drawerStyle: [styles.drawer, { backgroundColor: colors.background }],
      }}
    >
      <DrawerNavigator.Screen
        options={({ navigation }) => ({
          headerTitle: () => <Logo />,
          headerLeft: () => (
            <AppButton
              leftIconName="ios-menu-outline"
              iconSize={32}
              style={styles.btn}
              iconColor="black"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
          headerRight: () => <HeaderButton navigation={navigation} />,
        })}
        name={routes.HOME_SCREEN}
        component={HomeScreen}
      />
    </DrawerNavigator.Navigator>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: "100%",
  },
  header: {
    height: 105,
  },
  headerTitleContainer: {
    width: "100%",
  },
  drawer: {
    width: "100%",
  },
  headerButtonContainer: {
    flexDirection: "row",
    paddingRight: 7,
  },
  btn: { backgroundColor: "transparent", paddingRight: 3 },
});
