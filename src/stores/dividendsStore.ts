import { action, computed, makeObservable, observable } from "mobx";
import { Dividend } from "typings/internal";

export class DividendsStore {
  public dividends: Array<Dividend> = [];

  public selectedDividendIds: Record<number, boolean> = {};

  public get selectedDividends() {
    return this.dividends.filter(
      (div, index) => this.selectedDividendIds[index],
    );
  }

  constructor() {
    makeObservable(this, {
      dividends: observable,
      selectedDividendIds: observable,
      selectedDividends: computed,
      setDividends: action,
      setSelectedDividendIds: action,
    });
  }

  public setDividends = (dividends: Array<Dividend>) => {
    this.dividends = dividends;
  };

  public setSelectedDividendIds = (value: Record<number, boolean>) => {
    this.selectedDividendIds = value;
  };
}
