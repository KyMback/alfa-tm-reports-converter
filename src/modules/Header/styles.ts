import styled from "styled-components";
import { themeColor } from "styles/utils";

interface HeaderWrapperProps {
  onlyTitle: boolean;
}

export const HeaderWrapper = styled.header<HeaderWrapperProps>`
  padding: 16px 160px 16px 160px;
  box-shadow: 0 10px 30px ${themeColor("shadow")};
  display: flex;
  justify-content: ${(props) => (props.onlyTitle ? "center" : "space-between")};
  align-items: center;
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
`;
