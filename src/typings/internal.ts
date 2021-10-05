export type Dividend = {
  date: Date;
  currency: string;
  ticker: string;
  instrument: string;
  isin: string;
  gross: number;
  count: number;
  tax?: number;
};
