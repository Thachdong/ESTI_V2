import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { position } from "src/api";
import { DataTable, RefreshButton } from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { usePathBaseFilter } from "~modules-core/customHooks";
import { positionHistoryColumns } from "~modules-dashboard/pages/product-manage/storage/data";

type TProps = {
  positionId: string;
  open: boolean;
};

export const StoragePositionHistory: React.FC<TProps> = ({
  positionId,
  open,
}) => {
  const router = useRouter();

  const { query } = router;

  const [pagination, setPagination] = useState(defaultPagination);

  const [searchParams, setSearchParams] = useState<any>({});

  usePathBaseFilter(pagination);

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
  const { data, refetch } = useQuery(
    [
      "ProductTransactions_" + positionId,
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
          positionId,
          ...searchParams,
        })
        .then((res) => res.data),
    {
      enabled: Boolean(positionId) && open,
      onSuccess: (data) => {
        setPagination({ ...pagination, total: data?.totalItem });
      },
    }
  );

  return (
    <Box className="mb-4">
      <Box className="flex items-center mb-3">
        <Typography className="flex-grow text-sm font-semibold">
          LỊCH SỬ NHẬP XUẤT SẢN PHẨM
        </Typography>
        <RefreshButton onClick={() => refetch()} />
      </Box>

      <DataTable
        columns={positionHistoryColumns}
        rows={data?.items || []}
        autoHeight={true}
        paginationMode="client"
      />
    </Box>
  );
};
