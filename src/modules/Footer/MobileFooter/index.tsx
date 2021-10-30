import { HiOutlineDownload } from "react-icons/hi";
import {
  BaseReactiveModalStore,
  ReactiveModal,
} from "components/ReactiveModal";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { FormatsWrapper, MobileFooterButton } from "./styles";
import { Button } from "components/buttons";
import { useRootStore } from "hooks/useRootStore";

export const MobileFooter = observer(() => {
  const { ui } = useRootStore();
  const [reactiveModalStore] = useState(new BaseReactiveModalStore<string>());

  return (
    <MobileFooterButton>
      <HiOutlineDownload onClick={reactiveModalStore.open} />
      <ReactiveModal
        title="Выберите формат для скачивания:"
        store={reactiveModalStore}
      >
        <FormatsWrapper>
          <Button
            onClick={() => {
              ui.downloadFormats.downloadIntelinvest();
              reactiveModalStore.close();
            }}
          >
            {".IntelInvest"}
          </Button>
        </FormatsWrapper>
      </ReactiveModal>
    </MobileFooterButton>
  );
});
