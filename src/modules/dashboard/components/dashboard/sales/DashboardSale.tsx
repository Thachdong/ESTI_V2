import { Collapse, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { DashboardSaleChart } from "./DashboardSaleChart";
import { DashboardSaleCards } from "./DashboardSaleCards";

export const DashboardSale: React.FC = () => {
  const [collapse, setCollapse] = useState(true);

  return (
    <Box className="bg-white rounded-md shadow">
      <Typography
        onClick={() => setCollapse(!collapse)}
        component="h4"
        className="font-semibold p-4 h4 cursor-pointer border-0 border-b border-grey-3 border-solid"
      >
        Thông tin kinh doanh
      </Typography>

      <Collapse in={collapse} timeout="auto" className="p-4" unmountOnExit>
        <DashboardSaleCards />

        <DashboardSaleChart />
      </Collapse>
    </Box>
  );
};
