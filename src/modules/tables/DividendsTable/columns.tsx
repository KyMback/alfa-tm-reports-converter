import { Column } from "react-table";
import { Dividend } from "typings/internal";
import { Checkbox } from "components/Checkbox";
import { MobileInstrumentCell } from "../MobileInstrumentCell";
import { DateCell } from "components/Table/DateCell";
import { NumberCell } from "components/Table/NumberCell";

export const desktopColumns: Array<Column<Dividend>> = [
  {
    id: "selection",
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
    accessor: DateCell,
  },
  {
    Header: "Тикер",
    accessor: "ticker",
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
    accessor: ({ gross, count }) => <NumberCell number={gross / count} />,
  },
  {
    Header: "Налог",
    accessor: "tax",
  },
  {
    Header: "Валюта",
    accessor: "currency",
  },
];

export const mobileColumns: Array<Column<Dividend>> = [
  {
    Header: "Инструмент",
    accessor: MobileInstrumentCell,
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
    // eslint-disable-next-line react/prop-types
    Header: ({ getToggleAllRowsSelectedProps }) => (
      <Checkbox {...getToggleAllRowsSelectedProps()} />
    ),
    // @ts-ignore
    // eslint-disable-next-line react/prop-types
    Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
  },
];
