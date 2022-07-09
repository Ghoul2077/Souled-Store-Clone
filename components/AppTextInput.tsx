import React, { forwardRef, ReactNode } from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import useThemeColors from "../hooks/useThemeColors";

export interface AppTextInputProps extends TextInputProps {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onPressIcon?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  fontStyle?: StyleProp<TextStyle>;
}

const AppTextInput = forwardRef<TextInput, AppTextInputProps>(
  (
    {
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      onPressIcon,
      style,
      fontStyle,
      ...others
    },
    ref
  ) => {
    const colors = useThemeColors();

    return (
      <View
        style={[styles.container, { backgroundColor: colors.light }, style]}
      >
        {LeftIcon}
        <TextInput
          ref={ref}
          style={[styles.input, { color: colors.text }, fontStyle]}
          {...others}
        />
        <Pressable onPress={onPressIcon}>{RightIcon}</Pressable>
      </View>
    );
  }
);

export default AppTextInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    padding: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    marginLeft: 10,
  },
});
