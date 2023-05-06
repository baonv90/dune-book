import React, { ReactNode } from "react";
import { ThemeProvider as BaseThemeProvider } from "styled-components";

export interface PaletteColor {
  10: string;
  20: string;
  30: string;
  40: string;
  50: string;
  60: string;
  70: string;
  80: string;
  90: string;
  100: string;
}

export interface Palette {
  white: string;
  black: string;
  tertiary: PaletteColor;
  grey: PaletteColor;
  pink: PaletteColor;
  purple: PaletteColor;
  blue: PaletteColor;
  green: PaletteColor;
  orange: PaletteColor;
  red: PaletteColor;
}

const palette: Palette = {
  white: "#FFFFFF",
  black: "#000000",
  tertiary: {
    10: "#BDCFF0",
    20: "#A7BCDC",
    30: "#91A9C7",
    40: "#7E98B3",
    50: "#6D879F",
    60: "#5D768B",
    70: "#4E6577",
    80: "#405463",
    90: "#33434F",
    100: "#26323B",
  },
  grey: {
    10: "#FAFAFA",
    20: "#EEEEEE",
    30: "#E0E0E0",
    40: "#D0D0D0",
    50: "#B8B8B8",
    60: "#909090",
    70: "#686868",
    80: "#505050",
    90: "#303030",
    100: "#161616",
  },
  pink: {
    10: "#FFD9E7",
    20: "#FAA2C2",
    30: "#F075A0",
    40: "#EB5E8E",
    50: "#E2467C",
    60: "#D1366A",
    70: "#B81C50",
    80: "#91133D",
    90: "#6B0A2B",
    100: "#47061C",
  },
  purple: {
    10: "#E3DEFF",
    20: "#C6BAFB",
    30: "#A491F6",
    40: "#9279ED",
    50: "#8060E0",
    60: "#7046CF",
    70: "#6035A8",
    80: "#4D2480",
    90: "#3D185E",
    100: "#2E0C45",
  },
  blue: {
    10: "#B8F3FF",
    20: "#84E0F5",
    30: "#3CC8F0",
    40: "#26ADE4",
    50: "#2190CF",
    60: "#1E71BD",
    70: "#1B55A6",
    80: "#153A85",
    90: "#112869",
    100: "#010E42",
  },
  green: {
    10: "#CFF0A6",
    20: "#A8D96E",
    30: "#8AC24A",
    40: "#6FAC2E",
    50: "#57951B",
    60: "#417E0F",
    70: "#2F6807",
    80: "#1F5103",
    90: "#123A01",
    100: "#092400",
  },
  orange: {
    10: "#FFECA6",
    20: "#FBD467",
    30: "#F3B01C",
    40: "#E99B0C",
    50: "#D98601",
    60: "#C47400",
    70: "#A86100",
    80: "#874C00",
    90: "#653800",
    100: "#4D2A00",
  },
  red: {
    10: "#FFD0C4",
    20: "#F78F72",
    30: "#F25F33",
    40: "#EB4C17",
    50: "#D6420D",
    60: "#C93C08",
    70: "#B83504",
    80: "#992C02",
    90: "#7A2301",
    100: "#661D00",
  },
};

export interface IFonts {
  main: string;
}

export interface IColors {
  actionPrimary: string;
  title: string;
  text: string;
  textLight: string;
  white: string;
  disabled: string;
  background: string;
  success: string;
  error: string;
  warn: string;
  overlay: string;
}

export interface Radius {
  min: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
  max: string;
}

const defaultRadius: Radius = {
  min: "0px",
  sm: "4px",
  md: "8px",
  lg: "16px",
  xl: "32px",
  xxl: "64px",
  max: "50%",
};

export interface IBreakpoints {
  xs: number;
  sm: number;
  md: number;
  lg: number;
}

export type TMode = "light" | "dark";

export interface ITheme {
  colors: IColors;
  radius: Radius;
  shadow: IShadow;
  mode: TMode;
  palette: Palette;
}

export type Theme = ITheme;

export const baseTheme: ITheme = {
  colors: {
    actionsPrimary: "#00cc88",
    white: "#ffffff",
    title: "#505050",
    text: "#262f3d",
    disabled: "#eeeeee",
    background: "#ffffff",
    success: "#417e0f",
    error: "#c93c08",
    warn: "#c93c08",
    overlay: "#262f3d",
  },
  radius: defaultRadius,
  mode: "light",
  palette,
};

const lightTheme: ITheme = baseTheme;

const darkTheme: ITheme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    white: "#303030",
    title: "#e0e0e0",
    text: "#e0e0e0",
    disabled: "#505050",
    background: "#232323",
    success: "#6fac2e",
    error: "#eb4c17",
    overlay: "#505050",
  },
  mode: "dark",
};

export interface IThemes {
  light: ITheme;
  dark: ITheme;
}

export const themes: IThemes = {
  light: lightTheme,
  dark: darkTheme,
};

export interface IProps {
  children: ReactNode;
  theme?: ITheme;
}

function ThemeProvider({ children, theme = themes.light }: IProps) {
  return <BaseThemeProvider theme={theme}>{children}</BaseThemeProvider>;
}

export default ThemeProvider;
