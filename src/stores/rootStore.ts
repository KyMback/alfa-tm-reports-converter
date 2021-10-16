import { InternalConvertingService } from "services/internalConvertingService";
import { AlfaReportParsingService } from "services/alfaReportParsingService";
import { action, makeObservable, observable, runInAction } from "mobx";
import { AlfaParseResult } from "services/alfaReportParsingService/alfaTypings";
import { DividendsStore } from "stores/dividendsStore";
import fileDownload from "js-file-download";
import { IntelinvestConvertingService } from "services/intelinvest/intelinvestConvertingService";
import { NotificationsManager } from "stores/notificationsManager";
import { DealsStore } from "stores/dealsStore";

export class RootStore {
  private readonly internalConvertingService = new InternalConvertingService();
  private readonly alfaReportParsingService = new AlfaReportParsingService();
  private readonly intelinvestConvertingService =
    new IntelinvestConvertingService();

  public readonly notificationsManager = new NotificationsManager();

  public readonly dividendsStore = new DividendsStore();
  public readonly dealsStore = new DealsStore();

  public parsingResult: AlfaParseResult | null = null;

  public reportParsed: boolean = false;

  constructor() {
    makeObservable(this, {
      parsingResult: observable,
      reportParsed: observable,
      parseReport: action,
    });
  }

  public parseReport = async (report: File) => {
    try {
      const promise = this.alfaReportParsingService.parse(report);
      const result = await this.notificationsManager.promise(promise, {
        error: "Ошибка. Проверьте пожалуйста формат отчёта",
        pending: "Идёт разбор отчёта. Пожалуйста подождите...",
        success: "Отчёт успешно разобран",
      });
      const dividends = this.internalConvertingService.getDividends(
        result.incomes,
        result.outgoings,
      );
      const deals = this.internalConvertingService.getDeals(result.deals);

      runInAction(() => {
        this.reportParsed = true;
        this.parsingResult = result;
        this.dividendsStore.setDividends(dividends);
        this.dealsStore.setDeals(deals);
      });
    } catch (e) {
      console.error(e);
    }
  };

  public downloadIntelinvest = () => {
    const csv = this.intelinvestConvertingService.getCsvImportFile(
      this.dealsStore.selectedDeals,
      this.dividendsStore.selectedDividends,
    );

    fileDownload(csv, `deals.csv`);
  };
}
