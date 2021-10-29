import { InternalConvertingService } from "services/internalConvertingService";
import { AlfaReportParsingService } from "services/alfaReportParsingService";
import { makeObservable, observable, runInAction } from "mobx";
import { DividendsStore } from "stores/dividendsStore";
import fileDownload from "js-file-download";
import { IntelinvestConvertingService } from "services/intelinvest/intelinvestConvertingService";
import { NotificationsManager } from "stores/notificationsManager";
import { DealsStore } from "stores/dealsStore";
import { ServiceWorkerManager } from "stores/serviceWorkerManager";

export class RootStore {
  private readonly internalConvertingService = new InternalConvertingService();
  private readonly alfaReportParsingService = new AlfaReportParsingService();
  private readonly intelinvestConvertingService =
    new IntelinvestConvertingService();

  public readonly notificationsManager = new NotificationsManager();
  public readonly serviceWorkerManager = new ServiceWorkerManager();

  public readonly dividendsStore = new DividendsStore();
  public readonly dealsStore = new DealsStore();

  public reportParsed: boolean = false;

  constructor() {
    makeObservable(this, {
      reportParsed: observable,
    });
  }

  public parseReport = async (report: File) => {
    try {
      const promise = this.parseReportInternal(report);
      await this.notificationsManager.promise(promise, {
        error: "Ошибка. Проверьте пожалуйста формат отчёта",
        pending: "Идёт разбор отчёта. Пожалуйста подождите...",
        success: "Отчёт успешно разобран",
      });
    } catch (e) {
      console.error(e);
    }
  };

  private parseReportInternal = async (report: File) => {
    const result = await this.alfaReportParsingService.parse(report);
    const dividends = this.internalConvertingService.getDividends(
      result.incomes,
      result.outgoings,
    );
    const deals = this.internalConvertingService.getDeals(result.deals);

    runInAction(() => {
      this.reportParsed = true;
      this.dividendsStore.setDividends(dividends);
      this.dealsStore.setDeals(deals);
    });
  };

  public downloadIntelinvest = () => {
    const csv = this.intelinvestConvertingService.getCsvImportFile(
      this.dealsStore.selectedDeals,
      this.dividendsStore.selectedDividends,
    );

    fileDownload(csv, `deals.csv`);
  };
}
