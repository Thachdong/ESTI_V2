import { useState } from "react";
import {
  CustomerCareStatistics,
  CustomerCareTable,
} from "~modules-dashboard/components/account/customer-care";

export const CustomerCarePage: React.FC = () => {
  const [viewReport, setViewReport] = useState(false);

  return (
    <>
      {viewReport && <CustomerCareStatistics />}

      <CustomerCareTable
        onViewReport={() => setViewReport(!viewReport)}
        viewReport={viewReport}
      />
    </>
  );
};
