import { Box } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { position } from "src/api";
import {
  DataTable,
  generatePaginationProps,
  RefreshButton,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { positionColumns, productHistoryColumns } from "~modules-dashboard/pages/product-manage/search/data";

type TProps = {
  productCode: string;
  warehouseConfigCode: string;
};

export const ProductManagePositionTable: React.FC<TProps> = ({
  warehouseConfigCode,
  productCode,
}) => {
  const [pagination, setPagination] = useState(defaultPagination);
  
  // DATA FETCHING
  const { data, refetch, isLoading, isFetching } = useQuery(
    [
      "PositionList",
      {
        ...pagination,
        productCode,
        warehouseConfigCode,
      },
    ],
    () =>
      position
        .getPositionByProduct({
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          productCode,
          warehouseConfigCode,
        })
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        setPagination({ ...pagination, total: data.totalItem });
      },
      enabled: !!productCode && !!warehouseConfigCode,
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
        columns={positionColumns}
        gridProps={{
          loading: isFetching || isLoading,
          ...paginationProps,
        }}
        hideSearchbar={true}
      />
    </Box>
  );
};
