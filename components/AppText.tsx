import React, { FC } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
} from "react-native";
import useThemeColors from "../hooks/useThemeColors";

export interface AppTextProps extends TextProps {
  style?: StyleProp<TextStyle>;
}

const AppText: FC<AppTextProps> = ({ children, style, ...others }) => {
  const colors = useThemeColors();

  return (
    <Text
      style={[
        styles.text,
        {
          color: colors.text,
        },
        style,
      ]}
      {...others}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: { fontFamily: "Montserrat" },
});

export default AppText;
