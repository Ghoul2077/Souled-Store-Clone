import React, { FC } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Image,
  StyleProp,
  ViewStyle,
  Dimensions,
  ImageSourcePropType,
} from "react-native";
import useThemeColors from "../hooks/useThemeColors";
import { useAppSelector } from "../store/hook";
import AppText from "./AppText";

const { width } = Dimensions.get("window");

export interface ProductAndCategoryCardProps {
  source: ImageSourcePropType;
  onPress?: Function;
  title?: string;
  style?: StyleProp<ViewStyle>;
}

const ProductAndCategoryCard: FC<ProductAndCategoryCardProps> = ({
  source,
  title,
  onPress,
  style,
}) => {
  const colors = useThemeColors();
  const theme = useAppSelector((state) => state.theme);

  return (
    <Pressable
      style={[styles.container, { backgroundColor: colors.white }, style]}
      onPress={() => {
        if (onPress) onPress();
      }}
    >
      <View style={styles.cover}>
        <Image
          style={styles.image}
          source={source}
          resizeMode="cover"
          resizeMethod="resize"
        />
        <AppText style={[styles.text, { color: colors.white }]}>
          {title}
        </AppText>
      </View>
    </Pressable>
  );
};

export default ProductAndCategoryCard;

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: width * 0.45,
    overflow: "hidden",
    borderRadius: 4,
    marginBottom: 10,
  },
  cover: {
    width: "100%",
    height: "100%",
    marginBottom: 6,
    overflow: "hidden",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 12,
    position: "absolute",
    textTransform: "uppercase",
    bottom: 5,
  },
});
