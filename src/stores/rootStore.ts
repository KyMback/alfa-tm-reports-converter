import { InternalConvertingService } from "services/internalConvertingService";
import { AlfaReportParsingService } from "services/alfaReportParsingService";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { ParseResult } from "typings/parsing";
import { DividendsStore } from "stores/dividendsStore";

export class RootStore {
  private readonly internalConvertingService = new InternalConvertingService();
  private readonly alfaReportParsingService = new AlfaReportParsingService();

  public readonly dividendsStore = new DividendsStore();

  public parsingResult: ParseResult | null = null;

  public get reportParsed() {
    return this.parsingResult != null;
  }

  constructor() {
    makeObservable(this, {
      parsingResult: observable,
      reportParsed: computed,
      parseReport: action,
    });
  }

  public parseReport = async (report: File) => {
    try {
      const result = await this.alfaReportParsingService.parse(report);
      const dividends = this.internalConvertingService.getDividends(
        result.incomes,
        result.outgoings,
      );
      runInAction(() => {
        this.parsingResult = result;
        this.dividendsStore.setDividends(dividends);
      });
    } catch (e) {
      console.error(e);
    }
  };
}
