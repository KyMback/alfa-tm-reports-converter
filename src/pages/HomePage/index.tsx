import { useRootStore } from "hooks/useRootStore";
import {
  AttachButton,
  ContentWrapper,
  DropZone,
  Image,
  InfoWrapper,
  MainContentWrapper,
} from "pages/HomePage/styles";
import { useDropzone } from "react-dropzone";
import { emptyFunction } from "utils/functions";
import { ImAttachment } from "react-icons/im";
import { Reports } from "constants/reports";
import { MainLayout } from "modules/layouts/MainLayout";

export const HomePage = () => {
  const rootStore = useRootStore();
  const { getInputProps, getRootProps, open } = useDropzone({
    ...Reports.filesRestrictions,
    onDrop: async (files) => {
      if (files.length == 0) {
        return;
      }
      await rootStore.parseReport(files[0]);
    },
  });

  return (
    <MainLayout rootStore={rootStore}>
      <ContentWrapper>
        <DropZone {...getRootProps()} onClick={emptyFunction}>
          {"Перенесите .XlSX-файл для его конвертации"}
          <input {...getInputProps()} />
        </DropZone>
        <MainContentWrapper>
          <Image />
          <InfoWrapper>
            {`Здесь Вы можете конвертировать отчеты доверительного управления Аlfa-банка в удобный Вам формат (IntelInvest).`}
          </InfoWrapper>
          <AttachButton onClick={open}>
            <ImAttachment />
            {"Прикрепить файл"}
          </AttachButton>
        </MainContentWrapper>
      </ContentWrapper>
    </MainLayout>
  );
};
