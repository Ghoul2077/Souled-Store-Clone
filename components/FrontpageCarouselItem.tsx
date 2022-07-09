import React, { FC } from "react";
import { Dimensions, Image, Pressable, StyleSheet } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import useThemeColors from "../hooks/useThemeColors";
import routes from "../navigation/routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DrawerParamsList, MainStackParamsList } from "../navigation/types";

const { width } = Dimensions.get("window");

export interface FrontpageCarouselProp {
  data: string;
  tags: {
    [key: string]: Array<string>;
  };
}

const FrontpageCarouselItem: FC<FrontpageCarouselProp> = ({
  data: imageURI,
  tags,
}) => {
  const colors = useThemeColors();

  const navigation =
    useNavigation<
      CompositeNavigationProp<
        NativeStackNavigationProp<MainStackParamsList>,
        DrawerNavigationProp<DrawerParamsList>
      >
    >();

  return (
    <Pressable onPress={() => navigation.navigate(routes.COLLECTION_SCREEN)}>
      <Image
        style={styles.caouselImage}
        source={{ uri: imageURI }}
        resizeMode="cover"
      />
    </Pressable>
  );
};

export default FrontpageCarouselItem;

const styles = StyleSheet.create({
  caouselImage: {
    width: width,
    height: 450,
  },
});
