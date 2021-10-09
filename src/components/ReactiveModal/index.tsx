import { PropsWithChildren, useCallback, useEffect } from "react";
import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react-lite";
import {
  ModalBodyWrapper,
  ModalPortal,
  ModalHeaderWrapper,
  Modal,
  ModalCloseIconButton,
  Title,
} from "components/ReactiveModal/styles";

import { MdClose } from "react-icons/md";

interface Props<TData> {
  store: BaseReactiveModalStore<TData>;
}

export const ReactiveModal = observer(function <TData>({
  store,
  children,
}: PropsWithChildren<Props<TData>>) {
  const close = useCallback(() => store.close(), [store]);
  useEffect(() => () => store.dispose(), [store]);

  return (
    <ModalPortal
      isOpen={store.isOpen}
      shouldReturnFocusAfterClose
      shouldCloseOnOverlayClick
      shouldFocusAfterRender
      shouldCloseOnEsc
      onRequestClose={close}
    >
      <Modal>
        <ModalHeaderWrapper>
          <Title>{store.title}</Title>
          <ModalCloseIconButton onClick={close}>
            <MdClose />
          </ModalCloseIconButton>
        </ModalHeaderWrapper>
        <ModalBodyWrapper>{children}</ModalBodyWrapper>
      </Modal>
    </ModalPortal>
  );
});

export class BaseReactiveModalStore<TData> {
  public isOpen = false;
  private resolve?: (data?: TData) => void;

  constructor(public title: string) {
    makeObservable(this, {
      isOpen: observable,
      title: observable,
      close: action,
      open: action,
    });
  }

  public open = (): Promise<TData | undefined> => {
    this.isOpen = true;
    return new Promise<TData | undefined>((resolve) => {
      this.resolve = resolve;
    });
  };

  public close = (data?: TData) => {
    this.isOpen = false;
    this.resolve?.(data);
    this.resolve = undefined;
  };

  public dispose = () => {
    this.isOpen = false;
    this.resolve?.();
    this.resolve = undefined;
  };
}
