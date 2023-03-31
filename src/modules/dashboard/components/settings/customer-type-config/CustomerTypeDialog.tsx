import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import {
  customerType,
  TCreateCustomerType,
  TUpdateCustomerType,
} from "src/api/customer-type";
import {
  BaseButton,
  Dialog,
  FormInput,
  FormInputNumber,
  FormSelect,
} from "~modules-core/components";
import { accountTypeOptions } from "~modules-core/constance";
import { toast } from "~modules-core/toast";
import { TDialog } from "~types/dialog";

export const CustomerTypeDialog: React.FC<TDialog> = ({
  onClose,
  refetch,
  open,
  defaultValue,
  type,
}) => {
  const { control, handleSubmit, reset } = useForm<any>({
    mode: "onBlur",
  });

  const [isUpdate, setIsUpdate] = useState(false);

  const title =
    type === "Add"
      ? "Tạo loại khách hàng"
      : type === "View" && isUpdate
      ? "Cập nhật loại khách hàng"
      : "Thông tin loại khách hàng";

  useEffect(() => {
    if (type === "Add") {
      reset({});
    }

    if (type === "View" && defaultValue) {
      reset(defaultValue);

      setIsUpdate(false);
    }
  }, [defaultValue, reset]);

  const mutationAdd = useMutation(
    (payload: TCreateCustomerType) => customerType.create(payload),
    {
      onError: (error: any) => {
        toast.error(error?.resultMessage);
      },
      onSuccess: (data) => {
        toast.success(data?.resultMessage);

        onClose();

        refetch?.();
      },
    }
  );

  const handleAdd = useCallback(async (data: any) => {
    await mutationAdd.mutateAsync({ ...data });
  }, []);

  const mutationUpdate = useMutation(
    (payload: TUpdateCustomerType) => customerType.update(payload),
    {
      onError: (error: any) => {
        toast.error(error?.resultMessage);
      },
      onSuccess: (data) => {
        toast.success(data?.resultMessage);

        refetch?.();

        setIsUpdate(false);
      },
    }
  );

  const handleUpdate = useCallback(async (data: any) => {
    await mutationUpdate.mutateAsync({ ...data, id: defaultValue?.id });
  }, [defaultValue]);

  const renderButtons = () => {
    switch (true) {
      case type === "Add":
        return (
          <>
            <BaseButton onClick={handleSubmit(handleAdd)} className="mr-2">
              Tạo
            </BaseButton>
            <BaseButton type="button" className="!bg-main-1" onClick={onClose}>
              Đóng
            </BaseButton>
          </>
        );
      case type === "View" && isUpdate === false:
        return (
          <>
            <BaseButton
              type="button"
              className="mr-2"
              onClick={() => setIsUpdate(true)}
            >
              Cập nhật
            </BaseButton>
            <BaseButton type="button" className="!bg-main-1" onClick={onClose}>
              Đóng
            </BaseButton>
          </>
        );
      case type === "View" && isUpdate === true:
        return (
          <>
            <BaseButton onClick={handleSubmit(handleUpdate)} className="mr-2">
              Cập nhật
            </BaseButton>
            <BaseButton
              type="button"
              className="!bg-main-1"
              onClick={() => setIsUpdate(false)}
            >
              Quay lại
            </BaseButton>
          </>
        );
    }
  };

  return (
    <Dialog onClose={onClose} open={open} title={title}>
      <Box component="form" onSubmit={(e: any) => e.preventDefault()}>
        <FormInput
          controlProps={{
            name: "levelName",
            control,
            rules: { required: "Phải nhập tên" },
          }}
          label="Tên"
          className="mb-4"
          disabled={type === "View" && !isUpdate}
          shrinkLabel
        />

        <FormSelect
          controlProps={{
            name: "accountType",
            control,
            rules: { required: "Phải chọn nhóm khách hàng" },
          }}
          options={accountTypeOptions}
          label="Nhóm tài khoản"
          className="mb-4"
          disabled={type === "View" && !isUpdate}
          shrinkLabel
        />

        <FormInputNumber
          controlProps={{
            name: "discount",
            control,
          }}
          label="Chiết khấu"
          className="mb-4"
          disabled={type === "View" && !isUpdate}
          shrinkLabel
        />

        <FormInputNumber
          controlProps={{
            name: "point",
            control,
          }}
          label="Tích điểm"
          className="mb-4"
          disabled={type === "View" && !isUpdate}
          shrinkLabel
        />

        <Box className="flex items-center justify-end mt-4">
          {renderButtons()}
        </Box>
      </Box>
    </Dialog>
  );
};
