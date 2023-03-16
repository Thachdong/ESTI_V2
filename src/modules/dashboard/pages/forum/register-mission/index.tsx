import { Box, Paper } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { registerMission } from "src/api";
import {
  AddButton,
  generatePaginationProps,
  SearchBox,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { usePathBaseFilter } from "~modules-core/customHooks";
import {
  RegisterMissionDialog,
  RegisterMissionTable,
} from "~modules-dashboard/components";

export const RegisterMissionPage = () => {
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
      registerMission
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
  const onCreateMisson = () => {
    setOpen(true);
  };

  const handelClose = () => {
    setOpen(false);
  };

  return (
    <Paper className="bgContainer">
      <Box className="mb-3 flex gap-3 w-3/5">
        <AddButton children="Tạo đăng ký công tác" onClick={onCreateMisson} />
        <SearchBox />
      </Box>

      <RegisterMissionTable
        data={data?.items}
        isFetching={isFetching}
        isLoading={isLoading}
        refetch={refetch}
        paginationProps={paginationProps}
      />

      <RegisterMissionDialog
        onClose={handelClose}
        open={Open}
        refetch={refetch}
        type="Add"
      />
    </Paper>
  );
};
