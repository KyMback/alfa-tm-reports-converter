import { DividendsTable } from "../../internal/DividendsTable";
import { MainLayout } from "modules/layouts/MainLayout";
import { useRootStore } from "hooks/useRootStore";

export const ReportInfoPage = () => {
  const rootStore = useRootStore();

  return (
    <MainLayout rootStore={rootStore}>
      <DividendsTable />
    </MainLayout>
  );
};
