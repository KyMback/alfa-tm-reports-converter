import { RootStore } from "stores/rootStore";
import { DividendsTableStore } from "stores/ui/dividendsTableStore";
import { DealsTableStore } from "stores/ui/dealsTableStore";
import { DownloadFormatsStore } from "stores/ui/downloadFormatsStore";
import { UploadReportsStore } from "stores/ui/uploadReportsStore";

export class UiStateStore {
  public readonly dividendsTable: DividendsTableStore;
  public readonly dealsTable: DealsTableStore;
  public readonly downloadFormats: DownloadFormatsStore;
  public readonly uploadReports: UploadReportsStore;

  constructor(private readonly root: RootStore) {
    this.dividendsTable = new DividendsTableStore(this.root);
    this.dealsTable = new DealsTableStore(this.root);
    this.downloadFormats = new DownloadFormatsStore(this.root);
    this.uploadReports = new UploadReportsStore(this.root);
  }

  public dispose = () => {
    this.dividendsTable.dispose();
    this.dealsTable.dispose();
  };
}
