import { RootStore } from "stores/rootStore";
import { HeaderStore } from "stores/ui/headerStore";
import { DividendsTableStore } from "stores/ui/dividendsTableStore";
import { DealsTableStore } from "stores/ui/dealsTableStore";
import fileDownload from "js-file-download";

export class UiStateStore {
  public readonly header: HeaderStore;
  public readonly dividendsTable: DividendsTableStore;
  public readonly dealsTable: DealsTableStore;

  constructor(private readonly root: RootStore) {
    this.header = new HeaderStore(this.root);
    this.dividendsTable = new DividendsTableStore(this.root);
    this.dealsTable = new DealsTableStore(this.root);
  }

  public downloadIntelinvest = () => {
    const csv = this.root.intelinvestConvertingService.getCsvImportFile(
      this.dealsTable.selectedDeals,
      this.dividendsTable.selectedDividends,
    );

    fileDownload(csv, `deals.csv`);
  };

  public dispose = () => {
    this.dividendsTable.dispose();
    this.dealsTable.dispose();
  };
}
