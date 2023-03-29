import { Box } from "@mui/material";
import {
  CustomerDetailBasic,
  CustomerDetailCharacteristics,
  CustomerDetailCompetitor,
  CustomerDetailDemand,
  CustomerDetailOpinion,
  CustomerDetailOrder,
  CustomerDetailStatisticChart,
} from "~modules-dashboard/components";

export const CustomerDetailPage: React.FC = () => {
  return (
    <Box className="container-center">
      <CustomerDetailBasic />

      <hr />

      <CustomerDetailDemand />

      <hr />

      <CustomerDetailCompetitor />

      <hr />

      <CustomerDetailOpinion />

      <hr />

      <CustomerDetailCharacteristics />

      <hr />

      <CustomerDetailOrder />

      <hr />

      <CustomerDetailStatisticChart />
    </Box>
  );
};
