import { useRootStore } from "hooks/useRootStore";
import {
  AttachButton,
  ContentWrapper,
  DropZone,
  HomeContentLayout,
  Image,
  InfoWrapper,
  MainContentWrapper,
} from "pages/HomePage/styles";
import { useDropzone } from "react-dropzone";
import { emptyFunction } from "utils/functions";
import { ImAttachment } from "react-icons/im";
import { HomeHeader } from "modules/headers/HomeHeader";

export const HomePage = () => {
  const rootStore = useRootStore();
  const { getInputProps, getRootProps, open } = useDropzone({
    accept: ".xlsx",
    multiple: false,
    onDrop: async (files) => {
      if (files.length == 0) {
        return;
      }
      await rootStore.parseReport(files[0]);
    },
  });

  return (
    <>
      <HomeHeader />
      <HomeContentLayout>
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
      </HomeContentLayout>
    </>
  );
};
