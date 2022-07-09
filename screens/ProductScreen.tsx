import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import { MainStackParamsList } from "../navigation/types";

export interface ProductScreenProps {
  navigation: NativeStackNavigationProp<MainStackParamsList>;
}

const ProductScreen: FC<ProductScreenProps> = ({ navigation }) => {
  return (
    <Screen>
      <AppText>Product Screen</AppText>
    </Screen>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({});
