import {
  Avatar,
  Box,
  List,
  ListItem,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { taskList } from "src/api";
import { _format } from "~modules-core/utility/fomat";
import clsx from "clsx";
import Link from "next/link";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { ForumCommentBox } from "~modules-dashboard/components";
import { toast } from "~modules-core/toast";

type TProps = {
  data: any;
};

export const TaskListMailReponse: React.FC<TProps> = ({ data }) => {
  // DATA FETCHING
  const {
    data: dataRepList,
    isLoading,
    refetch,
  } = useQuery(
    ["taskListMail", "loading"],
    () =>
      taskList
        .getListMailReponse({
          taskListId: data?.id,
        })
        .then((res) => res.data),
    {
      enabled: !!data?.id,
    }
  );

  const mutateRepply = useMutation(
    (payload: any) => taskList.createMailReponse(payload),
    {
      onSuccess: (data) => {
        toast.success(data?.resultMessage);

        refetch?.();
      },
    }
  );

  return (
    <Box className="w-[700px] h-screen relative">
      {isLoading ? (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      ) : (
        <Box
          className={clsx(
            data?.status === 1 || data?.status === 2
              ? "h-[78%] overflow-y-scroll "
              : ""
          )}
        >
          <List className="grid gap-3 px-3">
            {dataRepList?.length > 0 ? (
              <>
                {dataRepList?.map((item: any, index: number) => {
                  const listAttachFile = item?.attachFile
                    ? item?.attachFile.split(",")
                    : [];
                  return (
                    <ListItem
                      key={index}
                      className="flex gap-3 items-start border border-solid border-[#f2f2f2] rounded w-full shadow min-h-[76px]"
                    >
                      <Box className="text-center">
                        <Tooltip title={item?.fullName || "Anonymus"}>
                          {item?.avatar ? (
                            <img
                              src={item?.avatar}
                              width={30}
                              height={30}
                              className="rounded-full"
                            />
                          ) : (
                            <Avatar className="m-auto" />
                          )}
                        </Tooltip>
                      </Box>
                      <Box className="w-full">
                        <Box className="flex justify-between items-start">
                          <Box>
                            <Typography className="text-base font-semibold">
                              {item?.titleMail}
                            </Typography>
                            <Typography className="text-xs text-[#908d8d]">
                              {_format.converseDateTime(item?.created)}
                            </Typography>
                          </Box>
                          {/* <Box>
                            <Typography className="text-xs text-main border border-solid px-2 py-[2px] border-main rounded-full font-semibold">
                              {item?.statusName}
                            </Typography>
                          </Box> */}
                        </Box>
                        <Typography className="text-sm mt-2 text-[#838181]">
                          {item?.note}
                        </Typography>
                        {listAttachFile.length > 0 ? (
                          <Box className="mt-3 bg-[#eaf0f3] rounded p-3">
                            <Typography className="text-sm font-semibold text-[#484747]">
                              File đính kèm
                            </Typography>
                            <List className="p-0 grid grid-cols-6 gap-3 mt-3">
                              {listAttachFile.map(
                                (item: string, index: number) => (
                                  <ListItem
                                    key={index}
                                    className="w-fit text-ellipsis overflow-hidden whitespace-nowrap px-2 py-1 rounded bg-white"
                                  >
                                    <Link href={item}>
                                      <a className="text-main no-underline text-sm flex items-center font-semibold gap-3">
                                        <InsertDriveFileIcon />{" "}
                                        <span>File {index + 1}</span>
                                      </a>
                                    </Link>
                                  </ListItem>
                                )
                              )}
                            </List>
                          </Box>
                        ) : null}
                      </Box>
                    </ListItem>
                  );
                })}
              </>
            ) : (
              <>
                {" "}
                <Typography className="text-xl text-[#9b9999] text-center pt-4 font-semibold">
                  Không có phản hồi
                </Typography>
              </>
            )}
          </List>
        </Box>
      )}

      {data?.status === 1 ||
        (data?.status === 2 && (
          <ForumCommentBox
            fileLoader={taskList.uploadFile}
            mutateAdd={mutateRepply}
            idObject={{ taskListId: data?.id }}
          />
        ))}
    </Box>
  );
};
