import { Box } from "@mui/material";
import React, { useState } from "react";
import { _format } from "~modules-core/utility/fomat";
import {
  BillListStatistic,
  BillListTable,
} from "~modules-dashboard/components";

export const BillListPage: React.FC = () => {
  const [ViewReport, setViewReport] = useState(false);
  return (
    <Box className="flex flex-col h-[calc(100vh + 200px)] xl:h-full">
      {ViewReport ? <BillListStatistic /> : null}

      <BillListTable
        onViewReport={() => setViewReport(!ViewReport)}
        ViewReport={ViewReport}
      />
    </Box>
  );
};
