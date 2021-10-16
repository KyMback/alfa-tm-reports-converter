import styled from "styled-components";
import { lessOrEqualTo, themeColor } from "styles/helpers";

export const TableWrapper = styled.table`
  width: 100%;

  font-weight: bold;
  font-size: 24px;
  line-height: 29px;

  border-spacing: 0 10px;
  border-collapse: separate;
`;

export const TableBody = styled.tbody`
  @media (${lessOrEqualTo.tablet}) {
    font-size: 18px;
    line-height: 22px;
  }
`;

export const TableDataCell = styled.td`
  text-align: center;
  padding: 10px 0;
  border: none;

  &:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  &:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  @media (${lessOrEqualTo.tablet}) {
    padding: 5px 0;

    &:first-child {
      text-align: start;
      padding-left: 15px;
    }

    &:last-child {
      text-align: end;
      padding-right: 15px;
    }
  }
`;

export const TableRow = styled.tr`
  background: ${themeColor("secondary")};

  &:nth-child(2n) {
    background: none;

    ${TableDataCell} {
      border-top: 1px solid ${themeColor("onSurface")};
      border-bottom: 1px solid ${themeColor("onSurface")};

      &:first-child {
        border-left: 1px solid ${themeColor("onSurface")};
      }

      &:last-child {
        border-right: 1px solid ${themeColor("onSurface")};
      }
    }
  }
`;

export const TableHeader = styled.thead`
  @media (${lessOrEqualTo.tablet}) {
    font-size: 14px;
    line-height: 17px;
    font-weight: bold;
  }
`;

export const TableHeadRow = styled(TableRow)`
  background: none;
`;

export const TableHeadCell = styled.th`
  padding: 20px 0;
  border-bottom: 2px solid ${themeColor("onSurface")};

  @media (${lessOrEqualTo.tablet}) {
    padding: 10px 0;

    &:first-child {
      text-align: start;
      padding-left: 15px;
    }

    &:last-child {
      text-align: end;
      padding-right: 15px;
    }
  }
`;
