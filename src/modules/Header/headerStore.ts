import { RootStore } from "stores/rootStore";

export class HeaderStore {
  public get withReport() {
    return this.root.reports.reportParsed;
  }

  constructor(private readonly root: RootStore) {}

  public loadReport = async (files: Array<File>) => {
    if (files.length == 0) {
      return;
    }

    await this.root.ui.uploadReports.uploadAlfaReport(files[0]);
  };
}
