import { DividendsTable } from "modules/tables/DividendsTable";
import { Tabs } from "components/Tabs";
import { useState } from "react";
import { DealsTable } from "modules/tables/DealsTable";

const tabItems = [
  {
    title: "Сделки",
    Content: DealsTable,
  },
  {
    title: "Дивиденды",
    Content: DividendsTable,
  },
];

export const ReportInfoPage = () => {
  const [activeTab, setActiveTab] = useState(tabItems[0].title);

  return (
    <Tabs activeTabKey={activeTab} onChange={setActiveTab} tabs={tabItems} />
  );
};
