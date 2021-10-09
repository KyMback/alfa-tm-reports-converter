import { action, computed, makeObservable, observable } from "mobx";
import { Dividend } from "typings/internal";
import { toCsv } from "utils/csv";
import fileDownload from "js-file-download";
import { IntelinvestConvertingService } from "services/intelinvest/intelinvestConvertingService";

export class DividendsStore {
  private readonly intelinvestConvertingService =
    new IntelinvestConvertingService();

  public dividends: Array<Dividend> = [];

  public selectedDividendIds: Record<number, boolean> = {};

  public get selectedDividends() {
    return this.dividends.filter(
      (div, index) => this.selectedDividendIds[index],
    );
  }

  constructor() {
    makeObservable(this, {
      dividends: observable,
      selectedDividendIds: observable,
      selectedDividends: computed,
      setDividends: action,
      setSelectedDividendIds: action,
    });
  }

  public setDividends = (dividends: Array<Dividend>) => {
    this.dividends = dividends;
  };

  public setSelectedDividendIds = (value: Record<number, boolean>) => {
    this.selectedDividendIds = value;
  };

  public downloadIntelinvest = () => {
    const items = this.intelinvestConvertingService.dividendsToCsvItems(
      this.selectedDividends,
    );
    const csv = toCsv(
      this.intelinvestConvertingService.intelinvestCsvColumns,
      items,
      ";",
    );
    fileDownload(csv, `dividends.csv`);
  };
}
