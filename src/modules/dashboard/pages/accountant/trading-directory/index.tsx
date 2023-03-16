import { Box, Paper } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { categoryTransaction } from "src/api";
import {
  AddButton,
  generatePaginationProps,
  SearchBox,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { usePathBaseFilter } from "~modules-core/customHooks";
import {
  TradingDirectoryDialog,
  TradingDirectoryTable,
} from "~modules-dashboard/components";

export const TrandingDirectoryPage = () => {
  const [pagination, setPagination] = useState(defaultPagination);

  const { query } = useRouter();

  usePathBaseFilter(pagination);

  // DATA FETCHING
  const { data, isLoading, isFetching, refetch } = useQuery(
    [
      "categoryTransaction",
      "loading",
      {
        ...pagination,
        ...query,
      },
    ],
    () =>
      categoryTransaction
        .getList({
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          ...query,
        })
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        setPagination({ ...pagination, total: data.totalItem });
      },
    }
  );

  const paginationProps = generatePaginationProps(pagination, setPagination);

  const [Open, setOpen] = useState(false);
  const onCreateTransaction = () => {
    setOpen(true);
  };

  const onCloseTransaction = () => {
    setOpen(false);
  };

  return (
    <Paper className="bgContainer">
      <Box className="mb-3 flex gap-3 w-3/5">
        <AddButton
          children="Tạo danh mục giao dịch"
          onClick={onCreateTransaction}
        />
        <SearchBox />
      </Box>

      <TradingDirectoryTable
        data={data?.items}
        isFetching={isFetching}
        isLoading={isLoading}
        refetch={refetch}
        paginationProps={paginationProps}
      />

      <TradingDirectoryDialog
        onClose={onCloseTransaction}
        open={Open}
        refetch={refetch}
        type={"Add"}
      />
    </Paper>
  );
};
