import {
  DownloadFormatsWrapper,
  FooterWrapper,
  Text,
} from "modules/Footer/styles";
import { Button } from "components/Button";
import { useTabletOrBelow } from "hooks/mediaQuery";
import { MobileFooter } from "modules/Footer/MobileFooter";
import { DividendsStore } from "stores/dividendsStore";

interface Props {
  dividendsStore: DividendsStore;
}

export const Footer = ({ dividendsStore }: Props) => {
  const isTabletOrBelow = useTabletOrBelow();

  return isTabletOrBelow ? (
    <MobileFooter dividendsStore={dividendsStore} />
  ) : (
    <FooterWrapper>
      <DownloadFormatsWrapper>
        <Text>{"Выберите формат для скачивания:"}</Text>
        <Button onClick={dividendsStore.downloadIntelinvest}>
          {".IntelInvest"}
        </Button>
      </DownloadFormatsWrapper>
    </FooterWrapper>
  );
};
