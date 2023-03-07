import React, { useState } from "react";
import { _format } from "~modules-core/utility/fomat";
import {
  WarehouseExportStatistical,
  WarehouseExportTable,
} from "~modules-dashboard/components";

export const WarehouseExportPage: React.FC = () => {
  const [ViewReport, setViewReport] = useState(false);
  return (
    <>
      {ViewReport ? <WarehouseExportStatistical /> : null}

      <WarehouseExportTable
        onViewReport={() => setViewReport(!ViewReport)}
        ViewReport={ViewReport}
      />
    </>
  );
};
