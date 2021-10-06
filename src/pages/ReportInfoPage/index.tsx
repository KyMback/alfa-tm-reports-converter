import { DividendsTable } from "modules/DividendsTable";
import { MainLayout } from "modules/layouts/MainLayout";
import { useRootStore } from "hooks/useRootStore";
import { Tabs } from "components/Tabs";
import { useState } from "react";

const tabItems = [
  {
    title: "Дивиденды",
    Content: () => {
      const { dividendsStore } = useRootStore();
      return <DividendsTable dividendsStore={dividendsStore} />;
    },
  },
];

export const ReportInfoPage = () => {
  const rootStore = useRootStore();
  const [activeTab, setActiveTab] = useState(tabItems[0].title);

  return (
    <MainLayout rootStore={rootStore}>
      <Tabs activeTabKey={activeTab} onChange={setActiveTab} tabs={tabItems} />
    </MainLayout>
  );
};
