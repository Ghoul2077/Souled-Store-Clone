import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import { MainStackParamsList } from "../navigation/types";

export interface FavouritesScreenProps {
  navigation: NativeStackNavigationProp<MainStackParamsList>;
}

const FavouritesScreen: FC<FavouritesScreenProps> = ({ navigation }) => {
  return (
    <Screen>
      <AppText>Favourites Screen</AppText>
    </Screen>
  );
};

export default FavouritesScreen;

const styles = StyleSheet.create({});
