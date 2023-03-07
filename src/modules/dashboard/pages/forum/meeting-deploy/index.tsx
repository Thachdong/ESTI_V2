import { Box, Paper } from "@mui/material";
import React from "react";
import { AddButton } from "~modules-core/components";
import { MeetingDeloyTable } from "~modules-dashboard/components";

export const MeetingDeployPage = () => {
  const onCreateMeeting = () => {};

  return (
    <Paper className="bgContainer">
      <Box className="mb-3">
        <AddButton children="Tạo nhóm task" onClick={onCreateMeeting} />
      </Box>

      <MeetingDeloyTable refetch={() => undefined} />
    </Paper>
  );
};
