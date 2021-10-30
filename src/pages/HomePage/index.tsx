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
import homeImage from "assets/images/home_image.svg";
import { useLaptopOrAbove } from "hooks/mediaQuery";
import { useState } from "react";
import { HomePageStore } from "pages/HomePage/homePageStore";

export const HomePage = () => {
  const isLaptopOrAbove = useLaptopOrAbove();
  const rootStore = useRootStore();
  const [store] = useState(new HomePageStore(rootStore));
  const { getInputProps, getRootProps, open } = useDropzone({
    ...Reports.filesRestrictions,
    onDrop: store.loadReport,
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
          <MoreInfoButton onClick={store.openMoreInfoPage}>
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
