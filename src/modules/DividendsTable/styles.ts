import styled from "styled-components";
import { Table } from "components/Table";
import { lessOrEqualTo } from "styles/helpers";

export const ResponsiveTable = styled(Table)`
  @media (${lessOrEqualTo.tablet}) {
    padding-bottom: 40px;
  }
`;
