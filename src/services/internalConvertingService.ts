import {
  AlfaDeal,
  AlfaIncome,
  AlfaOutgoing,
} from "services/alfaReportParsingService/alfaTypings";
import { Deal, Dividend } from "typings/internal";

export class InternalConvertingService {
  private static readonly alfaDealTypeToInternalDealType: Record<
    AlfaDeal["type"],
    Deal["type"]
  > = {
    Покупка: "Buy",
    Продажа: "Sell",
  };

  public getDividends = (
    incomes: Array<AlfaIncome>,
    outgoings: Array<AlfaOutgoing>,
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

  public getDeals = (deals: Array<AlfaDeal>): Array<Deal> => {
    return deals.map((deal) => ({
      date: deal.date,
      type: InternalConvertingService.alfaDealTypeToInternalDealType[deal.type],
      price: deal.price,
      priceCurrency: deal.priceCurrency,
      count: deal.count,
      instrument: deal.instrument,
      ticker: deal.ticker,
      isin: deal.isin,
      sum: deal.sum,
      sumCurrency: deal.sumCurrency,
    }));
  };
}
