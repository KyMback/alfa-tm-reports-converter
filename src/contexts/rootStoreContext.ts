import { createContext } from "react";
import { RootStore } from "stores/rootStore";

export const RootStoreContext = createContext<RootStore | null>(null);
