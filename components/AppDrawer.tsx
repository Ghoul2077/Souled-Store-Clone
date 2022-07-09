import React, { FC, useState } from "react";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Image, StyleSheet, View } from "react-native";
import AppText from "./AppText";
import AppButton from "./AppButton";
import { useAppSelector } from "../store/hook";
import useThemeColors from "../hooks/useThemeColors";
import routes from "../navigation/routes";

const AppDrawer: FC<DrawerContentComponentProps> = ({
  navigation,
  ...others
}) => {
  const colors = useThemeColors();
  const user = useAppSelector((state) => state.user);

  return (
    <DrawerContentScrollView
      contentContainerStyle={styles.container}
      {...others}
    >
      <View style={styles.header}>
        <Image
          style={styles.profileImage}
          source={require("../assets/images/logo.png")}
          resizeMode="cover"
          progressiveRenderingEnabled
        />
        <AppButton
          title="Login/Register"
          onPress={() => navigation.navigate(routes.LOGIN_SCREEN)}
          style={[styles.loginButton, { borderColor: colors.primary }]}
          textStyle={[styles.loginButtonText, { color: colors.primary }]}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default AppDrawer;

const styles = StyleSheet.create({
  container: { flexGrow: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  profileImage: { width: 70, height: 60 },
  loginButton: {
    backgroundColor: "transparent",
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 4,
    marginLeft: 45,
  },
  loginButtonText: {
    fontSize: 12,
    fontFamily: "Montserrat-SemiBold",
  },
});
