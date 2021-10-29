import { observer } from "mobx-react-lite";
import { useRootStore } from "hooks/useRootStore";
import { useTabletOrBelow } from "hooks/mediaQuery";
import { desktopColumns, mobileColumns } from "./columns";
import { ResponsiveTable } from "../styles";

export const DealsTable = observer(() => {
  const rootStore = useRootStore();
  const dealsTable = rootStore.ui.dealsTable;
  const isTabletOrBelow = useTabletOrBelow();

  return (
    <ResponsiveTable
      columns={isTabletOrBelow ? mobileColumns : desktopColumns}
      onRowSelected={dealsTable.setSelectedDealsIds}
      initialSelectedRowIds={dealsTable.selectedDealsIds}
      data={dealsTable.orderedDeals}
    />
  );
});
