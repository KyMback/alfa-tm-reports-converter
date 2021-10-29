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

    makeObservable<ReportsStore, "loadAlfaReportInternal">(this, {
      reportParsed: observable,
      loadAlfaReport: action,
      loadAlfaReportInternal: action,
    });
  }

  public loadAlfaReport = async (report: File) => {
    try {
      const promise = this.loadAlfaReportInternal(report);
      await this.root.notificationsManager.promise(promise, {
        error: "Ошибка. Проверьте пожалуйста формат отчёта",
        pending: "Идёт разбор отчёта. Пожалуйста подождите...",
        success: "Отчёт успешно разобран",
      });
    } catch (e) {
      console.error(e);
    }
  };

  private loadAlfaReportInternal = async (report: File) => {
    const result = await this.root.alfaReportParsingService.parse(report);

    runInAction(() => {
      this.reportParsed = true;
      this.dividendsStore.setAlfaDividends(result.incomes, result.outgoings);
      this.dealsStore.setAlfaDeals(result.deals);
    });
  };
}
