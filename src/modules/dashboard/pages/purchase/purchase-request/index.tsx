import { useState } from "react";
import {
  PurchaseRequestStatistic,
  PurchaseRequestTable,
} from "~modules-dashboard/components";

export const PurchaseRequestPage = () => {
  const [ViewReport, setViewReport] = useState(false);
  return (
    <>
      {ViewReport ? <PurchaseRequestStatistic /> : null}

      <PurchaseRequestTable
        onViewReport={() => setViewReport(!ViewReport)}
        ViewReport={ViewReport}
      />
    </>
  );
};
