import { Box } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import {
  meetingDeploy,
  registerMission,
  staff,
  TRegisterMissionUpdate,
} from "src/api";
import {
  BaseButton,
  Dialog,
  FormDatepicker,
  FormInput,
  FormSelect,
  FormSelectAsync,
  FormUploadfiles,
} from "~modules-core/components";
import { ConfirmRegisterMission } from "~modules-core/constance";
import { toast } from "~modules-core/toast";
import { _format } from "~modules-core/utility/fomat";
import { TDialog } from "~types/dialog";

export const RegisterMissionDialog: React.FC<TDialog> = ({
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
    (payload: TRegisterMissionUpdate) => registerMission.create(payload),
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
    const {attachFile = [], ...rest} = data || {};

    const payload = {
      ...rest,
      attachFile: attachFile?.join(",")
    }

    await mutateAdd.mutateAsync(payload);
  };

  //   UPDATE
  const mutateUpdate = useMutation(
    (payload: { registerMissionId: string; status: 1 | 2 | 3 | 4 }) =>
      registerMission.confirmLeaveApplication(payload),
    {
      onSuccess: (data) => {
        toast.success(data.resultMessage);
        refetch?.();
        reset();
        onClose();
      },
    }
  );

  const handleUpdateStatus = async (data: any) => {
    await mutateUpdate.mutateAsync({
      registerMissionId: defaultValue?.id,
      status: data?.status,
    });
  };

  const renderTitle = () => {
    switch (type) {
      case "Add":
        return "Thêm mới đăng ký công tác";
        break;
      case "Update":
        return "Cập nhật trạng thái đăng ký công tác";
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
      maxWidth={type == "Update" ? "sm" : "md"}
      title={renderTitle()}
    >
      <Box className="grid grid-cols-2 gap-4">
        {type !== "Update" ? (
          <>
            <FormSelectAsync
              controlProps={{
                control: control,
                name: "applicantId",
                rules: undefined,
              }}
              label="Người đăng ký"
              fetcher={staff.getList}
              labelKey="fullName"
            />
            <FormInput
              controlProps={{
                control: control,
                name: "seasonMission",
                rules: { required: "Phải nhập lý do đăng ký" },
              }}
              label="Lý do đăng ký"
            />
            <FormInput
              controlProps={{
                control: control,
                name: "numberOfDay",
                rules: { required: "Phải nhập số ngày" },
              }}
              label="Số ngày"
            />
            <FormSelectAsync
              controlProps={{
                control: control,
                name: "headOfDepartment",
                rules: { required: "Phải chọn thư ký" },
              }}
              label="Trưởng phòng"
              fetcher={staff.getList}
              labelKey="fullName"
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

            <FormInput
              controlProps={{
                control: control,
                name: "contentSeasonMission",
                rules: { required: "Phải nhập nội dung đăng ký công tác" },
              }}
              label="Nội dung đăng ký công tác"
              className="col-span-2"
              multiline
              rows={3}
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
                rules: { required: "Phải chọn trạng thái đăng ký công tác" },
              }}
              label="Trạng thái đăng ký"
              options={ConfirmRegisterMission}
              className="col-span-2"
              labelKey="label"
              valueKey="value"
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
