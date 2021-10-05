export type DealItemParsingResult = {};

export type IncomeParsingResult = {
  date: Date;
  currency: string;
  incomeForOne: number;
  gross: number;
  count: number;
  ticker: string;
  instrument: string;
  isin: string;
};

export type OutgoingsParsingResult = {
  date: Date;
  currency: string;
  sum: number;
  count: number;
  instrument: string;
};

export type DepositsWithdrawals = {};

export interface ParseResult {
  deals: Array<DealItemParsingResult>;
  incomes: Array<IncomeParsingResult>;
  outgoings: Array<OutgoingsParsingResult>;
  depositsWithdrawals: Array<DepositsWithdrawals>;
}
