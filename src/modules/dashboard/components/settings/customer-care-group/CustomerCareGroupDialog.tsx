import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import {
  customerCareGroup,
  TCreateCustomerCareGroup,
  TUpdateCustomerCareGroup,
} from "src/api";
import { BaseButton, Dialog, FormInput } from "~modules-core/components";
import { toast } from "~modules-core/toast";
import { TDialog } from "~types/dialog";

export const CustomerCareGroupDialog: React.FC<TDialog> = ({
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
      ? "Tạo nhóm CSKH"
      : type === "View" && isUpdate
      ? "Cập nhật nhóm CSKH"
      : "Thông tin nhóm CSKH";

  useEffect(() => {
    if (type === "Add") {
      reset({});
    }

    const { actionName, id } = defaultValue || {};

    if (type === "View" && !!defaultValue) {
      reset({ actionName, id });
    }
  }, [defaultValue, reset]);

  const mutationAdd = useMutation(
    ( payload: TCreateCustomerCareGroup) =>
      customerCareGroup.create(payload),
    {
      onError: (error: any) => {
        toast.error(error?.resultMessage);
      },
      onSuccess: (data) => {
        toast.success(data?.resultMessage);

        onClose();

        reset();

        refetch?.();
      },
    }
  );

  const mutateUpdate = useMutation(
    (payload: TUpdateCustomerCareGroup) =>
      customerCareGroup.update(payload),
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

  const renderButtons = () => {
    switch (true) {
      case type === "Add":
        return (
          <>
            <BaseButton
              onClick={handleSubmit((data: any) =>
                mutationAdd.mutateAsync(data)
              )}
              className="mr-2"
            >
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
            <BaseButton
              onClick={handleSubmit((data) => mutateUpdate.mutateAsync(data))}
              className="mr-2"
            >
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
            name: "actionName",
            control,
            rules: { required: "Phải nhập tên nhóm" },
          }}
          label="Tên nhóm CSKH"
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
