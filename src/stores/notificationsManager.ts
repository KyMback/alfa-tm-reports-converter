import { toast } from "react-toastify";

export class NotificationsManager {
  public promise = <TData>(
    promise: Promise<TData>,
    options: {
      error: string;
      pending: string;
      success: string;
    },
  ) => {
    return toast.promise(promise, {
      error: {
        render: options.error,
        icon: false,
      },
      success: {
        render: options.success,
        icon: false,
      },
      pending: options.pending,
    });
  };
}
