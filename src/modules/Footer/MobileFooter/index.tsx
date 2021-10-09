import { HiOutlineDownload } from "react-icons/hi";
import {
  BaseReactiveModalStore,
  ReactiveModal,
} from "components/ReactiveModal";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { FormatsWrapper, MobileFooterButton } from "./styles";
import { Button } from "components/Button";
import { DividendsStore } from "stores/dividendsStore";

interface Props {
  dividendsStore: DividendsStore;
}

export const MobileFooter = observer(({ dividendsStore }: Props) => {
  const [reactiveModalStore] = useState(
    new BaseReactiveModalStore<string>("Выберите формат для скачивания:"),
  );

  return (
    <MobileFooterButton>
      <HiOutlineDownload onClick={reactiveModalStore.open} />
      <ReactiveModal store={reactiveModalStore}>
        <FormatsWrapper>
          <Button
            onClick={() => {
              dividendsStore.downloadIntelinvest();
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
