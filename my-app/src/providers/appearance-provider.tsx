import React, {
  type Node,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

type Appearance = "light" | "dark";

type AppearanceContextProps = {
  appearance: Appearance;
  setAppearance: (appearance: Appearance) => void;
};

const AppearanceContext = createContext<AppearanceContextProps>({
  appearance: "light",
  setAppearance: () => {},
});

type AppearanceProviderProps = {
  children: Node;
};

export function AppearanceProvider({ children }: AppearanceProviderProps) {
  const [appearance, setAppearance] = useState(
    localStorage.getItem("mode") || "light"
  );

  useEffect(() => {
    localStorage.setItem("mode", appearance);
  }, [appearance]);

  return (
    <AppearanceContext.Provider value={{ appearance, setAppearance }}>
      {children}
    </AppearanceContext.Provider>
  );
}

export function useAppearance() {
  return useContext(AppearanceContext);
}
