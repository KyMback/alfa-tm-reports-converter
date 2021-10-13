import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import { lessOrEqualTo, moreOrEqualTo, themeColor } from "styles/helpers";

export const NotificationContainerWrapper = styled(ToastContainer)`
  @media (${moreOrEqualTo.laptop}) {
    width: 520px;
  }

  .Toastify__toast {
    min-height: auto;

    padding: 26px 30px;

    box-shadow: 0 10px 30px ${themeColor("shadow")};
    border-radius: 10px;

    font-family: ${(props) => props.theme.font};
    font-weight: bold;
    font-size: 14px;
    line-height: 200%;

    @media (${lessOrEqualTo.mobileL}) {
      line-height: 1.3em;
    }
  }

  .Toastify__toast-body {
    padding: 0;
    margin: 0;
  }

  .Toastify__toast--default {
    background: ${themeColor("surface")};
    color: ${themeColor("onSurface")};
  }

  .Toastify__toast--error {
    background: ${themeColor("error")};
    color: ${themeColor("onError")};
  }

  .Toastify__toast--success {
    background: ${themeColor("success")};
    color: ${themeColor("onSuccess")};
  }
`;

export const CloseButton = styled.button`
  padding: 0;

  cursor: pointer;

  color: inherit;
  background: transparent;
  border: unset;

  font-size: 20px;
  line-height: 0;
`;
