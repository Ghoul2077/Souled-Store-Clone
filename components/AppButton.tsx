import React, { forwardRef, ReactNode } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import AppText from "./AppText";
import useThemeColors from "../hooks/useThemeColors";

export interface AppButtonProps extends Omit<TouchableOpacityProps, "onPress"> {
  title?: string;
  textStyle?: StyleProp<TextStyle>;
  leftIconName?: keyof typeof Ionicons.glyphMap;
  leftIcon?: ReactNode;
  leftIconSize?: number;
  rightIconName?: keyof typeof Ionicons.glyphMap;
  rightIcon?: ReactNode;
  rightIconSize?: number;
  iconSize?: number;
  iconColor?: string;
  style?: StyleProp<ViewStyle>;
  ripple?: boolean;
  onPress?: Function;
  vibrationIntensity?: "Light" | "Medium" | "Heavy";
  numberOfLines?: number;
  gap?: number;
}

const AppButton = forwardRef<TouchableOpacity, AppButtonProps>(
  (
    {
      title,
      textStyle,
      leftIconName,
      leftIcon: LeftIcon,
      leftIconSize,
      rightIconName,
      rightIcon: RightIcon,
      rightIconSize,
      iconSize = 30,
      iconColor = "white",
      style,
      ripple,
      onPress,
      numberOfLines,
      vibrationIntensity,
      gap,
      ...others
    },
    ref
  ) => {
    const colors = useThemeColors();
    const ParentComponent: typeof Pressable | typeof TouchableOpacity = ripple
      ? Pressable
      : TouchableOpacity;

    return (
      <ParentComponent
        ref={ref}
        android_ripple={{ color: colors.grey }}
        style={[styles.container, { backgroundColor: colors.primary }, style]}
        onPress={async () => {
          if (vibrationIntensity)
            await Haptics.impactAsync(
              Haptics.ImpactFeedbackStyle[vibrationIntensity]
            );
          if (onPress) onPress();
        }}
        {...others}
      >
        {leftIconName && (
          <Ionicons
            name={leftIconName}
            size={leftIconSize || iconSize}
            color={iconColor}
          />
        )}
        {!leftIconName && <>{LeftIcon}</>}
        {title && (
          <AppText
            style={[
              styles.text,
              (leftIconName || rightIconName) && styles.textWithIcon,
              leftIconName && { marginLeft: gap || 5 },
              rightIconName && { marginRight: gap || 5 },
              textStyle,
            ]}
            numberOfLines={numberOfLines}
          >
            {title}
          </AppText>
        )}

        {rightIconName && (
          <Ionicons
            style={styles.rightBtn}
            name={rightIconName}
            size={rightIconSize || iconSize}
            color={iconColor}
          />
        )}
        {!rightIconName && <>{RightIcon}</>}
      </ParentComponent>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  text: {
    color: "white",
    fontSize: 15,
  },
  textWithIcon: {
    textAlign: "center",
    flexShrink: 0,
    flexGrow: 1,
  },
  rightBtn: { marginLeft: 10 },
});

export default AppButton;
