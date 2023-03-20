import { Box } from "@mui/material";
import React, { useState } from "react";
import {
  QuoteRequestHeader,
  QuoteRequestTable,
} from "~modules-dashboard/components";

export const QuoteListPage = () => {
  const [viewReport, setViewReport] = useState(false);

  return (
    <>
      {viewReport && <QuoteRequestHeader />}

      <QuoteRequestTable
        onViewReport={() => setViewReport(!viewReport)}
        viewReport={viewReport}
      />
    </>
  );
};
