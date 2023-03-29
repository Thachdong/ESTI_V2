import { Box } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { meetingDeploy, staff, TMeetingDeployUpdate } from "src/api";
import {
  BaseButton,
  Dialog,
  FormDatepicker,
  FormInput,
  FormSelect,
  FormSelectAsync,
  FormUploadfiles,
} from "~modules-core/components";
import { department } from "~modules-core/constance";
import { toast } from "~modules-core/toast";
import { _format } from "~modules-core/utility/fomat";
import { TDialog } from "~types/dialog";

export const MeetingDeployDialog: React.FC<TDialog> = ({
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
    (payload: TMeetingDeployUpdate) => meetingDeploy.create(payload),
    {
      onSuccess: (data) => {
        toast.success(data.resultMessage);
        refetch?.();
        reset();
        onClose();
      },
    }
  );

  const handleAdd = async (data: any) => {
    const newParticipant = data?.participant?.join(",");
    const newAttachFile = data?.attachFile?.join(",");
    const dataPost = {
      ...data,
      participant: newParticipant,
      attachFile: newAttachFile,
    };
    await mutateAdd.mutateAsync(dataPost);
  };

  //   UPDATE STATUS
  const mutateUpdateStatus = useMutation(
    (payload: { meetingDeployId: string; status: number }) =>
      meetingDeploy.updateStatus(payload),
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
      meetingDeployId: defaultValue?.id,
      status: data?.status,
    });
  };

  const renderTitle = () => {
    switch (type) {
      case "Add":
        return "Thêm mới cuộc họp";
        break;
      case "Update":
        return "Cập nhật trạng thái cuộc họp";
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
            <FormSelect
              controlProps={{
                control: control,
                name: "department",
                rules: { required: "Phải chọn phòng ban" },
              }}
              label="Phòng ban"
              options={department}
              shrinkLabel
            />
            <FormInput
              controlProps={{
                control: control,
                name: "descriptionJob",
                rules: { required: "Phải nhập mô tả công việc" },
              }}
              label="Mô tả công việc"
              shrinkLabel
            />
            <FormDatepicker
              controlProps={{
                control: control,
                name: "startTime",
                rules: { required: "Phải chọn ngày thực hiện" },
              }}
              label="Ngày thực hiện"
            />
            <FormDatepicker
              controlProps={{
                control: control,
                name: "endTime",
                rules: { required: "Phải chọn ngày hoàn thành" },
              }}
              label="Ngày hoàn thành"
            />
            <FormSelectAsync
              controlProps={{
                control: control,
                name: "participant",
                rules: undefined,
              }}
              label="Người tham gia"
              fetcher={staff.getList}
              labelKey="fullName"
              multiple
              shrinkLabel
            />
            <FormSelectAsync
              controlProps={{
                control: control,
                name: "secretary",
                rules: { required: "Phải chọn thư ký" },
              }}
              label="Thư ký"
              fetcher={staff.getList}
              labelKey="fullName"
              shrinkLabel
            />
            <FormInput
              controlProps={{
                control: control,
                name: "contentDescriptions",
                rules: { required: "Phải nhập nội dung task" },
              }}
              label="Nội dung họp"
              className="col-span-2"
              multiline
              rows={3}
              shrinkLabel
            />

            <Box className="col-span-2">
              <FormUploadfiles
                loader={meetingDeploy.uploadFile}
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
                rules: { required: "Phải chọn trạng thái cuộc họp" },
              }}
              label="Trạng thái"
              options={[
                { id: 1, name: "Chưa thực hiện" },
                { id: 2, name: "Đang thực hiện" },
                { id: 3, name: "Hoàn thành" },
                { id: 4, name: "Hủy" },
              ]}
              className="col-span-2"
              shrinkLabel
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
