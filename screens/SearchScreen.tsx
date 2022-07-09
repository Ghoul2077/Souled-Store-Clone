import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import { MainStackParamsList } from "../navigation/types";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import useThemeColors from "../hooks/useThemeColors";

const { width } = Dimensions.get("window");

export interface SearchScreenProps {
  navigation: NativeStackNavigationProp<MainStackParamsList>;
}

const SearchScreen: FC<SearchScreenProps> = ({ navigation }) => {
  const colors = useThemeColors();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <AppTextInput
          placeholder="Search for products"
          leftIcon={
            <AppButton
              leftIconName="ios-arrow-back-outline"
              iconSize={24}
              iconColor={colors.black}
              style={styles.btn}
              onPress={() => navigation.pop()}
            />
          }
          style={[styles.input, { backgroundColor: colors.white }]}
        />
      ),
      headerBackVisible: false,
    });
  }, [navigation, colors]);

  return (
    <Screen headerShown>
      <ScrollView
        nestedScrollEnabled
        contentContainerStyle={[
          styles.container,
          { backgroundColor: colors.background },
        ]}
        showsVerticalScrollIndicator={false}
      ></ScrollView>
    </Screen>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  input: {
    borderRadius: 0,
    padding: 15,
    left: -15,
    top: 0,
  },
  container: { flexGrow: 1 },
  btn: {
    padding: 0,
    backgroundColor: "transparent",
    paddingRight: 5,
  },
});
