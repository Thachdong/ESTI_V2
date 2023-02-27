import { Box, Button } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import RefreshIcon from "@mui/icons-material/Refresh";
import { productManage } from "src/api";
import {
  DataTable,
  generatePaginationProps,
  RefreshButton,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { productHistoryColumns } from "~modules-dashboard/pages/product-manage/search/data";

type TProps = {
  productId: string;
  warehouseId: string;
};

export const ProductManageHistoryTable: React.FC<TProps> = ({
  warehouseId,
  productId,
}) => {
  const [pagination, setPagination] = useState(defaultPagination);

  // DATA FETCHING
  const { data, refetch, isLoading, isFetching } = useQuery(
    [
      "product-history",
      {
        ...pagination,
        productId,
        warehouseId,
      },
    ],
    () =>
      productManage
        .historyList({
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          productId,
          warehouseConfigId: warehouseId,
        })
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        setPagination({ ...pagination, total: data.totalItem });
      },
      enabled: Boolean(productId),
    }
  );

  const paginationProps = generatePaginationProps(pagination, setPagination);

  return (
    <Box className="flex flex-col h-[50vh]">
      <Box className="flex items-center justify-end my-2">
        <RefreshButton onClick={() => refetch()} />
      </Box>

      <DataTable
        rows={data?.items as []}
        columns={productHistoryColumns}
        gridProps={{
          loading: isFetching || isLoading,
          ...paginationProps,
        }}
        hideSearchbar={true}
      />
    </Box>
  );
};
