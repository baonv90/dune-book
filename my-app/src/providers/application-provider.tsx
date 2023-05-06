import React, { Node } from "react";
import { useAppearance } from "./appearance-provider.tsx";
import ThemeProvider, { themes } from "./theme-providers.tsx";

const LIGHT_MODE = "light";

type Props = {
  children: Node;
};

function ApplicationProvider({ children }: Props) {
  const { appearance } = useAppearance();
  const theme = appearance === LIGHT_MODE ? themes.light : themes.dark;

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default ApplicationProvider;
