import { observer } from "mobx-react-lite";
import { useRootStore } from "hooks/useRootStore";
import { useTabletOrBelow } from "hooks/mediaQuery";
import { desktopColumns, mobileColumns } from "./columns";
import { ResponsiveTable } from "../styles";

export const DealsTable = observer(() => {
  const { dealsStore } = useRootStore();
  const isTabletOrBelow = useTabletOrBelow();

  return (
    <ResponsiveTable
      columns={isTabletOrBelow ? mobileColumns : desktopColumns}
      onRowSelected={dealsStore.setSelectedDealsIds}
      initialSelectedRowIds={dealsStore.selectedDealsIds}
      data={dealsStore.deals}
    />
  );
});
