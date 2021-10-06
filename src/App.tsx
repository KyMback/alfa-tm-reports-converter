import { RootStoreContext } from "contexts/rootStoreContext";
import { RootStore } from "stores/rootStore";
import { Observer } from "mobx-react-lite";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "styles/themes";
import { GlobalStyle } from "styles/GlobalStyle";
import { HomePage } from "pages/HomePage";
import { ReportInfoPage } from "pages/ReportInfoPage";

const rootStore = new RootStore();

export const App = () => {
  return (
    <RootStoreContext.Provider value={rootStore}>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <Observer>
          {() => (rootStore.reportParsed ? <ReportInfoPage /> : <HomePage />)}
        </Observer>
      </ThemeProvider>
    </RootStoreContext.Provider>
  );
};
