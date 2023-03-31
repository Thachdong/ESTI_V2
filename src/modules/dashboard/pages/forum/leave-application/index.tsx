import { Box, Paper } from "@mui/material";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { leaveApplication } from "src/api";
import {
  AddButton,
  generatePaginationProps,
  RefreshButton,
  SearchBox,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { usePathBaseFilter } from "~modules-core/customHooks";
import {
  LeaveApplycationDialog,
  LeaveApplycationTable,
} from "~modules-dashboard/components";

export const LeaveApplycationPage = () => {
  const [pagination, setPagination] = useState(defaultPagination);

  const router = useRouter();

  const { query } = router;

  const { leaveApplicationId } = query;

  usePathBaseFilter(pagination);

  // DATA FETCHING
  const { data, isLoading, isFetching, refetch } = useQuery(
    [
      "leaveApplicationData",
      "loading",
      {
        ...pagination,
        ...query,
      },
    ],
    () =>
      leaveApplication
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

  const handleRemoveLeaveId = useCallback(() => {
    delete query["leaveApplicationId"];

    router.push({
      pathname: router.pathname,
      query: query,
    });
  }, []);

  return (
    <Paper className="bgContainer">
      <Box className="mb-3 flex gap-3">
        <AddButton children="Tạo nghỉ phép" onClick={onCreateMeeting} />
        <SearchBox />
        {!!leaveApplicationId && <RefreshButton onClick={handleRemoveLeaveId} />}
      </Box>

      <LeaveApplycationTable
        data={data?.items}
        isFetching={isFetching}
        isLoading={isLoading}
        refetch={refetch}
        paginationProps={paginationProps}
      />
      
      <LeaveApplycationDialog
        onClose={handelClose}
        open={Open}
        refetch={refetch}
        type="Add"
      />
    </Paper>
  );
};
