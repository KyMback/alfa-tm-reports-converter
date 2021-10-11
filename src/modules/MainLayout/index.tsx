import { ContentWrapper, MainLayoutWrapper } from "modules/MainLayout/styles";
import { Header } from "modules/Header";
import { Footer } from "modules/Footer";
import { PropsWithChildren } from "react";
import { RootStore } from "stores/rootStore";
import { observer } from "mobx-react-lite";

interface Props {
  rootStore: RootStore;
}

export const MainLayout = observer(
  ({ children, rootStore }: PropsWithChildren<Props>) => {
    return (
      <MainLayoutWrapper>
        <Header rootStore={rootStore} />
        <ContentWrapper>{children}</ContentWrapper>
        {rootStore.reportParsed ? (
          <Footer dividendsStore={rootStore.dividendsStore} />
        ) : null}
      </MainLayoutWrapper>
    );
  },
);
