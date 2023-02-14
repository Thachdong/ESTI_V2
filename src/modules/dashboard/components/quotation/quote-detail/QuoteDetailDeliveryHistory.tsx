import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { AddButton, DataTable } from "~modules-core/components";
import { deliveryColumns } from "~modules-dashboard/pages/orders/order-detail/data";

type TProps = {
  orderStatus: number;
};

export const QuoteDetailDeliveryHistory: React.FC<TProps> = ({
  orderStatus,
}) => {
  const router = useRouter();

  const { id } = router.query;

  return (
    <Box className="flex flex-col">
      <Typography className="font-bold uppercase mb-3">
        CẬP NHẬT ĐỢT GIAO HÀNG
      </Typography>

      <Box className="bg-white grid gap-4 rounded-sm">
        <DataTable
          rows={[]}
          columns={deliveryColumns}
          autoHeight
          hideSearchbar
          hideFooter
        />
      </Box>

      {orderStatus === 2 && (
        <AddButton
          onClick={() =>
            router.push(`/dashboard/warehouse/export-detail?fromOrderId=${id}`)
          }
          className="max-w-[250px] ml-auto my-3 "
        >
          Tạo phiếu xuất kho
        </AddButton>
      )}
    </Box>
  );
};
