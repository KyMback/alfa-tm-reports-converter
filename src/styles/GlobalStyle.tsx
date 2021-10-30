import { createGlobalStyle } from "styled-components";
import { themeColor } from "styles/helpers";
import gilroyRegularTtf from "assets/fonts/Gilroy/Gilroy-Regular.ttf";
import gilroyRegularWoff from "assets/fonts/Gilroy/Gilroy-Regular.woff";
import gilroyRegularWoff2 from "assets/fonts/Gilroy/Gilroy-Regular.woff2";
import gilroyMediumTtf from "assets/fonts/Gilroy/Gilroy-Medium.ttf";
import gilroyMediumWoff from "assets/fonts/Gilroy/Gilroy-Medium.woff";
import gilroyMediumWoff2 from "assets/fonts/Gilroy/Gilroy-Medium.woff2";
import gilroyBoldTtf from "assets/fonts/Gilroy/Gilroy-Bold.ttf";
import gilroyBoldWoff from "assets/fonts/Gilroy/Gilroy-Bold.woff";
import gilroyBoldWoff2 from "assets/fonts/Gilroy/Gilroy-Bold.woff2";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Gilroy';
    src: local('Gilroy Regular'), local('Gilroy-Regular'),
    url(${gilroyRegularWoff2}) format('woff2'),
    url(${gilroyRegularWoff}) format('woff'),
    url(${gilroyRegularTtf}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Gilroy';
    src: local('Gilroy Medium'), local('Gilroy-Medium'),
    url(${gilroyMediumWoff2}) format('woff2'),
    url(${gilroyMediumWoff}) format('woff'),
    url(${gilroyMediumTtf}) format('truetype');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Gilroy';
    src: local('Gilroy Bold'), local('Gilroy-Bold'),
    url(${gilroyBoldWoff2}) format('woff2'),
    url(${gilroyBoldWoff}) format('woff'),
    url(${gilroyBoldTtf}) format('truetype');
    font-weight: bold;
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
    font-family: ${(props) => props.theme.font};
    font-weight: 500;
  }

  #root {
    height: 100%;
  }
`;
