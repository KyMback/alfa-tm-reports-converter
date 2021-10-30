import { RootStore } from "stores/rootStore";

export class UploadReportsStore {
  constructor(private readonly root: RootStore) {}

  public uploadAlfaReport = async (report: File) => {
    try {
      const promise = this.root.reports.loadAlfaReport(report);
      await this.root.notificationsManager.promise(promise, {
        error: "Ошибка. Проверьте пожалуйста формат отчёта",
        pending: "Идёт разбор отчёта. Пожалуйста подождите...",
        success: "Отчёт успешно разобран",
      });
    } catch (e) {
      console.error(e);
    }
  };
}
