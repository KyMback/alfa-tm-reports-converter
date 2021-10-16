import { intelinvestCsvColumns, supportedRowTypes } from "./constants";

type Column = typeof intelinvestCsvColumns[number];
type RowType = typeof supportedRowTypes[number];

type RowData = Record<Column, string> & { TYPE: RowType };

export type DividendDeal = Pick<
  RowData,
  "TYPE" | "DATE" | "TICKER" | "QUANTITY" | "PRICE" | "CURRENCY" | "LINK_ID"
> & { TYPE: Extract<RowType, "DIVIDEND"> };

export type SubOperationType = "MONEYDEPOSIT" | "MONEYWITHDRAW";

export type MoneyWithdrawDeposit = Pick<
  RowData,
  "TYPE" | "DATE" | "PRICE" | "CURRENCY" | "NOTE" | "LINK_ID"
> & {
  TYPE: Extract<RowType, SubOperationType>;
};

export type StockBuySell = Pick<
  RowData,
  "TYPE" | "DATE" | "TICKER" | "QUANTITY" | "PRICE" | "CURRENCY" | "LINK_ID"
> & {
  TYPE: Extract<RowType, "STOCKBUY" | "STOCKSELL">;
};
