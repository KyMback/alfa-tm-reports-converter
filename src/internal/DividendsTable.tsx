/* eslint-disable react/jsx-key */
import { Column, useTable } from "react-table";
import { format } from "date-fns";
import { round } from "utils/math";
import { Dividend } from "typings/internal";
import { useRootStore } from "hooks/useRootStore";
import { observer } from "mobx-react-lite";

const columns: Array<Column<Dividend>> = [
  {
    accessor: (originalRow) => format(originalRow.date, "dd.MM.yyyy"),
    Header: "Date",
  },
  {
    accessor: "ticker",
    Header: "Ticker",
  },
  {
    accessor: "currency",
    Header: "Currency",
  },
  {
    accessor: "count",
    Header: "Count",
  },
  {
    accessor: "gross",
    Header: "Gross income",
  },
  {
    accessor: ({ gross, count }) => round(gross / count, 2),
    Header: "Gross income for one",
  },
  {
    accessor: "tax",
    Header: "Tax",
  },
  {
    accessor: ({ gross, tax }) => round(gross - (tax || 0), 2),
    Header: "Net income",
  },
  {
    accessor: ({ gross, count, tax }) => round((gross - (tax || 0)) / count, 2),
    Header: "Net income for one",
  },
];

export const DividendsTable = observer(() => {
  const rootStore = useRootStore();

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: rootStore.dividends,
    });

  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
});
