import styled from "styled-components";
import { moreOrEqualTo } from "styles/helpers";

export const MainLayoutWrapper = styled.div`
  height: 100%;
  display: grid;
  position: relative;
  grid-template-rows: auto 1fr auto;
`;

export const ContentWrapper = styled.div`
  overflow-y: auto;
  display: flex;
  padding: 15px;

  @media (${moreOrEqualTo.laptopL}) {
    padding: 30px 100px;
  }

  @media (${moreOrEqualTo.desktop}) {
    padding: 30px 160px;
  }
`;
