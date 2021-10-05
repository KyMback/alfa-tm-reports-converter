import { InternalConvertingService } from "services/internalConvertingService";
import { AlfaReportParsingService } from "services/alfaReportParsingService";
import { IntelinvestConvertingService } from "services/intelinvest/intelinvestConvertingService";
import { toCsv } from "utils/csv";
import fileDownload from "js-file-download";
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
  private readonly intelinvestConvertingService =
    new IntelinvestConvertingService();

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
    const result = await this.alfaReportParsingService.parse(report);
    const dividends = this.internalConvertingService.getDividends(
      result.incomes,
      result.outgoings,
    );

    runInAction(() => {
      this.parsingResult = result;
      this.dividendsStore.setDividends(dividends);
    });
  };

  public downloadIntelinvestDividends = () => {
    if (!this.reportParsed) {
      return;
    }

    const items = this.intelinvestConvertingService.dividendsToCsvItems(
      this.dividendsStore.selectedDividends,
    );
    const csv = toCsv(
      this.intelinvestConvertingService.intelinvestCsvColumns,
      items,
      ";",
    );
    fileDownload(csv, `dividends.csv`);
  };
}
