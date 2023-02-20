import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { purchaseOrderBill } from "src/api/purchase-order-bill";
import {
  AddButton,
  DataTable,
  generatePaginationProps,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { purchaseDetailBillColumns } from "~modules-dashboard/pages/purchase/purchase-request-detail/data";

type TProps = {
  status: number;
  purchaseCode: string;
};

export const PurchaseDetailBillHistory: React.FC<TProps> = ({ status, purchaseCode }) => {
  const router = useRouter();

  const [pagination, setPagination] = useState(defaultPagination);

  const { id } = router.query;

  // DATA FETCHING
  const {
    data: billHistory,
    isLoading,
    isFetching,
  } = useQuery(
    ["billHistory", purchaseCode, { ...pagination }],
    () =>
      purchaseOrderBill
        .getList({ productOrderCode: purchaseCode, ...pagination })
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        setPagination({ ...pagination, total: data.totalItem });
      },
      enabled: !!purchaseCode,
    }
  );

  const paginationProps = generatePaginationProps(pagination, setPagination);

  return (
    <Box className="flex flex-col">
      <Typography className="font-bold uppercase mb-3">
        CẬP NHẬT ĐƠN HÓA ĐƠN THANH TOÁN
      </Typography>

      <Box className="bg-white grid gap-4 rounded-sm">
        <DataTable
          rows={
            billHistory?.items?.map?.((item: any, index: number) => ({
              ...item,
              no: index + 1,
            })) || []
          }
          columns={purchaseDetailBillColumns}
          hideSearchbar
          autoHeight
          gridProps={{
            loading: isLoading || isFetching,
            ...paginationProps,
          }}
        />
      </Box>

      {status === 2 && (
        <AddButton
          onClick={() =>
            router.push(
              `/dashboard/purchase/purchase-bill-detail?fromPurchaseOrderId=${id}`
            )
          }
          className="max-w-[250px] ml-auto my-3 "
        >
          Tạo hóa đơn
        </AddButton>
      )}
    </Box>
  );
};
