import React, { FC } from "react";
import {
  StyleSheet,
  Dimensions,
  Image,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { CompositeNavigationProp } from "@react-navigation/native";
import {
  collection,
  doc,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import {
  useCollection,
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { chunk } from "lodash";
import { DrawerParamsList, MainStackParamsList } from "../navigation/types";
import FrontpageCarouselItem from "../components/FrontpageCarouselItem";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import ProductAndCategoryCard from "../components/ProductAndCategoryCard";
import Carousel from "../components/Carousel";
import Loader from "../components/Loader";
import useThemeColors from "../hooks/useThemeColors";
import { useAppSelector } from "../store/hook";
import routes from "../navigation/routes";
import { firestore } from "../firebase/config";

const { width } = Dimensions.get("window");

export interface HomeScreenProps {
  navigation: CompositeNavigationProp<
    NativeStackNavigationProp<MainStackParamsList>,
    DrawerNavigationProp<DrawerParamsList>
  >;
}

const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const colors = useThemeColors();
  const theme = useAppSelector((state) => state.theme);

  const [carouselData, carouselLoading, carouselError] = useDocumentData(
    doc(firestore, "carousel", "frontpage")
  );
  const [categoriesData, categoriesLoading, categoriesError] = useCollection(
    collection(firestore, "categories")
  );
  const [newArrivalsData, newArrivalsLoading, newArrivalsError] =
    useCollectionData(collection(firestore, "new arrivals"));
  const [merchandiseData, merchandiseLoading, merchandiseError] =
    useCollectionData(collection(firestore, "brands"));

  return (
    <Screen headerShown>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.wrapper}
      >
        {!carouselLoading && !carouselError && (
          <Carousel
            autoScroll
            style={[styles.section, styles.carousel]}
            data={Object.keys(carouselData?.images)}
            carouselItem={({ data }) => (
              <FrontpageCarouselItem data={data} tags={carouselData?.images} />
            )}
          />
        )}
        {!categoriesLoading && !categoriesError && (
          <View style={[styles.section, { backgroundColor: colors.white }]}>
            <AppText style={styles.heading}>Categories</AppText>
            <Carousel
              showIndicators
              data={chunk(categoriesData?.docs || [], 4)}
              carouselItem={({ data: slicedData }) => (
                <View style={styles.categories}>
                  {slicedData?.map(
                    (
                      item: QueryDocumentSnapshot<DocumentData>,
                      index: number
                    ) => (
                      <ProductAndCategoryCard
                        style={{
                          marginLeft:
                            index % 2 === 0 ? width * 0.033 : width * 0.0165,
                          marginRight:
                            index % 2 !== 0 ? width * 0.033 : width * 0.0165,
                        }}
                        key={item.id}
                        source={{ uri: item.data().featured_image }}
                        onPress={() =>
                          navigation.navigate(routes.COLLECTION_SCREEN)
                        }
                      />
                    )
                  )}
                </View>
              )}
            />
          </View>
        )}
        {!newArrivalsLoading && !newArrivalsError && (
          <View style={[styles.section, { backgroundColor: colors.white }]}>
            <AppText style={styles.heading}>New Arrivals</AppText>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={newArrivalsData}
              keyExtractor={(_e, index) => String(index)}
              renderItem={({ item }) => (
                <ProductAndCategoryCard
                  onPress={() => navigation.navigate(routes.PRODUCT_SCREEN)}
                  source={{ uri: item.featured_image }}
                  style={styles.newArrivals}
                />
              )}
            />
          </View>
        )}
        {!merchandiseLoading && !merchandiseError && (
          <View style={[styles.section, { backgroundColor: colors.white }]}>
            <AppText style={styles.heading}>Official Merchandise</AppText>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={merchandiseData}
              keyExtractor={(_e, index) => String(index)}
              contentContainerStyle={{ marginLeft: width * 0.033 }}
              renderItem={({ item }) => (
                <ProductAndCategoryCard
                  onPress={() => navigation.navigate(routes.COLLECTION_SCREEN)}
                  source={{ uri: item.featured_image }}
                  style={styles.merchandise}
                />
              )}
            />
          </View>
        )}
        <Loader
          isLoading={carouselLoading || categoriesLoading || newArrivalsLoading}
        />
      </ScrollView>
      <StatusBar style={theme === "light" ? "dark" : "light"} />
    </Screen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
  },
  carousel: {
    paddingVertical: 0,
  },
  section: {
    paddingVertical: 10,
    marginBottom: 15,
  },
  heading: {
    fontFamily: "Montserrat-Bold",
    paddingHorizontal: 22,
    marginBottom: 10,
    fontSize: 16,
  },
  categories: {
    width,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  newArrivals: {
    marginLeft: 5,
    width: width * 0.75,
    height: 300,
  },
  merchandise: {
    marginLeft: 5,
    width: 150,
    height: 150,
  },
});
