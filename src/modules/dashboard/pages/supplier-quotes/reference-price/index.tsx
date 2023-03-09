import { useState } from "react";
import {
  ReferencePriceStatistic,
  ReferencePriceTable,
} from "~modules-dashboard/components";

export const ReferencePricePage: React.FC = () => {
  const [viewReport, setViewReport] = useState(false);
  return (
    <>
      {viewReport && <ReferencePriceStatistic />}

      <ReferencePriceTable
        viewReport={viewReport}
        onViewReport={() => setViewReport(!viewReport)}
      />
    </>
  );
};