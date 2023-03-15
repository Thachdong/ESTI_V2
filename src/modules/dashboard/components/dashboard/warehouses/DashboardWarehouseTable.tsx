import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { dashboard } from "src/api";
import {
  DataTable,
  generatePaginationProps,
  SearchBox,
} from "~modules-core/components";
import { defaultBranchId, defaultPagination } from "~modules-core/constance";
import { productColumns } from "./data";

export const DashboardWarehouseTable: React.FC = () => {
  const { branchId = defaultBranchId } = useRouter().query;

  const [searchContent, setSearchContent] = useState("");

  const [pagination, setPagination] = useState({
    ...defaultPagination,
    pageSize: 5,
  });

  const { data } = useQuery(
    ["ProductStatistic", branchId, pagination, searchContent],
    () =>
      dashboard
        .getProducts({
          ...pagination,
          branchId,
          searchContent
        })
        .then((res) => {
          const { items } = res?.data || [];

          const addIdToItems = items.map((item: any, index: number) => ({
            ...item,
            id: index,
          }));

          return { ...res.data, items: addIdToItems };
        }),
    {
      onSuccess: (data: any) => {
        setPagination({ ...pagination, total: data?.totalItem });
      },
      enabled: !!branchId,
    }
  );

  const paginationProps = generatePaginationProps(pagination, setPagination);

  return (
    <Box className="bg-[#F3F6F9] pt-3">
      <Box className="flex items-center mb-2 px-3">
        <Typography
          component="h4"
          className="font-semibold h4 whitespace-nowrap mr-4"
        >
          Thống kê sản phẩm
        </Typography>

        <Box className="w-1/2">
          <SearchBox disabledRouterSearch callback={val => setSearchContent(val)} label="Mã sản phẩm, tên sản phẩm" />
        </Box>
      </Box>
      <DataTable
        columns={productColumns}
        rows={data?.items}
        gridProps={{
          ...paginationProps,
        }}
        autoHeight
        hideSearchbar
      />
    </Box>
  );
};
