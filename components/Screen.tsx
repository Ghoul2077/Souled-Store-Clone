import React, { FC } from "react";
import { StyleSheet, Image, StyleProp, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";

export interface ScreenProps {
  headerShown?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Screen: FC<ScreenProps> = ({ headerShown = false, children, style }) => {
  return (
    <SafeAreaView
      style={[styles.screen, headerShown && styles.screenPadding, style]}
    >
      {children}
    </SafeAreaView>
  );
};

export default Screen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "110%",
    opacity: 0.1,
    bottom: 0,
  },
  screenPadding: {
    paddingTop: -(Constants.statusBarHeight + 2.5),
  },
});
