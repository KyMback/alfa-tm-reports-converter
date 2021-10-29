import { action, makeObservable, observable } from "mobx";
import { Deal } from "stores/domain/deal";
import { AlfaDeal } from "services/alfaReportParsingService/alfaTypings";

export class DealsStore {
  private readonly alfaDealTypeToInternalDealType: Record<
    AlfaDeal["type"],
    Deal["type"]
  > = {
    Покупка: "Buy",
    Продажа: "Sell",
  };

  public deals: Array<Deal> = [];

  constructor() {
    makeObservable(this, {
      deals: observable,
      setAlfaDeals: action,
    });
  }

  public setAlfaDeals = (deals: Array<AlfaDeal>) => {
    this.deals.length = 0;

    for (const deal of deals) {
      this.deals.push(
        new Deal(
          deal.date,
          this.alfaDealTypeToInternalDealType[deal.type],
          deal.price,
          deal.priceCurrency,
          deal.count,
          deal.instrument,
          deal.ticker,
          deal.isin,
          deal.sum,
          deal.sumCurrency,
        ),
      );
    }
  };
}
