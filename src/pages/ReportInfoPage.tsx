import { ContentLayout } from "modules/layouts/ContentLayout";
import { IntelinvestButton } from "../intelinvest/IntelinvestButton";
import { DividendsTable } from "../internal/DividendsTable";

export const ReportInfoPage = () => {
  return (
    <ContentLayout>
      <div>
        <IntelinvestButton />
      </div>
      <DividendsTable />
    </ContentLayout>
  );
};
