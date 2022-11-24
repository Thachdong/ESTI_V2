import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { branchs, TBranch } from "src/api";
import { BaseButton, Dialog, FormInput } from "~modules-core/components";
import { toast } from "~modules-core/toast";
import { TDialog } from "~types/dialog";

export const BranchsDialog: React.FC<TDialog> = ({
  onClose,
  refetch,
  open,
  defaultValue,
  type,
}) => {
  const { control, handleSubmit, reset } = useForm<TBranch>({
    mode: "onBlur",
  });

  const [isUpdate, setIsUpdate] = useState(false);

  const title =
    type === "Add"
      ? "Tạo chi nhánh"
      : type === "View" && isUpdate
      ? "Cập nhật chi nhánh"
      : "Thông chi nhánh";

  useEffect(() => {
    if (type === "Add") {
      reset({});
    }

    if (type === "View" && defaultValue) {
      reset(defaultValue);
    }
  }, [defaultValue, reset]);

  const mutationAdd = useMutation(
    (payload: Omit<TBranch, "id">) => branchs.create(payload),
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

  const mutateUpdate = useMutation(
    (payload: TBranch) => branchs.update(payload),
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
              onClick={handleSubmit((data: Omit<TBranch, "id">) =>
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
      <Box component="form" onSubmit={(e) => e.preventDefault()}>
        <FormInput
          controlProps={{
            name: "code",
            control,
            rules: { required: "Phải nhập mã chi nhánh" },
          }}
          label="Mã chi nhánh"
          required
          className="mb-4"
          disabled={type === "View" && !isUpdate}
        />

        <FormInput
          controlProps={{
            name: "name",
            control,
            rules: { required: "Phải nhập tên chi nhánh " },
          }}
          label="Tên chi nhánh"
          required
          className="mb-4"
          disabled={type === "View" && !isUpdate}
        />

        <FormInput
          controlProps={{
            name: "taxCode",
            control,
            rules: { required: "Phải nhập mã số thuế " },
          }}
          label="Mã số thuế"
          required
          className="mb-4"
          disabled={type === "View" && !isUpdate}
        />

        <FormInput
          controlProps={{
            name: "address",
            control,
            rules: { required: "Phải nhập mã địa chỉ " },
          }}
          label="Địa chỉ"
          required
          className="mb-4"
          disabled={type === "View" && !isUpdate}
        />

        <FormInput
          controlProps={{
            name: "email",
            control,
            rules: { required: "Phải nhập email " },
          }}
          label="Email"
          required
          className="mb-4"
          disabled={type === "View" && !isUpdate}
        />

        <FormInput
          controlProps={{
            name: "phone",
            control,
            rules: { required: "Phải nhập số điện thoại " },
          }}
          label="Số điện thoại"
          required
          disabled={type === "View" && !isUpdate}
        />

        <Box className="flex items-center justify-end mt-4">
          {renderButtons()}
        </Box>
      </Box>
    </Dialog>
  );
};
