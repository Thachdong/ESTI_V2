import { Box } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { accountManagement, branchs, TAccountManagerUpdate } from "src/api";
import {
  BaseButton,
  Dialog,
  FormInput,
  FormInputNumber,
  FormSelectAsync,
} from "~modules-core/components";
import { toast } from "~modules-core/toast";
import { _format } from "~modules-core/utility/fomat";
import { TDialog } from "~types/dialog";

export const AccountDialog: React.FC<TDialog> = ({
  onClose,
  open,
  refetch,
  defaultValue,
  type,
}) => {
  const { control, handleSubmit, reset, setValue } = useForm<any>({});

  useEffect(() => {
    if (type == "Update") {
      reset({
        branchId: defaultValue?.branchId,
        account: defaultValue?.account,
        goal: defaultValue?.goal,
        percent: defaultValue?.percent,
      });
    }
  }, [defaultValue]);

  //   ADD
  const mutateAdd = useMutation(
    (payload: TAccountManagerUpdate) => accountManagement.create(payload),
    {
      onSuccess: (data) => {
        toast.success(data.resultMessage);
        refetch?.();
        reset();
        onClose();
      },
    }
  );

  const handleAdd = async (data: TAccountManagerUpdate) => {
    await mutateAdd.mutateAsync(data);
  };

  //   UPDATE
  const mutateUpdate = useMutation(
    (payload: TAccountManagerUpdate) => accountManagement.update(payload),
    {
      onSuccess: (data) => {
        toast.success(data.resultMessage);
        refetch?.();
        onClose();
      },
    }
  );

  const handleUpdate = async (data: TAccountManagerUpdate) => {
    await mutateUpdate.mutateAsync({
      id: defaultValue?.id,
      branchId: data?.branchId,
      account: data?.account,
      goal: data?.goal,
      percent: data?.percent,
    });
  };

  const renderTitle = () => {
    switch (type) {
      case "Add":
        return "Thêm mới tài khoản";
        break;
      case "Update":
        return "Cập nhật tài khoản";
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
            <BaseButton onClick={handleSubmit(handleUpdate)}>
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
    <Dialog onClose={onClose} open={open} maxWidth={"xs"} title={renderTitle()}>
      <Box className="grid gap-3">
        <FormSelectAsync
          label={"Chi nhánh"}
          controlProps={{
            name: "branchId",
            control: control,
            rules: { required: "Phải chọn chi nhánh" },
          }}
          fetcher={branchs.getList}
          shrinkLabel
        />
        <FormInput
          controlProps={{
            control: control,
            name: "account",
            rules: { required: "Phải nhập tên tài khoản" },
          }}
          label="Tên tài khoản"
          shrinkLabel
        />
        <FormInputNumber
          controlProps={{
            control: control,
            name: "goal",
            rules: { required: "Phải nhập mục tiêu" },
          }}
          label="Mục tiêu"
          shrinkLabel
        />
        <FormInputNumber
          controlProps={{
            control: control,
            name: "percent",
            rules: { required: "Phải nhập phần trăm" },
          }}
          label="Phần trăm"
          shrinkLabel
        />
      </Box>

      <Box className="flex justify-center items-center mt-4">
        {renderButton()}
      </Box>
    </Dialog>
  );
};
