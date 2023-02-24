import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { exportWarehouse } from "src/api";
import {
  AddButton,
  DataTable,
  generatePaginationProps,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { deliveryColumns } from "~modules-dashboard/pages/orders/order-detail/data";

type TProps = {
  orderStatus: number;
  orderCode: string;
};

export const QuoteDetailDeliveryHistory: React.FC<TProps> = ({
  orderStatus,
  orderCode,
}) => {
  const router = useRouter();

  const [pagination, setPagination] = useState(defaultPagination);

  const { id } = router.query;

  // DATA FETCHING
  const {
    data: exportHistory,
    isLoading,
    isFetching,
  } = useQuery(
    ["ExportHistory", orderCode, { ...pagination }],
    () =>
      exportWarehouse
        .getList({ mainOrderCode: orderCode, ...pagination })
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        setPagination({ ...pagination, total: data.totalItem });
      },
      enabled: !!orderCode,
    }
  );

  const paginationProps = generatePaginationProps(pagination, setPagination);

  return (
    <Box className="flex flex-col">
      <Typography className="font-bold uppercase mb-3 text-sm">
        CẬP NHẬT ĐỢT GIAO HÀNG
      </Typography>

      <Box className="bg-white grid gap-4 rounded">
        <DataTable
          rows={
            exportHistory?.items?.map?.((item: any, index: number) => ({
              ...item,
              no: index + 1,
            })) || []
          }
          columns={deliveryColumns}
          hideSearchbar
          autoHeight
          gridProps={{
            loading: isLoading || isFetching,
            ...paginationProps,
          }}
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
