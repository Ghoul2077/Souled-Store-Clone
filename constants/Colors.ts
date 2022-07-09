const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

const common = {
  primary: "#0080FF",
  secondary: "#CC3D5E",
  secondaryDark: "#ED872A",
  error: "#FF697C",
  success: "#53B87F",
  grey: "#8D92A3",
  white: "#FFFFFF",
  black: "#000000",
};

export default {
  light: {
    ...common,
    text: "#22242A",
    background: "#F2F2F2",
    light: "#F7F8FA",
    medium: "#CDCDD7",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
    inverse: "#000000",
  },
  dark: {
    ...common,
    text: "#fff",
    background: "#F2F2F2",
    light: "#3b3a3a",
    medium: "#1A1E1E",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
    inverse: "#ffffff",
  },
};

export interface ColorTypes {
  text: string;
  background: string;
  light: string;
  medium: string;
  tint: string;
  tabIconDefault: string;
  tabIconSelected: string;
  inverse: string;
  primary: string;
  secondary: string;
  secondaryDark: string;
  error: string;
  success: string;
  grey: string;
  white: string;
  black: string;
}

export interface ThemeType {
  light: ColorTypes;
  dark: ColorTypes;
}
