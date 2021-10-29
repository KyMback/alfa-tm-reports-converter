import { observer } from "mobx-react-lite";
import {
  desktopColumns,
  mobileColumns,
} from "modules/tables/DividendsTable/columns";
import { useTabletOrBelow } from "hooks/mediaQuery";
import { useRootStore } from "hooks/useRootStore";
import { ResponsiveTable } from "modules/tables/styles";

export const DividendsTable = observer(() => {
  const rootStore = useRootStore();
  const dividendsTable = rootStore.ui.dividendsTable;
  const isTabletOrBelow = useTabletOrBelow();

  return (
    <ResponsiveTable
      columns={isTabletOrBelow ? mobileColumns : desktopColumns}
      data={dividendsTable.orderedDividends}
      initialSelectedRowIds={dividendsTable.selectedDividendIds}
      onRowSelected={dividendsTable.setSelectedDividendIds}
    />
  );
});
