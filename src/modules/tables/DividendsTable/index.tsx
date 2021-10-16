import { observer } from "mobx-react-lite";
import {
  desktopColumns,
  mobileColumns,
} from "modules/tables/DividendsTable/columns";
import { useTabletOrBelow } from "hooks/mediaQuery";
import { useRootStore } from "hooks/useRootStore";
import { ResponsiveTable } from "modules/tables/styles";

export const DividendsTable = observer(() => {
  const { dividendsStore } = useRootStore();
  const isTabletOrBelow = useTabletOrBelow();

  return (
    <ResponsiveTable
      columns={isTabletOrBelow ? mobileColumns : desktopColumns}
      data={dividendsStore.dividends}
      initialSelectedRowIds={dividendsStore.selectedDividendIds}
      onRowSelected={dividendsStore.setSelectedDividendIds}
    />
  );
});
