export const intelinvestCsvColumns = [
  "TYPE",
  "DATE",
  "TICKER",
  "QUANTITY",
  "PRICE",
  "FEE",
  "NKD",
  "NOMINAL",
  "CURRENCY",
  "FEE_CURRENCY",
  "NOTE",
  "LINK_ID",
] as const;

export const supportedRowTypes = [
  "DIVIDEND",
  "MONEYDEPOSIT",
  "MONEYWITHDRAW",
  "STOCKBUY",
  "STOCKSELL",
] as const;

export const csvFileSeparator = ";";
