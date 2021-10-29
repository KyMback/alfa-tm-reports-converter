import { action, computed, makeObservable, reaction } from "mobx";
import { sortByDesc } from "utils/array";
import { RootStore } from "stores/rootStore";

export class DividendsTableStore {
  private disposers: Array<() => void> = [];

  public selectedDividendIds: Record<number, boolean> = {};

  public get orderedDividends() {
    return sortByDesc(
      this.root.reports.dividendsStore.dividends,
      (item) => item.date,
    );
  }

  public get selectedDividends() {
    return this.root.reports.dividendsStore.dividends.filter(
      (div, index) => this.selectedDividendIds[index],
    );
  }

  constructor(private readonly root: RootStore) {
    makeObservable<DividendsTableStore, "clearSelectedDividendIds">(this, {
      orderedDividends: computed,
      clearSelectedDividendIds: action,
    });

    this.disposers.push(
      reaction(
        () => this.root.reports.dividendsStore.dividends,
        this.clearSelectedDividendIds,
      ),
    );
  }

  public setSelectedDividendIds = (value: Record<number, boolean>) => {
    this.selectedDividendIds = value;
  };

  private clearSelectedDividendIds = () => {
    this.selectedDividendIds = {};
  };

  public dispose = () => {
    for (const disposer of this.disposers) {
      disposer();
    }
  };
}
