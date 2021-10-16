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

export const dealTypes = ["Buy", "Sell"] as const;

export type Deal = {
  date: Date;
  type: typeof dealTypes[number];
  price: number;
  priceCurrency: string;
  count: number;
  instrument: string;
  ticker: string;
  isin: string;
  sum: number;
  sumCurrency: string;
};
