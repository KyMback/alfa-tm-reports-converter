import { makeAutoObservable } from "mobx";

export class Dividend {
  constructor(
    public date: Date,
    public currency: string,
    public ticker: string,
    public instrument: string,
    public isin: string,
    public gross: number,
    public count: number,
    public tax?: number,
  ) {
    makeAutoObservable(this);
  }
}
