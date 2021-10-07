import styled from "styled-components";
import { lessOrEqualTo } from "styles/helpers";

export const MainLayoutWrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

export const ContentWrapper = styled.div`
  overflow-y: auto;
  display: flex;
  padding: 30px 160px;

  @media (${lessOrEqualTo.tablet}) {
    padding: 15px;
  }
`;
