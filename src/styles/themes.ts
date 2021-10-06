const colorTypes = [
  "primary",
  "onPrimary",
  "secondary",
  "onSecondary",
  "background",
  "onBackground",
  "surface",
  "onSurface",
  "shadow",
] as const;

export type ColorType = typeof colorTypes[number];

export interface Theme {
  font: string;
  colors: Record<ColorType, string>;
}

export const defaultTheme: Theme = {
  font: "Gilroy",
  colors: {
    primary: "#2A6F97",
    onPrimary: "#FFFFFF",
    secondary: "#A9D6E5",
    onSecondary: "#434343",
    background: "#FFFFFF",
    onBackground: "#434343",
    surface: "#FFFFFF",
    onSurface: "#434343",
    shadow: "rgba(0, 0, 0, 0.25)",
  },
};
