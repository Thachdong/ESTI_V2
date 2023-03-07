import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { bill } from "src/api";
import {
  AddButton,
  DataTable,
  generatePaginationProps,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { invoiceColumns } from "~modules-dashboard/pages/orders/order-detail/data";

type TProps = {
  orderStatus: number;
  orderCode: string;
};

export const QuoteDetailInvoiceHistory: React.FC<TProps> = ({
  orderStatus,
  orderCode,
}) => {
  const router = useRouter();

  const { id } = router.query;

  const [pagination, setPagination] = useState(defaultPagination);

  // DATA FETCHING
  const {
    data: billHistory,
    isLoading,
    isFetching,
  } = useQuery(
    ["InvoiceHistory", orderCode, { ...pagination }],
    () =>
      bill.getList({ mainOrderId: id, ...pagination }).then((res) => res.data),
    {
      onSuccess: (data) => {
        setPagination({ ...pagination, total: data.totalItem });
      },
      enabled: !!id,
    }
  );

  const paginationProps = generatePaginationProps(pagination, setPagination);

  return (
    <Box className="flex flex-col">
      <Typography className="font-bold uppercase mb-3 text-sm">
        CẬP NHẬT HOÁ ĐƠN
      </Typography>

      <Box className="bg-white grid gap-3 rounded flex-grow">
        <DataTable
          rows={
            billHistory?.items?.map?.((bill: any, index: number) => ({
              ...bill,
              no: index + 1,
            })) || []
          }
          columns={invoiceColumns}
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
            router.push(`/dashboard/orders/bill-detail?fromOrderId=${id}`)
          }
          className="max-w-[250px] ml-auto my-3 "
        >
          Tạo hóa đơn
        </AddButton>
      )}
    </Box>
  );
};
