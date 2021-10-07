import styled from "styled-components";
import { lessOrEqualTo, themeColor } from "styles/helpers";

interface HeaderWrapperProps {
  onlyTitle: boolean;
}

export const HeaderWrapper = styled.header<HeaderWrapperProps>`
  display: flex;
  align-items: center;
  z-index: 1000;
  box-shadow: 0 10px 30px ${themeColor("shadow")};
  padding: 16px 160px 16px 160px;
  justify-content: ${(props) => (props.onlyTitle ? "center" : "space-between")};

  @media (${lessOrEqualTo.tablet}) {
    padding: 18px 0;
    justify-content: center;
  }
`;

export const HeaderTitleLink = styled.a`
  text-decoration: none;
`;

export const HeaderTitle = styled.h1`
  color: ${themeColor("primary")};
  margin: 0;
  font-weight: bold;
  font-size: 30px;
  line-height: 36px;

  @media (${lessOrEqualTo.tablet}) {
    font-size: 20px;
    line-height: 24px;
  }
`;
