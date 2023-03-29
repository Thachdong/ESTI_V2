import { Box, Paper } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { meetingDeploy } from "src/api";
import {
  AddButton,
  generatePaginationProps,
  SearchBox,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { usePathBaseFilter } from "~modules-core/customHooks";
import {
  MeetingDeloyTable,
  MeetingDeployDialog,
} from "~modules-dashboard/components";

export const MeetingDeployPage = () => {
  const [pagination, setPagination] = useState(defaultPagination);

  const { query } = useRouter();

  usePathBaseFilter(pagination);

  // DATA FETCHING
  const { data, isLoading, isFetching, refetch } = useQuery(
    [
      "meetingDeployData",
      "loading",
      {
        ...pagination,
        ...query,
      },
    ],
    () =>
      meetingDeploy
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
  const onCreateMeeting = () => {
    setOpen(true);
  };

  const handelClose = () => {
    setOpen(false);
  };

  return (
    <Paper className="bgContainer">
      <Box className="mb-3 flex gap-3">
        <AddButton children="Tạo cuộc họp mới" onClick={onCreateMeeting} />
        <SearchBox />
      </Box>

      <MeetingDeloyTable
        refetch={refetch}
        data={data?.items}
        isFetching={isFetching}
        isLoading={isLoading}
        paginationProps={paginationProps}
      />

      <MeetingDeployDialog
        onClose={handelClose}
        open={Open}
        type="Add"
        refetch={refetch}
      />
    </Paper>
  );
};
