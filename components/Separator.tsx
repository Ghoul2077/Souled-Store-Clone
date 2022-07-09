import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import useThemeColors from "../hooks/useThemeColors";

const Separator: FC = () => {
  const colors = useThemeColors();

  return (
    <View style={[styles.separator, { backgroundColor: colors.inverse }]} />
  );
};

export default Separator;

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    height: 1,
    marginVertical: 5,
  },
});
