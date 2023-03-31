import { Box, Paper } from "@mui/material";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { discussion } from "src/api";
import {
  AddButton,
  FilterButton,
  generatePaginationProps,
  RefreshButton,
  SearchBox,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { usePathBaseFilter } from "~modules-core/customHooks";
import {
  DiscusionTopicDialog,
  DiscussionTopicTable,
} from "~modules-dashboard/components";

export const DiscussionTopicPage: React.FC = () => {
  const [pagination, setPagination] = useState(defaultPagination);

  const router = useRouter();

  const { query } = router;

  const { discussionId } = query;

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

  const handleRemoveDiscussionId = useCallback(() => {        
    if (!!discussionId) {
      delete query["discussionId"];

      router.push({
        pathname: router.pathname,
        query: query,
      });
    } else {
      refetch();
    }
  }, [discussionId]);

  return (
    <Paper className="bgContainer">
      <Box className="flex justify-between items-center flex-wrap gap-2 mb-3">
        <Box className="flex gap-3">
          <AddButton children="Tạo thảo luận" onClick={onAddDiscussionTopic} />

          <SearchBox />
        </Box>

        <Box className="flex gap-2">
          <FilterButton listFilterKey={[]} />

          <RefreshButton onClick={handleRemoveDiscussionId} />
        </Box>
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
