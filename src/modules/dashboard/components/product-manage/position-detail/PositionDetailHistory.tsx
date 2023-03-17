import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { position } from "src/api";
import {
  DataTable,
  RefreshButton,
  generatePaginationProps,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { usePathBaseFilter } from "~modules-core/customHooks";
import { positionHistoryColumns } from "~modules-dashboard/pages/product-manage/position-detail/data";

export const PositionDetailHistory: React.FC = () => {
  const router = useRouter();

  const { query } = router;

  const { id } = query;

  const [pagination, setPagination] = useState({
    ...defaultPagination,
    pageSize: 5,
  });

  const [searchParams, setSearchParams] = useState<any>({});

  usePathBaseFilter();

  // WATCHING QUERY AND TRIGGER FETCHING DATA
  useEffect(() => {
    const queryKeys = Object.keys(query);

    const params: any = {};

    queryKeys.map((key) => {
      if (key.includes("history_")) {
        const paramKey = key.replace("history_", "");

        params[paramKey] = query[key];
      }
    });

    setSearchParams(params);
  }, [query]);

  // FETCH DATA
  const { data, refetch, isFetching, isLoading } = useQuery(
    [
      "ProductTransactions_" + id,
      {
        ...pagination,
        searchParams,
      },
    ],
    () =>
      position
        .getHistoryByPositionId({
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          positionId: id,
          ...searchParams,
        })
        .then((res) => res.data),
    {
      enabled: !!id,
      onSuccess: (data) => {
        setPagination({ ...pagination, total: data?.totalItem });
      },
    }
  );

  const paginationProps = generatePaginationProps(pagination, setPagination);

  return (
    <Box className="mb-4">
      <Box className="flex items-center justify-between mb-3">
        <Typography className="font-bold uppercase mb-3 text-sm">
          LỊCH SỬ NHẬP XUẤT SẢN PHẨM
        </Typography>
        <RefreshButton onClick={() => refetch()} />
      </Box>

      <Box className="bg-white">
        <DataTable
          columns={positionHistoryColumns}
          rows={data?.items || []}
          gridProps={{
            loading: isLoading || isFetching,
            ...paginationProps,
          }}
          autoHeight={true}
          paginationMode="client"
        />
      </Box>
    </Box>
  );
};
