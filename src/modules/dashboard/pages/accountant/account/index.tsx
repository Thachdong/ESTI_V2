import { Box, Paper } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { accountManagement } from "src/api";
import {
  AddButton,
  generatePaginationProps,
  SearchBox,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { usePathBaseFilter } from "~modules-core/customHooks";
import { AccountDialog, AccountListTable } from "~modules-dashboard/components";

export const AccountPage: React.FC = () => {
  const [pagination, setPagination] = useState(defaultPagination);

  const { query } = useRouter();

  usePathBaseFilter(pagination);

  // DATA FETCHING
  const { data, isLoading, isFetching, refetch } = useQuery(
    [
      "registerMisson",
      "loading",
      {
        ...pagination,
        ...query,
      },
    ],
    () =>
      accountManagement
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

  //   HANDLE ADD MEETING
  const [Open, setOpen] = useState(false);
  const onCreateAccount = () => {
    setOpen(true);
  };

  const handelCloseAccount = () => {
    setOpen(false);
  };

  return (
    <Paper className="bgContainer">
      <Box className="mb-3 flex gap-3">
        <AddButton children="Tạo tài khoản" onClick={onCreateAccount} />
        <SearchBox />
      </Box>

      <AccountListTable
        data={data?.items}
        refetch={refetch}
        isFetching={isFetching}
        isLoading={isLoading}
        paginationProps={paginationProps}
      />

      <AccountDialog
        onClose={handelCloseAccount}
        open={Open}
        type="Add"
        refetch={refetch}
      />
    </Paper>
  );
};
