import { InternalConvertingService } from "services/internalConvertingService";
import { AlfaReportParsingService } from "services/alfaReportParsingService";
import { IntelinvestConvertingService } from "services/intelinvest/intelinvestConvertingService";
import { Dividend } from "typings/internal";
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

export class RootStore {
  private readonly internalConvertingService = new InternalConvertingService();
  private readonly alfaReportParsingService = new AlfaReportParsingService();
  private readonly intelinvestConvertingService =
    new IntelinvestConvertingService();

  public parsingResult: ParseResult | null = null;
  public dividends: Array<Dividend> = [];

  public get reportParsed() {
    return this.parsingResult != null;
  }

  constructor() {
    makeObservable(this, {
      dividends: observable,
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
      this.dividends = dividends;
    });
  };

  public downloadIntelinvestDividends = () => {
    if (!this.reportParsed) {
      return;
    }

    const items = this.intelinvestConvertingService.dividendsToCsvItems(
      this.dividends,
    );
    const csv = toCsv(
      this.intelinvestConvertingService.intelinvestCsvColumns,
      items,
      ";",
    );
    fileDownload(csv, `dividends.csv`);
  };
}
