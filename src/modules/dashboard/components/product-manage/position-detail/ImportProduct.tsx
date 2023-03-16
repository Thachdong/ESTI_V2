import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { position } from "src/api";
import {
  DataTable,
  generatePaginationProps,
  RefreshButton,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { usePathBaseFilter } from "~modules-core/customHooks";
import { importColumns } from "~modules-dashboard/pages/product-manage/position-detail/data";

export const ImportProduct: React.FC = () => {
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
      if (key.includes("import_")) {
        const paramKey = key.replace("import_", "");

        params[paramKey] = query[key];
      }
    });

    setSearchParams(params);
  }, [query]);

  // FETCH DATA
  const { data, refetch, isLoading, isFetching } = useQuery(
    [
      "ImportProductList" + id,
      {
        ...pagination,
        searchParams,
      },
    ],
    () =>
      position
        .getImportProduct({
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
      <Box className="flex items-center justify-end mb-3 pr-3">
        <RefreshButton onClick={() => refetch()} />
      </Box>
      <DataTable
        columns={importColumns}
        rows={data?.items || []}
        gridProps={{
          loading: isLoading || isFetching,
          ...paginationProps,
        }}
        autoHeight={true}
      />
    </Box>
  );
};
