import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import { MainStackParamsList } from "../navigation/types";

export interface CartScreenProps {
  navigation: NativeStackNavigationProp<MainStackParamsList>;
}

const CartScreen: FC<CartScreenProps> = ({ navigation }) => {
  return (
    <Screen>
      <AppText>Cart Screen</AppText>
    </Screen>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
