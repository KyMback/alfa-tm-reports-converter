import { useRootStore } from "hooks/useRootStore";

export const IntelinvestButton = () => {
  const rootStore = useRootStore();

  return (
    <button onClick={rootStore.downloadIntelinvestDividends}>
      Download Intelinvest import file
    </button>
  );
};
