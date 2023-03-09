import { Box, Paper } from "@mui/material";
import React from "react";
import { AddButton } from "~modules-core/components";
import { TransactionListTable } from "~modules-dashboard/components";

export const TransactionPage = () => {
  const onCreateAccount = () => {};

  return (
    <Paper className="bgContainer">
      <Box className="mb-3">
        <AddButton children="Tạo giao dịch" onClick={onCreateAccount} />
      </Box>

      <TransactionListTable
        refetch={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </Paper>
  );
};
