import { parse, ParseResult } from "./parsing";

export const App = () => {
  return (
    <>
      <input
        type="file"
        onChange={async (value) => {
          const file = value.target.files?.[0];
          if (!file) {
            return;
          }

          const result = await parse(file);
          console.log(result);
          console.log(getDividends(result.incomes, result.outgoings));
        }}
      />
    </>
  );
};

type Dividend = {
  date: Date;
  currency: string;
  ticker: string;
  instrument: string;
  isin: string;
  gross: number;
  count: number;
  tax?: number;
};

const getDividends = (
  incomes: ParseResult["incomes"],
  outgoings: ParseResult["outgoings"],
): Array<Dividend> => {
  const dividends: Array<Dividend> = [];

  for (const income of incomes) {
    const outgoing = outgoings.find(
      (outgoing) =>
        outgoing.date.getTime() === income.date.getTime() &&
        outgoing.instrument === income.instrument,
    );

    dividends.push({
      date: income.date,
      instrument: income.instrument,
      count: income.count,
      isin: income.isin,
      currency: income.currency,
      ticker: income.ticker,
      gross: income.gross,
      tax: outgoing?.sum,
    });
  }

  return dividends;
};
