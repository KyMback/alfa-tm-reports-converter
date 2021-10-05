import { useContext } from "react";
import { RootStoreContext } from "contexts/rootStoreContext";

export const useRootStore = () => {
  const rootStore = useContext(RootStoreContext);

  if (rootStore == null) {
    throw new Error("Missed root store");
  }

  return rootStore;
};
