import { Column } from "react-table";
import { Deal } from "typings/internal";
import { Checkbox } from "components/Checkbox";
import { MobileInstrumentCell } from "modules/tables/MobileInstrumentCell";
import { DealTypeCell } from "modules/tables/DealsTable/DealTypeCell";
import { DateCell } from "components/Table/DateCell";
import { NumberCell } from "components/Table/NumberCell";

export const desktopColumns: Array<Column<Deal>> = [
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
    Header: "Тип",
    accessor: DealTypeCell,
  },
  {
    Header: "Количество",
    accessor: "count",
  },
  {
    Header: "Сумма",
    accessor: ({ sum }) => <NumberCell number={sum} />,
  },
  {
    Header: "Валюта",
    accessor: "sumCurrency",
  },
];

export const mobileColumns: Array<Column<Deal>> = [
  {
    Header: "Инструмент",
    accessor: ({ ticker, sumCurrency, date }) => (
      <MobileInstrumentCell
        ticker={ticker}
        currency={sumCurrency}
        date={date}
      />
    ),
  },
  {
    Header: "Тип",
    accessor: DealTypeCell,
  },
  {
    Header: "Сумма",
    accessor: ({ sum }) => <NumberCell number={sum} />,
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
