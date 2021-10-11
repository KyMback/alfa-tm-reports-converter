/* eslint-disable react/jsx-key */
import { useRowSelect, useTable } from "react-table";
import { observer } from "mobx-react-lite";
import {
  TableBody,
  TableDataCell,
  TableHeadCell,
  TableHeader,
  TableHeadRow,
  TableRow,
} from "components/Table";
import { DividendsStore } from "stores/dividendsStore";
import { desktopColumns, mobileColumns } from "modules/DividendsTable/columns";
import { useTabletOrBelow } from "hooks/mediaQuery";
import { ResponsiveTable } from "modules/DividendsTable/styles";

interface Props {
  dividendsStore: DividendsStore;
}

export const DividendsTable = observer(({ dividendsStore }: Props) => {
  const isTabletOrBelow = useTabletOrBelow();
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns: isTabletOrBelow ? mobileColumns : desktopColumns,
        data: dividendsStore.dividends,
        stateReducer: (newState, action) => {
          switch (action.type) {
            case "toggleRowSelected":
            case "toggleAllRowsSelected":
              // @ts-ignore
              dividendsStore.setSelectedDividendIds(newState.selectedRowIds);
          }

          return newState;
        },
      },
      useRowSelect,
    );

  return (
    <ResponsiveTable {...getTableProps()}>
      <TableHeader>
        {headerGroups.map((headerGroup) => (
          <TableHeadRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableHeadCell {...column.getHeaderProps()}>
                {column.render("Header")}
              </TableHeadCell>
            ))}
          </TableHeadRow>
        ))}
      </TableHeader>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <TableDataCell {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableDataCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </ResponsiveTable>
  );
});
