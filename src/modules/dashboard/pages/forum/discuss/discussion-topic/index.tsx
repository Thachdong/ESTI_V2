import { Box, Paper } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { discussion } from "src/api";
import {
  AddButton,
  generatePaginationProps,
  SearchBox,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { usePathBaseFilter } from "~modules-core/customHooks";
import {
  DiscusionTopicDialog,
  DiscussionTopicTable,
} from "~modules-dashboard/components";

export const DiscussionTopicPage = () => {
  const [pagination, setPagination] = useState(defaultPagination);

  const { query } = useRouter();

  usePathBaseFilter(pagination);

  // DATA FETCHING
  const { data, isLoading, isFetching, refetch } = useQuery(
    [
      "discussionGroup",
      "loading",
      {
        ...pagination,
        ...query,
      },
    ],
    () =>
      discussion
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

  // HANDLE ADD DISCUSSION TOPIC
  const [Open, setOpen] = useState(false);

  const onAddDiscussionTopic = () => {
    setOpen(true);
  };

  const handleCloseDiscusion = () => {
    setOpen(false);
  };

  return (
    <Paper className="bgContainer">
      <Box className="mb-3 flex gap-3 w-3/5">
        <AddButton children="Tạo thảo luận" onClick={onAddDiscussionTopic} />
        <SearchBox />
      </Box>
      <DiscussionTopicTable
        refetch={refetch}
        data={data?.items}
        isFetching={isFetching}
        isLoading={isLoading}
        paginationProps={paginationProps}
      />
      <DiscusionTopicDialog
        onClose={handleCloseDiscusion}
        open={Open}
        refetch={refetch}
      />
    </Paper>
  );
};
