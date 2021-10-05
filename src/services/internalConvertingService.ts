import { IncomeParsingResult, OutgoingsParsingResult } from "typings/parsing";
import { Dividend } from "typings/internal";

export class InternalConvertingService {
  public getDividends = (
    incomes: Array<IncomeParsingResult>,
    outgoings: Array<OutgoingsParsingResult>,
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
}
