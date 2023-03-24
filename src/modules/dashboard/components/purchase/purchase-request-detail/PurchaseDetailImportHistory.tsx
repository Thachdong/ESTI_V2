import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { warehouse } from "src/api";
import {
  AddButton,
  DataTable,
  generatePaginationProps,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { purchaseDetailImportColumns } from "~modules-dashboard/pages/purchase/purchase-request-detail/data";

type TProps = {
  status: number;
};

export const PurchaseDetailImportHistory: React.FC<TProps> = ({ status }) => {
  const router = useRouter();

  const [pagination, setPagination] = useState(defaultPagination);

  const { id } = router.query;

  // DATA FETCHING
  const {
    data: importHistory,
    isLoading,
    isFetching,
  } = useQuery(
    ["ImportHistory", id, { ...pagination }],
    () =>
      warehouse
        .getList({ productOrderId: id, ...pagination })
        .then((res) => res.data),
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
        CẬP NHẬT ĐƠN NHẬP HÀNG
      </Typography>

      <Box className="bg-white grid gap-4 rounded">
        <DataTable
          rows={
            importHistory?.items?.map?.((item: any, index: number) => ({
              ...item,
              no: index + 1,
            })) || []
          }
          columns={purchaseDetailImportColumns}
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
              `/dashboard/warehouse/import-detail?fromPurchaseOrderId=${id}`
            )
          }
          className="max-w-[250px] ml-auto my-3 "
        >
          Tạo phiếu nhập kho
        </AddButton>
      )}
    </Box>
  );
};
