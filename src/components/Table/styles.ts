import styled from "styled-components";
import { themeColor } from "styles/utils";

export const Table = styled.table`
  width: 100%;

  font-weight: bold;
  font-size: 24px;
  line-height: 29px;

  border-spacing: 0 10px;
  border-collapse: separate;
`;

export const TableHeader = styled.thead``;

export const TableHeadCell = styled.th`
  padding: 20px 0;
  border-bottom: 2px solid ${themeColor("onSurface")};
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  background: ${themeColor("secondary")};

  &:nth-child(2n) {
    background: none;

    td {
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

export const TableHeadRow = styled(TableRow)`
  background: none;
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
`;
