import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { position } from "src/api";
import { DataTable, RefreshButton } from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { usePathBaseFilter } from "~modules-core/customHooks";
import { positionProductColumns } from "~modules-dashboard/pages/product-manage/storage/data";

type TProps = {
  positionId: string;
  open: boolean;
};

export const StoragePosition: React.FC<TProps> = ({ positionId, open }) => {
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
      if (!key.includes("history_")) {
        params[key] = query[key];
      }
    });

    setSearchParams(params);
  }, [query]);

  // FETCH DATA
  const { data, refetch } = useQuery(
    [
      "ProductListIn_" + positionId,
      {
        ...pagination,
        searchParams
      },
    ],
    () =>
      position
        .getProductsByPositionId({
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          positionId,
          ...searchParams
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
      <Box className="flex">
        <Typography className="flex-grow">THÔNG TIN SẢN PHẨM</Typography>
        <RefreshButton onClick={() => refetch()} />
      </Box>

      <DataTable
        columns={positionProductColumns}
        rows={data?.items || []}
        autoHeight={true}
      />
    </Box>
  );
};
