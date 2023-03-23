import { Box } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import {
  leaveApplication,
  meetingDeploy,
  staff,
  TLeaveApplicationUpdate,
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

export const LeaveApplycationDialog: React.FC<TDialog> = ({
  onClose,
  open,
  refetch,
  defaultValue,
  type,
}) => {
  const { control, handleSubmit, reset } = useForm<any>({});

  // DATA FETCHING
  const { data: saleAdmins } = useQuery(["SaleAdminList"], () =>
    staff.getListSaleAdmin().then((res) => res.data)
  );

  useEffect(() => {
    if (type == "Update") {
      reset({ status: defaultValue?.status });
    }
  }, [defaultValue]);

  // ADD
  const mutateAdd = useMutation(
    (payload: TLeaveApplicationUpdate) => leaveApplication.create(payload),
    {
      onSuccess: (data) => {
        toast.success(data.resultMessage);
        refetch?.();
        reset();
        onClose();
      },
    }
  );

  const handleAdd = async (data: TLeaveApplicationUpdate) => {
    await mutateAdd.mutateAsync(data);
  };

  //   UPDATE STATUS
  const mutateUpdateStatus = useMutation(
    (payload: { leaveApplicationId: string; status: number }) =>
      leaveApplication.updateStatus(payload),
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
      leaveApplicationId: defaultValue?.id,
      status: data?.status,
    });
  };

  const renderTitle = () => {
    switch (type) {
      case "Add":
        return "Thêm mới nghỉ phép";
        break;
      case "Update":
        return defaultValue?.season;
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
      <Box className="grid grid-cols-2 gap-3">
        {type !== "Update" ? (
          <>
            <FormSelectAsync
              controlProps={{
                control: control,
                name: "applicantId",
                rules: { required: "Phải chọn người nghỉ phép" },
              }}
              label="Nhân viên nghỉ phép"
              fetcher={staff.getList}
              labelKey="fullName"
            />
            <FormSelect
              controlProps={{
                control: control,
                name: "headOfDepartment",
                rules: undefined,
              }}
              label="Trường phòng"
              labelKey="fullName"
              options={saleAdmins || []}
            />
            <FormInput
              controlProps={{
                control: control,
                name: "season",
                rules: { required: "Phải nhập lý do nghỉ phép" },
              }}
              label="Lý do nghỉ phép"
            />
            <FormInput
              controlProps={{
                control: control,
                name: "numberOfDay",
                rules: { required: "Phải nhập số ngày nghỉ" },
              }}
              label="Số ngày nghỉ"
            />
            <FormDatepicker
              controlProps={{
                control: control,
                name: "startTime",
                rules: { required: "Phải chọn ngày bắt đầu" },
              }}
              label="Ngày bắt đầu"
            />
            <FormDatepicker
              controlProps={{
                control: control,
                name: "endTime",
                rules: { required: "Phải chọn ngày kết thúc" },
              }}
              label="Ngày kết thúc"
            />
            <FormInput
              controlProps={{
                control: control,
                name: "contentSeason",
                rules: { required: "Phải nhập nội dung lý do nghỉ phép" },
              }}
              label="Nội dung lý do nghỉ phép"
              multiline
              rows={3}
              className="col-span-2"
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
          <FormSelect
            controlProps={{
              control: control,
              name: "status",
              rules: { required: "Phải chọn trạng thái cuộc họp" },
            }}
            label="Trạng thái"
            options={ConfirmRegisterMission}
            className="col-span-2"
            valueKey="value"
            labelKey="label"
          />
        )}
      </Box>

      <Box className="flex justify-center items-center mt-4">
        {renderButton()}
      </Box>
    </Dialog>
  );
};
