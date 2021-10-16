import { action, computed, makeObservable, observable } from "mobx";
import { Dividend } from "typings/internal";
import { sortByDesc } from "utils/array";

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
      selectedDividends: computed,
      setDividends: action,
    });
  }

  public setDividends = (dividends: Array<Dividend>) => {
    this.dividends = sortByDesc(dividends, (item) => item.date);
    this.selectedDividendIds = {};
  };

  public setSelectedDividendIds = (value: Record<number, boolean>) => {
    this.selectedDividendIds = value;
  };
}
