import styled from "styled-components";
import { lessOrEqualTo } from "styles/helpers";

export const Description = styled.div`
  margin-bottom: 10px;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;

  @media (${lessOrEqualTo.mobileM}) {
    justify-content: space-between;
  }
`;
