import { Box } from "@mui/material";
import {
  CustomerCareStatistics,
  CustomerCareTable,
} from "~modules-dashboard/components/account/customer-care";

export const CustomerCarePage: React.FC = () => {
  return (
    <Box>
      <CustomerCareStatistics />

      <CustomerCareTable />
    </Box>
  );
};
