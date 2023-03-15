import { Collapse, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { DashboardWarehouseCards } from "./DashboardWarehouseCards";
import { DashboardWarehouseChart } from "./DashboardWarehouseChart";
import { DashboardWarehouseTable } from "./DashboardWarehouseTable";

export const DashboardWarehouse: React.FC = () => {
  const [collapse, setCollapse] = useState(true);

  return (
    <Box className="bg-white rounded-md shadow">
      <Typography
        onClick={() => setCollapse(!collapse)}
        component="h4"
        className="font-semibold p-4 h4 cursor-pointer border-0 border-b border-grey-3 border-solid"
      >
        Thông tin hàng hóa
      </Typography>

      <Collapse in={collapse} timeout="auto" className="p-4" unmountOnExit>
        <Box className="grid gap-4">
          <DashboardWarehouseCards />

          <DashboardWarehouseChart />

          <DashboardWarehouseTable />
        </Box>
      </Collapse>
    </Box>
  );
};
