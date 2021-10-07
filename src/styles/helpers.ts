import { ColorType, devicesMaxSizes, devicesMinSizes } from "./themes";
import { DefaultTheme } from "styled-components";

type WithTheme = { theme: DefaultTheme };

export const themeColor = <TProps extends WithTheme>(color: ColorType) => {
  return (props: TProps) => props.theme.colors[color];
};

export const lessOrEqualTo = Object.entries(devicesMaxSizes).reduce(
  (acc, item) => Object.assign(acc, { [item[0]]: `max-width: ${item[1]}px` }),
  <Record<keyof typeof devicesMaxSizes, string>>{},
);

export const moreOrEqualTo = Object.entries(devicesMinSizes).reduce(
  (acc, item) => Object.assign(acc, { [item[0]]: `min-width: ${item[1]}px` }),
  <Record<keyof typeof devicesMinSizes, string>>{},
);
