import { Box } from "@mui/material";
import React, {  } from "react";
import { _format } from "~modules-core/utility/fomat";
import { BillListStatistic, BillListTable } from "~modules-dashboard/components";

export const BillListPage: React.FC = () => {
  return (
    <Box className="flex flex-col h-full">
      <BillListStatistic />

      <BillListTable />
    </Box>
  );
};
