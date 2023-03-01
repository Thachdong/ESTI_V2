import { Box } from "@mui/material";
import { DocumentsDetails, DocumentsTable } from "~modules-public/components";

export const DocumentsPage: React.FC = () => {
  return (
    <Box className="max-w-[980px] w-full bg-white rounded-lg p-[40px] h-[70vh] overflow-y-auto">
      <DocumentsDetails />

      <DocumentsTable />
    </Box>
  );
};
