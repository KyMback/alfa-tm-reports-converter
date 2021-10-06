import { createGlobalStyle } from "styled-components";
import { themeColor } from "styles/utils";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: ${(props) => props.theme.font};
    color: ${themeColor("onBackground")};
    background: ${themeColor("background")};
  }
`;
