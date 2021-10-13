import { DividendsTable } from "modules/DividendsTable";
import { MainLayout } from "modules/MainLayout";
import { Tabs } from "components/Tabs";
import { useState } from "react";

const tabItems = [
  {
    title: "Дивиденды",
    Content: DividendsTable,
  },
];

export const ReportInfoPage = () => {
  const [activeTab, setActiveTab] = useState(tabItems[0].title);

  return (
    <MainLayout>
      <Tabs activeTabKey={activeTab} onChange={setActiveTab} tabs={tabItems} />
    </MainLayout>
  );
};
