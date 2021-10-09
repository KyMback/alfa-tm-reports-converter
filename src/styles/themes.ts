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
  "overlay",
] as const;

export type ColorType = typeof colorTypes[number];

export interface Theme {
  font: string;
  colors: Record<ColorType, string>;
}

export const devicesMaxSizes = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
  desktop: 2560,
} as const;

export const devicesMinSizes = {
  mobileS: 0,
  mobileM: 321,
  mobileL: 376,
  tablet: 426,
  laptop: 769,
  laptopL: 1025,
  desktop: 2561,
} as const;

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
    overlay: "rgba(0, 0, 0, 0.7)",
  },
};
