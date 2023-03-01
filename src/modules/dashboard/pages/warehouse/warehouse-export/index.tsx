import React from "react";
import { _format } from "~modules-core/utility/fomat";
import {
  WarehouseExportStatistical,
  WarehouseExportTable,
} from "~modules-dashboard/components";

export const WarehouseExportPage: React.FC = () => (
  <>
    {/* <WarehouseExportStatistical /> */}

    <WarehouseExportTable />
  </>
);
