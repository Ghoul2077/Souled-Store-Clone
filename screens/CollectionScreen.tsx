import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import { MainStackParamsList } from "../navigation/types";

export interface CollectionScreenProps {
  navigation: NativeStackNavigationProp<MainStackParamsList>;
}

const CollectionScreen: FC<CollectionScreenProps> = ({ navigation }) => {
  return (
    <Screen>
      <AppText>Collection Screen</AppText>
    </Screen>
  );
};

export default CollectionScreen;

const styles = StyleSheet.create({});
