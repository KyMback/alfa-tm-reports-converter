import { AlfaReportParsingService } from "services/alfaReportParsingService";
import { IntelinvestConvertingService } from "services/intelinvest/intelinvestConvertingService";
import { NotificationsManager } from "stores/notificationsManager";
import { ServiceWorkerManager } from "stores/serviceWorkerManager";
import { ReportsStore } from "stores/domain/reportsStore";
import { UiStateStore } from "stores/ui/uiStateStore";

export class RootStore {
  public readonly alfaReportParsingService = new AlfaReportParsingService();
  public readonly intelinvestConvertingService =
    new IntelinvestConvertingService();

  public readonly notificationsManager = new NotificationsManager();
  public readonly serviceWorkerManager = new ServiceWorkerManager();

  public readonly reports = new ReportsStore(this);
  public readonly ui = new UiStateStore(this);

  public dispose = () => {
    this.ui.dispose();
  };
}
