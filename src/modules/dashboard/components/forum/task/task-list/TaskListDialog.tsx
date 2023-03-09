import { Box, Rating, Typography } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { staff, taskGroup, taskList, TTaskListUpdate } from "src/api";
import {
  BaseButton,
  Dialog,
  FormDatepicker,
  FormInput,
  FormSelect,
  FormSelectAsync,
  FormUploadfiles,
} from "~modules-core/components";
import { statusTask } from "~modules-core/constance";
import { toast } from "~modules-core/toast";
import { _format } from "~modules-core/utility/fomat";
import { TDialog } from "~types/dialog";

export const TaskListDialog: React.FC<TDialog> = ({
  onClose,
  open,
  refetch,
  defaultValue,
  type,
}) => {
  const { control, handleSubmit, reset, setValue } = useForm<any>({});

  useEffect(() => {
    if (type == "Update") {
      reset({ status: defaultValue?.status });
    }
  }, [defaultValue]);

  //   ADD
  const mutateAdd = useMutation(
    (payload: TTaskListUpdate) => taskList.create(payload),
    {
      onSuccess: (data) => {
        toast.success(data.resultMessage);

        refetch?.();

        onClose();
      },
    }
  );

  const handleAdd = async (data: any) => {
    const dataPost = {
      ...data,
      co_Participant: data?.co_Participant.toString().replaceAll("["),
      attachFile: data?.attachFile.toString().replaceAll("["),
    };
    mutateAdd.mutateAsync(dataPost);
  };

  //   UPDATE STATUS
  const mutateUpdateStatus = useMutation(
    (payload: { id: string; status: number }) => taskList.updateStatus(payload),
    {
      onSuccess: (data) => {
        toast.success("Cập nhật trạng thái thành công");

        refetch?.();

        onClose();
      },
    }
  );

  const handleUpdateStatus = async (data: any) => {
    await mutateUpdateStatus.mutateAsync({
      id: defaultValue?.id,
      status: data?.status,
    });
  };

  const renderTitle = () => {
    switch (type) {
      case "Add":
        return "Thêm mới task";
        break;
      case "Update":
        return "Cập nhật task";
        break;
      default:
        break;
    }
  };

  const renderButton = () => {
    switch (type) {
      case "Add":
        return (
          <>
            <BaseButton onClick={handleSubmit(handleAdd)}>Tạo</BaseButton>

            <BaseButton
              type="button"
              className="!bg-main-1 ml-3"
              onClick={onClose}
            >
              Hủy
            </BaseButton>
          </>
        );
        break;
      case "Update":
        return (
          <>
            <BaseButton onClick={handleSubmit(handleUpdateStatus)}>
              Cập nhật
            </BaseButton>

            <BaseButton
              type="button"
              className="!bg-main-1 ml-3"
              onClick={onClose}
            >
              Hủy
            </BaseButton>
          </>
        );
        break;
      default:
        break;
    }
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      maxWidth={type == "Update" ? "xs" : "md"}
      title={renderTitle()}
    >
      <Box className="grid grid-cols-2 gap-4">
        {type !== "Update" ? (
          <>
            <FormSelectAsync
              controlProps={{
                control: control,
                name: "jobGroup",
                rules: { required: "Phải chọn nhóm task" },
              }}
              label="Tên nhóm task"
              fetcher={taskGroup.getList}
              labelKey="jobGroupName"
            />
            <FormInput
              controlProps={{
                control: control,
                name: "descriptionsJob",
                rules: { required: "Phải nhập Task" },
              }}
              label="Task"
            />

            <FormSelectAsync
              controlProps={{
                control: control,
                name: "co_Participant",
                rules: undefined,
              }}
              label="Người tham gia"
              fetcher={staff.getList}
              labelKey="fullName"
              multiple
              className="col-span-2"
            />
            <FormDatepicker
              controlProps={{
                control: control,
                name: "performDate",
                rules: { required: "Phải chọn ngày thực hiện" },
              }}
              label="Ngày thực hiện"
            />
            <FormDatepicker
              controlProps={{
                control: control,
                name: "completeDate",
                rules: { required: "Phải chọn ngày hoàn thành" },
              }}
              label="Ngày hoàn thành"
            />
            <FormSelectAsync
              controlProps={{
                control: control,
                name: "inChargeOfPerson",
                rules: { required: "Phải chọn người phụ trách" },
              }}
              label="Người phụ trách"
              fetcher={staff.getList}
              labelKey="fullName"
            />
            <Box className="flex gap-3 items-center">
              <Typography className="text-sm font-semibold">
                Đánh giá
              </Typography>
              <Rating
                name="level"
                className="text-xl"
                onChange={(val: any) =>
                  setValue("level", val?.target?._wrapperState?.initialValue)
                }
                value={defaultValue?.level || 0}
              />
            </Box>
            <FormInput
              controlProps={{
                control: control,
                name: "contentDescriptions",
                rules: { required: "Phải nhập nội dung task" },
              }}
              label="Nội dung task"
              className="col-span-2"
              multiline
              rows={3}
            />

            <Box className="col-span-2">
              <FormUploadfiles
                loader={taskList.uploadFile}
                controlProps={{ control, name: "attachFile" }}
                title="Tải file"
                className="col-span-2 grid grid-cols-5 p-0 mb-3"
              />
            </Box>
          </>
        ) : (
          <>
            <FormSelect
              controlProps={{
                control: control,
                name: "status",
                rules: { required: "Phải nhập nội dung task" },
              }}
              label="Trạng thái"
              options={statusTask}
              className="col-span-2"
            />
          </>
        )}
      </Box>

      <Box className="flex justify-center items-center mt-4">
        {renderButton()}
      </Box>
    </Dialog>
  );
};
