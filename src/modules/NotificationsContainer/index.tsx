import { injectStyle } from "react-toastify/dist/inject-style";
import {
  CloseButton,
  NotificationContainerWrapper,
} from "modules/NotificationsContainer/styles";
import { MdClose } from "react-icons/md";

injectStyle();

export const NotificationsContainer = () => {
  return (
    <NotificationContainerWrapper
      position="top-center"
      autoClose={3000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      draggable
      pauseOnHover
      closeButton={CloseButtonComponent}
    />
  );
};

const CloseButtonComponent = () => {
  return (
    <CloseButton>
      <MdClose />
    </CloseButton>
  );
};
