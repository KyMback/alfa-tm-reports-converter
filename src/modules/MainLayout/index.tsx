import { ContentWrapper, MainLayoutWrapper } from "modules/MainLayout/styles";
import { Header } from "modules/Header";
import { Footer } from "modules/Footer";
import { PropsWithChildren } from "react";
// import { observer } from "mobx-react-lite";
import { useRootStore } from "hooks/useRootStore";
import { Observer } from "mobx-react-lite";

export const MainLayout = ({ children }: PropsWithChildren<{}>) => {
  const rootStore = useRootStore();

  return (
    <MainLayoutWrapper>
      <Header />
      <ContentWrapper>{children}</ContentWrapper>
      <Observer>{() => (rootStore.reportParsed ? <Footer /> : null)}</Observer>
    </MainLayoutWrapper>
  );
};
