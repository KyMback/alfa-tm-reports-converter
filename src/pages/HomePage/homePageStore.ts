import { RootStore } from "stores/rootStore";
import { General } from "constants/general";

export class HomePageStore {
  constructor(private readonly root: RootStore) {}

  public loadReport = async (files: Array<File>) => {
    if (files.length == 0) {
      return;
    }

    await this.root.ui.uploadReports.uploadAlfaReport(files[0]);
  };

  public openMoreInfoPage = () => {
    window.open(General.repositoryReadmePath);
  };
}
