import { action, computed, makeObservable, reaction } from "mobx";
import { sortByDesc } from "utils/array";
import { RootStore } from "stores/rootStore";

export class DealsTableStore {
  private disposers: Array<() => void> = [];

  public selectedDealsIds: Record<number, boolean> = {};

  public get orderedDeals() {
    return sortByDesc(this.root.reports.dealsStore.deals, (item) => item.date);
  }

  public get selectedDeals() {
    return this.root.reports.dealsStore.deals.filter(
      (div, index) => this.selectedDealsIds[index],
    );
  }

  constructor(private readonly root: RootStore) {
    makeObservable<DealsTableStore, "clearSelectedDealsIds">(this, {
      orderedDeals: computed,
      clearSelectedDealsIds: action,
    });

    this.disposers.push(
      reaction(
        () => this.root.reports.dealsStore.deals,
        this.clearSelectedDealsIds,
      ),
    );
  }

  public setSelectedDealsIds = (value: Record<number, boolean>) => {
    this.selectedDealsIds = value;
  };

  private clearSelectedDealsIds = () => {
    this.selectedDealsIds = {};
  };

  public dispose = () => {
    for (const disposer of this.disposers) {
      disposer();
    }
  };
}
