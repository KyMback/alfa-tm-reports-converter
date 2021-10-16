import {
  TableBody,
  TableDataCell,
  TableHeadCell,
  TableHeader,
  TableHeadRow,
  TableRow,
  TableWrapper,
} from "./styles";
import {
  ActionType,
  Column,
  IdType,
  TableState,
  useRowSelect,
  useTable,
} from "react-table";
import { useCallback } from "react";

interface Props<TValue extends object> {
  className?: string;
  columns: ReadonlyArray<Column<TValue>>;
  data: Array<TValue>;
  initialSelectedRowIds?: Record<IdType<TValue>, boolean>;
  onRowSelected: (value: Record<number, boolean>) => void;
}

export const Table = <TValue extends object>({
  className,
  columns,
  data,
  initialSelectedRowIds,
  onRowSelected,
}: Props<TValue>) => {
  const stateReducer = useCallback(
    (newState: TableState<TValue>, action: ActionType) => {
      switch (action.type) {
        case "toggleRowSelected":
        case "toggleAllRowsSelected":
          onRowSelected(newState.selectedRowIds);
      }

      return newState;
    },
    [onRowSelected],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    // For typings look at react-table-config.d.ts
    useTable(
      {
        columns: columns,
        data: data,
        stateReducer: stateReducer,
        initialState: {
          selectedRowIds: initialSelectedRowIds,
        },
      },
      useRowSelect,
    );

  return (
    <TableWrapper {...getTableProps()} className={className}>
      <TableHeader>
        {headerGroups.map((headerGroup) => (
          // eslint-disable-next-line react/jsx-key
          <TableHeadRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              // eslint-disable-next-line react/jsx-key
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
            // eslint-disable-next-line react/jsx-key
            <TableRow {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <TableDataCell {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableDataCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </TableWrapper>
  );
};
