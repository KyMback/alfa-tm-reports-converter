import { ContentWrapper, MainLayoutWrapper } from "modules/MainLayout/styles";
import { Header } from "modules/Header";
import { Footer } from "modules/Footer";
import { PropsWithChildren } from "react";
import { observer } from "mobx-react-lite";
import { useRootStore } from "hooks/useRootStore";

export const MainLayout = observer(({ children }: PropsWithChildren<{}>) => {
  const rootStore = useRootStore();

  return (
    <MainLayoutWrapper>
      <Header />
      <ContentWrapper>{children}</ContentWrapper>
      {rootStore.reportParsed ? <Footer /> : null}
    </MainLayoutWrapper>
  );
});
