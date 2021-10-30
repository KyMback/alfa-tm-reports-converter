import { action, makeObservable, observable, runInAction } from "mobx";
import { DealsStore } from "stores/domain/dealsStore";
import { DividendsStore } from "stores/domain/dividendsStore";
import { RootStore } from "stores/rootStore";

export class ReportsStore {
  public readonly dealsStore: DealsStore;
  public readonly dividendsStore: DividendsStore;

  public reportParsed: boolean = false;

  constructor(private readonly root: RootStore) {
    this.dealsStore = new DealsStore();
    this.dividendsStore = new DividendsStore();

    makeObservable<ReportsStore>(this, {
      reportParsed: observable,
      loadAlfaReport: action,
    });
  }

  public loadAlfaReport = async (report: File) => {
    const result = await this.root.alfaReportParsingService.parse(report);

    runInAction(() => {
      this.reportParsed = true;
      this.dividendsStore.setAlfaDividends(result.incomes, result.outgoings);
      this.dealsStore.setAlfaDeals(result.deals);
    });
  };
}
