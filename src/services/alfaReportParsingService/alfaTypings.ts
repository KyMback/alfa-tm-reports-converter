import { supportedDealsTypes } from "services/alfaReportParsingService/constants";

export type AlfaDeal = {
  date: Date;
  type: AlfaDealType;
  price: number;
  priceCurrency: string;
  count: number;
  instrument: string;
  ticker: string;
  isin: string;
  sum: number;
  sumCurrency: string;
};

export type AlfaDealType = typeof supportedDealsTypes[number];

export type AlfaIncome = {
  date: Date;
  currency: string;
  incomeForOne: number;
  gross: number;
  count: number;
  ticker: string;
  instrument: string;
  isin: string;
};

export type AlfaOutgoing = {
  date: Date;
  currency: string;
  sum: number;
  count: number;
  instrument: string;
};

export type AlfaDepositsWithdrawals = {};

export interface AlfaParseResult {
  deals: Array<AlfaDeal>;
  incomes: Array<AlfaIncome>;
  outgoings: Array<AlfaOutgoing>;
  depositsWithdrawals: Array<AlfaDepositsWithdrawals>;
}
