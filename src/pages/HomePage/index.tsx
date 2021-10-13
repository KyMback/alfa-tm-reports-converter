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
import { MainLayout } from "modules/MainLayout";
import homeImage from "../../../assets/images/home_image.png";
import { useLaptopOrAbove } from "hooks/mediaQuery";

export const HomePage = () => {
  const isLaptopOrAbove = useLaptopOrAbove();
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
    <MainLayout>
      <ContentWrapper>
        {isLaptopOrAbove ? (
          <DropZone {...getRootProps()} onClick={emptyFunction}>
            {"Перенесите .XlSX-файл для его конвертации"}
          </DropZone>
        ) : null}
        <MainContentWrapper>
          <Image src={homeImage} alt="Лейбл сайта" />
          <InfoWrapper>
            {
              "Здесь Вы можете конвертировать отчеты доверительного управления Альфа-Банка в удобный вам формат."
            }
          </InfoWrapper>
          <AttachButton onClick={open}>
            <ImAttachment />
            {"Прикрепить файл"}
          </AttachButton>
        </MainContentWrapper>
      </ContentWrapper>
      <input {...getInputProps()} />
    </MainLayout>
  );
};
