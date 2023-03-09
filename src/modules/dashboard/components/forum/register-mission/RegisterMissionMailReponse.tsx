import {
  Avatar,
  Box,
  ButtonBase,
  List,
  ListItem,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { meetingDeploy, registerMission, taskList } from "src/api";
import { FormInput } from "~modules-core/components";
import { _format } from "~modules-core/utility/fomat";
import SendIcon from "@mui/icons-material/Send";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import { toast } from "~modules-core/toast";
import clsx from "clsx";
import { useSession } from "~modules-core/customHooks/useSession";

type TProps = {
  data: any;
};

export const RegisterMissionMailReponse: React.FC<TProps> = ({ data }) => {
  const { control, handleSubmit } = useForm();

  const { userInfo } = useSession();

  const {
    data: dataRepList,
    isLoading,
    refetch,
  } = useQuery(["registerMission", "loading"], () =>
    registerMission
      .getListMailReponse({
        registerMissionId: data?.id,
      })
      .then((res) => res.data)
  );

  const mutateRepply = useMutation(
    (payload: any) => registerMission.createMailReponse(payload),
    {
      onSuccess: (data) => {
        toast.success(data.resultMessage);

        refetch?.();
      },
    }
  );

  const handleRepply = (newData: any) => {
    mutateRepply.mutateAsync({ ...newData, registerMissionId: data?.id });
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
        {isLoading ? (
          <Box className="px-3">
            <Skeleton />
            <Skeleton />
            <Skeleton width={"60%"} />
          </Box>
        ) : (
          <List className="grid gap-3 px-3">
            {dataRepList?.length > 0 ? (
              <>
                {dataRepList?.map((item: any, index: number) => (
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
                    </Box>
                  </ListItem>
                ))}
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
        )}
      </Box>
      {(data?.status === 1 && userInfo?.userInfo?.roleCode == "TK") ||
      (data?.status === 2 && userInfo?.userInfo?.roleCode == "TK") ? (
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
