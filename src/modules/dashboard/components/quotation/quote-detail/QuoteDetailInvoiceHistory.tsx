import { Box, Typography } from "@mui/material";
import { AddButton, DataTable } from "~modules-core/components";
import { invoiceColumns } from "~modules-dashboard/pages/orders/order-detail/data";

export const QuoteDetailInvoiceHistory: React.FC = () => {
  return (
    <Box className="flex flex-col">
      <Typography className="font-bold uppercase mb-3">
        CẬP NHẬT HOÁ ĐƠN
      </Typography>

      <Box className="bg-white grid gap-4 rounded-sm flex-grow">
        <DataTable
          rows={[]}
          columns={invoiceColumns}
          autoHeight
          hideSearchbar
          hideFooter
        />
      </Box>

      <AddButton className="max-w-[250px] ml-auto my-3">Tạo hóa đơn</AddButton>
    </Box>
  );
};
