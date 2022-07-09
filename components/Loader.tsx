/* eslint-disable react-native/no-inline-styles */
import React, { FC, useRef } from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import LottieView from "lottie-react-native";
import AppText from "./AppText";

export interface LoaderProps {
  isLoading?: boolean;
  text?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Loader: FC<LoaderProps> = ({
  isLoading = true,
  text,
  style,
  textStyle,
}) => {
  const animation = useRef(null);

  return isLoading ? (
    <View style={[styles.container, style]}>
      <LottieView
        ref={animation}
        style={[styles.loader, !!text && { marginBottom: 20 }]}
        source={require("../assets/lotties/loader.json")}
        speed={2}
        autoPlay
        loop
      />
      {text && <AppText style={textStyle}>{text}</AppText>}
    </View>
  ) : null;
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loader: {
    width: 100,
    height: 100,
    backgroundColor: "transparent",
    alignSelf: "center",
  },
});
