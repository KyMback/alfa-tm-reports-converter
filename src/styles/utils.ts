import { ColorType } from "./themes";
import { DefaultTheme } from "styled-components";

type WithTheme = { theme: DefaultTheme };

export const themeColor = <TProps extends WithTheme>(color: ColorType) => {
  return (props: TProps) => props.theme.colors[color];
};
