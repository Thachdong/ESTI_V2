import { Box, Paper } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { taskGroup } from "src/api";
import { AddButton, generatePaginationProps } from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { usePathBaseFilter } from "~modules-core/customHooks";
import { TaskGroupDialog, TaskGroupTable } from "~modules-dashboard/components";

export const TaskGroupPage = () => {
  const [pagination, setPagination] = useState(defaultPagination);

  const { query } = useRouter();

  usePathBaseFilter(pagination);

  // DATA FETCHING
  const { data, isLoading, isFetching, refetch } = useQuery(
    [
      "taskGroup",
      "loading",
      {
        ...pagination,
        ...query,
      },
    ],
    () =>
      taskGroup
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

  // HANDLE ADD TASK IN DIALOG
  const [Open, setOpen] = useState(false);

  const onAddGroupTask = () => {
    setOpen(true);
  };

  const onCloseAddTask = () => {
    setOpen(false);
  };

  return (
    <Paper className="bgContainer">
      <Box className="mb-3">
        <AddButton children="Tạo nhóm task" onClick={onAddGroupTask} />
      </Box>

      <TaskGroupTable
        data={data?.items as any}
        paginationProps={paginationProps}
        isLoading={isLoading}
        isFetching={isFetching}
        refetch={refetch}
      />

      <TaskGroupDialog
        onClose={onCloseAddTask}
        open={Open}
        refetch={refetch}
        type="Add"
      />
    </Paper>
  );
};
