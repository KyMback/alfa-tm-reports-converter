import { DividendsTable } from "./internal/DividendsTable";
import { IntelinvestButton } from "./intelinvest/IntelinvestButton";
import { RootStoreContext } from "contexts/rootStoreContext";
import { RootStore } from "stores/rootStore";
import { Observer } from "mobx-react-lite";

const rootStore = new RootStore();

export const App = () => {
  return (
    <RootStoreContext.Provider value={rootStore}>
      <input
        type="file"
        onChange={async (value) => {
          const file = value.target.files?.[0];
          if (!file) {
            return;
          }

          await rootStore.parseReport(file);
        }}
      />
      <Observer>
        {() =>
          rootStore.reportParsed ? (
            <div>
              <div>
                <IntelinvestButton />
              </div>
              <DividendsTable />
            </div>
          ) : (
            <></>
          )
        }
      </Observer>
    </RootStoreContext.Provider>
  );
};
