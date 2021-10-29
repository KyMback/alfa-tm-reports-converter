import { ContentWrapper, MainLayoutWrapper } from "modules/MainLayout/styles";
import { Header } from "modules/Header";
import { Footer } from "modules/Footer";
import { PropsWithChildren } from "react";
import { useRootStore } from "hooks/useRootStore";
import { Observer } from "mobx-react-lite";

export const MainLayout = ({ children }: PropsWithChildren<{}>) => {
  const { reports } = useRootStore();

  return (
    <MainLayoutWrapper>
      <Header />
      <ContentWrapper>{children}</ContentWrapper>
      <Observer>{() => (reports.reportParsed ? <Footer /> : null)}</Observer>
    </MainLayoutWrapper>
  );
};
