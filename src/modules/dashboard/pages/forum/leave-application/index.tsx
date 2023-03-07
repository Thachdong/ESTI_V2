import { Paper } from "@mui/material";
import React from "react";
import { LeaveApplycationTable } from "~modules-dashboard/components";

export const LeaveApplycationPage = () => {
  return (
    <Paper className="bgContainer">
      <LeaveApplycationTable refetch={() => undefined} />
    </Paper>
  );
};
