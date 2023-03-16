import { Box, Paper } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { topic } from "src/api";
import { AddButton, generatePaginationProps } from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { usePathBaseFilter } from "~modules-core/customHooks";
import { TopicDialog, TopicListTable } from "~modules-dashboard/components";

export const TopicPage = () => {
  const [pagination, setPagination] = useState(defaultPagination);

  const { query } = useRouter();

  usePathBaseFilter(pagination);

  // DATA FETCHING
  const { data, isLoading, isFetching, refetch } = useQuery(
    [
      "topicGroup",
      "loading",
      {
        ...pagination,
        ...query,
      },
    ],
    () =>
      topic
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

  //   HANDLE TOPIC DIALOG
  const [Open, setOpen] = useState(false);

  const onAddTopic = () => {
    setOpen(true);
  };

  const handleCloseUpdate = () => {
    setOpen(false);
  };

  return (
    <Paper className="bgContainer">
      <Box className="mb-3">
        <AddButton children="Tạo nhóm đề tài" onClick={onAddTopic} />
      </Box>
      <TopicListTable
        refetch={refetch}
        data={data?.items}
        isFetching={isFetching}
        isLoading={isLoading}
        paginationProps={paginationProps}
      />
      <TopicDialog
        onClose={handleCloseUpdate}
        open={Open}
        type={"Add"}
        refetch={refetch}
      />
    </Paper>
  );
};
