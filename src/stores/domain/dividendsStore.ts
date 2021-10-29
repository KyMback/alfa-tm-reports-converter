import { Dividend } from "stores/domain/dividend";
import { action, makeObservable, observable } from "mobx";
import {
  AlfaIncome,
  AlfaOutgoing,
} from "services/alfaReportParsingService/alfaTypings";

export class DividendsStore {
  public dividends: Array<Dividend> = [];

  constructor() {
    makeObservable(this, {
      dividends: observable,
      setAlfaDividends: action,
    });
  }

  public setAlfaDividends = (
    incomes: Array<AlfaIncome>,
    outgoings: Array<AlfaOutgoing>,
  ) => {
    this.dividends.length = 0;

    for (const income of incomes) {
      const outgoing = outgoings.find(
        (outgoing) =>
          outgoing.date.getTime() === income.date.getTime() &&
          outgoing.instrument === income.instrument,
      );

      this.dividends.push(
        new Dividend(
          income.date,
          income.currency,
          income.ticker,
          income.instrument,
          income.isin,
          income.gross,
          income.count,
          outgoing?.sum,
        ),
      );
    }
  };
}
