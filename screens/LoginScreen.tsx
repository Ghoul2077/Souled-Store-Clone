import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import { MainStackParamsList } from "../navigation/types";

export interface LoginScreenProps {
  navigation: NativeStackNavigationProp<MainStackParamsList>;
}

const LoginScreen: FC<LoginScreenProps> = ({ navigation }) => {
  return (
    <Screen>
      <AppText>Login Screen</AppText>
    </Screen>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
