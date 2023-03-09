import {
  Avatar,
  Box,
  ButtonBase,
  Link,
  List,
  ListItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { discussion, taskList } from "src/api";
import { FormInput } from "~modules-core/components";
import { _format } from "~modules-core/utility/fomat";
import SendIcon from "@mui/icons-material/Send";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import { toast } from "react-toastify";
import clsx from "clsx";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

type TProps = {
  data: any;
};

export const DiscussionMailReponse: React.FC<TProps> = ({ data }) => {
  const { control, handleSubmit } = useForm();

  const {
    data: dataRepList,
    isLoading,
    isFetching,
    refetch,
  } = useQuery(["taskListMail", "loading"], () =>
    discussion
      .getListMailReponse({
        discussionId: data?.id,
      })
      .then((res) => res.data)
  );

  const mutateRepply = useMutation(
    (payload: any) => discussion.createMailReponse(payload),
    {
      onSuccess: (data) => {
        toast.success(data.resultMessage);

        refetch?.();
      },
    }
  );

  const handleRepply = (newData: any) => {
    mutateRepply.mutateAsync({ ...newData, discussionId: data?.id });
  };

  return (
    <Box className="min-w-[700px] h-screen relative">
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
                      <Tooltip title={item?.createdByName || "Anonymus"}>
                        <Avatar className="m-auto" />
                      </Tooltip>
                    </Box>
                    <Box className="w-full">
                      <Box className="flex justify-between items-start">
                        <Box>
                          <Typography className="text-base font-semibold">
                            {item?.title}
                          </Typography>
                          <Typography className="text-xs text-[#908d8d]">
                            {_format.converseDate(item?.created)}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography className="text-xs text-main border border-solid px-2 py-[2px] border-main rounded-full font-semibold">
                            {item?.statusName}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography className="text-sm mt-2 text-[#838181]">
                        {item?.content}
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
                                      <span>File {index}</span>
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
      {data?.status === 1 || data?.status === 2 ? (
        <Box className="px-3 absolute bottom-1 gap-3  w-full">
          <Box>
            <FormInput
              controlProps={{
                control: control,
                name: "title",
                rules: undefined,
              }}
              placeholder="Nhập tiêu đề"
              shrinkLabel
            />
          </Box>
          <Box className="w-full flex items-start">
            <FormInput
              controlProps={{
                control: control,
                name: "note",
                rules: undefined,
              }}
              placeholder="Nhập nội dung phản hồi"
              label=""
              multiline
              rows={3}
              shrinkLabel
            />
          </Box>
          <Box className="w-full flex items-start justify-between">
            <ButtonBase className="p-2 flex justify-center items-center bg-[#dde8f3] text-main rounded">
              <InsertLinkIcon />
            </ButtonBase>
            <ButtonBase
              className="p-2 flex justify-center items-center bg-[#dde8f3] text-main rounded"
              onClick={handleSubmit(handleRepply)}
            >
              <SendIcon />
            </ButtonBase>
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};
