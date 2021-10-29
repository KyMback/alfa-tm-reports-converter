import { makeAutoObservable } from "mobx";

export class Deal {
  constructor(
    public date: Date,
    public type: "Buy" | "Sell",
    public price: number,
    public priceCurrency: string,
    public count: number,
    public instrument: string,
    public ticker: string,
    public isin: string,
    public sum: number,
    public sumCurrency: string,
  ) {
    makeAutoObservable(this);
  }
}
