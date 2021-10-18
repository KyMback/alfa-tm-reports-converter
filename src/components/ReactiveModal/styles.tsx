import styled from "styled-components";
import ReactModal from "react-modal";
import { PropsWithChildren } from "react";
import { lessOrEqualTo, moreOrEqualTo, themeColor } from "styles/helpers";

function ReactModalAdapter({
  className,
  ...props
}: Omit<
  PropsWithChildren<ReactModal.Props>,
  "portalClassName" | "overlayClassName"
> & {
  className?: string;
}) {
  return (
    <ReactModal
      portalClassName={className}
      overlayClassName="__"
      className="__"
      {...props}
    />
  );
}

export const ModalPortal = styled(ReactModalAdapter)`
  .ReactModal__Overlay {
    transition: opacity 0.2s;
    opacity: 0;
    z-index: 150;
    position: fixed;
    inset: 0;
    background: ${themeColor("overlay")};
  }

  .ReactModal__Overlay--after-open {
    opacity: 1;
  }
`;

export const Modal = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;

  display: flex;
  flex-direction: column;

  min-width: 300px;

  @media (${lessOrEqualTo.mobileM}) {
    min-width: 230px;
  }

  @media (${moreOrEqualTo.mobileL}) {
    min-width: 300px;
  }

  @media (${moreOrEqualTo.tablet}) {
    min-width: 450px;
  }

  padding: 15px 20px;

  background: ${themeColor("surface")};
  border-radius: 20px;
`;

export const ModalBodyWrapper = styled.div``;

export const ModalHeaderWrapper = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 15px;
`;

export const Title = styled.span`
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  margin-right: 30px;
`;

export const ModalCloseIconButton = styled.button`
  padding: 0;

  border: none;
  background: transparent;

  font-size: 30px;
  line-height: 0;
`;
