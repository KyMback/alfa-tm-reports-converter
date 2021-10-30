import { RootStore } from "stores/rootStore";
import fileDownload from "js-file-download";

export class DownloadFormatsStore {
  constructor(private readonly root: RootStore) {}

  public downloadIntelinvest = () => {
    const csv = this.root.intelinvestConvertingService.getCsvImportFile(
      this.root.ui.dealsTable.selectedDeals,
      this.root.ui.dividendsTable.selectedDividends,
    );

    fileDownload(csv, `deals.csv`);
  };
}
