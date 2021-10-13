import { RootStoreContext } from "contexts/rootStoreContext";
import { RootStore } from "stores/rootStore";
import { Observer } from "mobx-react-lite";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "styles/themes";
import { GlobalStyle } from "styles/GlobalStyle";
import { HomePage } from "pages/HomePage";
import { ReportInfoPage } from "pages/ReportInfoPage";
import { NotificationsContainer } from "modules/NotificationsContainer";
import { MainLayout } from "modules/MainLayout";

const rootStore = new RootStore();

export const App = () => {
  return (
    <RootStoreContext.Provider value={rootStore}>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <MainLayout>
          <Observer>
            {() => (rootStore.reportParsed ? <ReportInfoPage /> : <HomePage />)}
          </Observer>
        </MainLayout>
        <NotificationsContainer />
      </ThemeProvider>
    </RootStoreContext.Provider>
  );
};
