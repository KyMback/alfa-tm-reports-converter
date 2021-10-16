import { Deal } from "typings/internal";
import { action, computed, makeObservable, observable } from "mobx";
import { sortByDesc } from "utils/array";

export class DealsStore {
  public deals: Array<Deal> = [];

  public selectedDealsIds: Record<number, boolean> = {};

  public get selectedDeals() {
    return this.deals.filter((div, index) => this.selectedDealsIds[index]);
  }

  constructor() {
    makeObservable(this, {
      deals: observable,
      selectedDeals: computed,
      setDeals: action,
    });
  }

  public setDeals = (deals: Array<Deal>) => {
    this.deals = sortByDesc(deals, (item) => item.date);
    this.selectedDealsIds = {};
  };

  public setSelectedDealsIds = (value: Record<number, boolean>) => {
    this.selectedDealsIds = value;
  };
}
