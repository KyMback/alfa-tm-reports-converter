import { createGlobalStyle } from "styled-components";
import { themeColor } from "styles/utils";

export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    height: 100%;
    margin: 0;
    font-family: ${(props) => props.theme.font};
    color: ${themeColor("onBackground")};
    background: ${themeColor("background")};
    overflow: hidden;
  }
  
  #root {
    height: 100%;
  }
`;
