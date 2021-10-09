import { createGlobalStyle } from "styled-components";
import { themeColor } from "styles/helpers";
import gilroyTtf from "../assets/fonts/Gilroy-Regular.ttf";
import gilroyWoff from "../assets/fonts/Gilroy-Regular.woff";
import gilroyWoff2 from "../assets/fonts/Gilroy-Regular.woff2";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Gilroy';
    src: local('Gilroy Regular'), local('Gilroy-Regular'),
    url(${gilroyWoff2}) format('woff2'),
    url(${gilroyWoff}) format('woff'),
    url(${gilroyTtf}) format('truetype');
    font-weight: 400;
    font-style: normal;
  }

  html {
    height: 100%;
    overflow: hidden;
  }

  body {
    height: 100%;
    margin: 0;
    color: ${themeColor("onBackground")};
    background: ${themeColor("background")};
    overflow: hidden;
  }

  * {
    font-family: ${(props) => props.theme.font};
  }

  #root {
    height: 100%;
  }
`;
