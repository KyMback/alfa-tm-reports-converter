import { ReactiveModal } from "components/ReactiveModal";
import { TextButton } from "components/buttons";
import { useRootStore } from "hooks/useRootStore";
import { ActionsWrapper, Description } from "modules/AppUpdateModal/styles";

export const AppUpdateModal = () => {
  const {
    serviceWorkerManager: { updateModalStore },
  } = useRootStore();

  const discard = () => updateModalStore.close(false);
  const reload = () => updateModalStore.close(true);

  return (
    <ReactiveModal title="Обновление" store={updateModalStore}>
      <Description>{"Доступна новая версия приложения. Обновить?"}</Description>
      <ActionsWrapper>
        <TextButton onClick={discard}>Отложить</TextButton>
        <TextButton onClick={reload}>Ок</TextButton>
      </ActionsWrapper>
    </ReactiveModal>
  );
};
