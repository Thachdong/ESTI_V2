import { Box, Typography } from "@mui/material";
import { AddButton, DataTable } from "~modules-core/components";
import { deliveryColumns } from "~modules-dashboard/pages/orders/order-detail/data";

export const QuoteDetailDeliveryHistory: React.FC = () => {

  return (
    <Box className="flex flex-col">
      <Typography className="font-bold uppercase mb-3">
        CẬP NHẬT ĐỢT GIAO HÀNG
      </Typography>

      <Box className="bg-white grid gap-4 rounded-sm">
        <DataTable rows={[]} columns={deliveryColumns} autoHeight hideSearchbar hideFooter />
      </Box>

      <AddButton className="max-w-[250px] ml-auto my-3 ">Tạo phiếu xuất kho</AddButton>
    </Box>
  );
};
