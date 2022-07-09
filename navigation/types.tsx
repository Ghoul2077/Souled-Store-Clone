import { NavigatorScreenParams } from "@react-navigation/native";
import routes from "./routes";

export type DrawerParamsList = {
  [routes.HOME_SCREEN]: undefined;
};

export type MainStackParamsList = {
  Drawer: NavigatorScreenParams<DrawerParamsList>;
  [routes.COLLECTION_SCREEN]: undefined;
  [routes.PRODUCT_SCREEN]: undefined;
  [routes.SEARCH_SCREEN]: undefined;
  [routes.FAVOURITES_SCREEN]: undefined;
  [routes.CART_SCREEN]: undefined;
  [routes.LOGIN_SCREEN]: undefined;
};
