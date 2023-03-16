import { Box } from "@mui/material";
import {
  DashboardFinance,
  DashboardSale,
  DashboardWarehouse,
} from "~modules-dashboard/components/dashboard";

export const DashboardPage: React.FC = () => {
  return (
    <Box className="container-center grid gap-4">
      <DashboardSale />

      <DashboardWarehouse />

      <DashboardFinance />
    </Box>
  );
};
