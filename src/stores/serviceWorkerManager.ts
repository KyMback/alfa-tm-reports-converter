import { BaseReactiveModalStore } from "components/ReactiveModal";
import { Workbox } from "workbox-window";

export class ServiceWorkerManager {
  public readonly updateModalStore = new BaseReactiveModalStore<boolean>();

  public register = async () => {
    if (
      process.env.NODE_ENV !== "production" ||
      !("serviceWorker" in navigator)
    ) {
      return;
    }

    const wb = new Workbox("service-worker.js");

    wb.addEventListener("waiting", async () => {
      const result = await this.updateModalStore.open();

      if (result) {
        wb.addEventListener("controlling", () => {
          window.location.reload();
        });

        wb.messageSkipWaiting();
      }
    });

    await wb.register();
  };
}
