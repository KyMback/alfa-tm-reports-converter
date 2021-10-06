import {
  DownloadFormatsWrapper,
  FooterWrapper,
  Text,
} from "modules/Footer/styles";
import { Button } from "components/Button";
import { RootStore } from "stores/rootStore";

interface Props {
  rootStore: RootStore;
}

export const Footer = ({ rootStore }: Props) => {
  return (
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
