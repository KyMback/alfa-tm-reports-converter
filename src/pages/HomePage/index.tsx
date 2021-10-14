import { useRootStore } from "hooks/useRootStore";
import {
  AttachButton,
  ContentWrapper,
  DropZone,
  Image,
  InfoWrapper,
  MainContentWrapper,
  MoreInfoButton,
} from "pages/HomePage/styles";
import { useDropzone } from "react-dropzone";
import { emptyFunction } from "utils/functions";
import { ImAttachment } from "react-icons/im";
import { Reports } from "constants/reports";
import homeImage from "../../../assets/images/home_image.svg";
import { useLaptopOrAbove } from "hooks/mediaQuery";
import { General } from "constants/general";

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
    <>
      <ContentWrapper>
        {isLaptopOrAbove ? (
          <DropZone {...getRootProps()} onClick={emptyFunction}>
            {"Перенесите .XLSX-файл для его конвертации"}
          </DropZone>
        ) : null}
        <MainContentWrapper>
          <Image src={homeImage} alt="Лейбл сайта" />
          <InfoWrapper>
            {
              "Здесь Вы можете конвертировать отчёты доверительного управления Альфа-Банка Беларуси в удобный вам формат."
            }
          </InfoWrapper>
          <MoreInfoButton onClick={() => window.open(General.repositoryPath)}>
            {"О приложении"}
          </MoreInfoButton>
          <AttachButton onClick={open}>
            <ImAttachment />
            {"Прикрепить файл"}
          </AttachButton>
        </MainContentWrapper>
      </ContentWrapper>
      <input {...getInputProps()} />
    </>
  );
};
