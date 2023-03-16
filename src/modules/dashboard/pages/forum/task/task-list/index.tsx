import { Box, Paper } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { taskList } from "src/api";
import {
  AddButton,
  generatePaginationProps,
  SearchBox,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { usePathBaseFilter } from "~modules-core/customHooks";
import { TaskListDialog, TaskListTable } from "~modules-dashboard/components";

export const TaskListPage = () => {
  const [pagination, setPagination] = useState(defaultPagination);

  const { query } = useRouter();

  usePathBaseFilter(pagination);

  // DATA FETCHING
  const { data, isLoading, isFetching, refetch } = useQuery(
    [
      "taskList",
      "loading",
      {
        ...pagination,
        ...query,
      },
    ],
    () =>
      taskList
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

  const onAddTaskList = () => {
    setOpen(true);
  };

  return (
    <Paper className="bgContainer">
      <Box className="mb-3 flex gap-3 w-3/5">
        <AddButton children="Tạo task" onClick={onAddTaskList} />
        <SearchBox />
      </Box>

      <TaskListTable
        refetch={refetch}
        data={data?.items}
        isFetching={isFetching}
        isLoading={isLoading}
        paginationProps={paginationProps}
      />

      <TaskListDialog
        onClose={() => setOpen(false)}
        open={Open}
        type="Add"
        refetch={refetch}
      />
    </Paper>
  );
};
