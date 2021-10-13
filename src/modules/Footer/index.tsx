import {
  DownloadFormatsWrapper,
  FooterWrapper,
  Text,
} from "modules/Footer/styles";
import { Button } from "components/buttons";
import { useTabletOrBelow } from "hooks/mediaQuery";
import { MobileFooter } from "modules/Footer/MobileFooter";
import { useRootStore } from "hooks/useRootStore";

export const Footer = () => {
  const rootStore = useRootStore();
  const isTabletOrBelow = useTabletOrBelow();

  return isTabletOrBelow ? (
    <MobileFooter />
  ) : (
    <FooterWrapper>
      <DownloadFormatsWrapper>
        <Text>{"Выберите формат для скачивания:"}</Text>
        <Button onClick={rootStore.downloadIntelinvest}>
          {".IntelInvest"}
        </Button>
      </DownloadFormatsWrapper>
    </FooterWrapper>
  );
};
