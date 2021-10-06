/* eslint-disable react/jsx-key */
import { Column, useRowSelect, useTable } from "react-table";
import { format } from "date-fns";
import { round } from "utils/math";
import { Dividend } from "typings/internal";
import { useRootStore } from "hooks/useRootStore";
import { observer } from "mobx-react-lite";
import { Checkbox } from "components/Checkbox";
import {
  Table,
  TableBody,
  TableDataCell,
  TableHeadCell,
  TableHeader,
  TableHeadRow,
  TableRow,
} from "components/Table/styles";

const columns: Array<Column<Dividend>> = [
  {
    id: "selection",
    // @ts-ignore
    // eslint-disable-next-line react/prop-types
    Header: ({ getToggleAllRowsSelectedProps }) => (
      <Checkbox {...getToggleAllRowsSelectedProps()} />
    ),
    // @ts-ignore
    // eslint-disable-next-line react/prop-types
    Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
  },
  {
    accessor: (originalRow) => format(originalRow.date, "dd.MM.yyyy"),
    Header: "Дата",
  },
  {
    accessor: "ticker",
    Header: "Тикер",
  },
  {
    accessor: "currency",
    Header: "Валюта",
  },
  {
    accessor: "count",
    Header: "Количество",
  },
  {
    accessor: "gross",
    Header: "Прибыль",
  },
  {
    accessor: ({ gross, count }) => round(gross / count, 2),
    Header: "Прибыль на одну",
  },
  {
    accessor: "tax",
    Header: "Налог",
  },
];

export const DividendsTable = observer(() => {
  const { dividendsStore } = useRootStore();

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
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
    <Table {...getTableProps()}>
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
    </Table>
  );
});
