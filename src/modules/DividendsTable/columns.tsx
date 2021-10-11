import { Column } from "react-table";
import { Dividend } from "typings/internal";
import { Checkbox } from "components/Checkbox";
import { format } from "date-fns";
import { round } from "utils/math";
import { MobileInstrumentCell } from "./MobileInstrumentCell";

export const desktopColumns: Array<Column<Dividend>> = [
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
    Header: "Дата",
    accessor: (originalRow) => format(originalRow.date, "dd.MM.yyyy"),
  },
  {
    Header: "Тикер",
    accessor: "ticker",
  },
  {
    Header: "Валюта",
    accessor: "currency",
  },
  {
    Header: "Количество",
    accessor: "count",
  },
  {
    Header: "Прибыль",
    accessor: "gross",
  },
  {
    Header: "Прибыль на одну",
    accessor: ({ gross, count }) => round(gross / count, 2),
  },
  {
    Header: "Налог",
    accessor: "tax",
  },
];

export const mobileColumns: Array<Column<Dividend>> = [
  {
    Header: "Инструмент",
    accessor: (item) => <MobileInstrumentCell dividend={item} />,
  },
  {
    Header: "Прибыль",
    accessor: "gross",
  },
  {
    Header: "Налог",
    accessor: "tax",
  },
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
];
