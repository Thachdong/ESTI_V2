import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { branchs, TWarehouseConfig, warehouseConfig } from "src/api";
import {
  BaseButton,
  Dialog,
  FormInput,
  FormSelect,
} from "~modules-core/components";
import { toast } from "~modules-core/toast";
import { TDialog } from "~types/dialog";

export const WarehouseConfigDialog: React.FC<TDialog> = ({
  type,
  defaultValue,
  onClose,
  refetch,
  open,
}) => {
  const { control, handleSubmit, reset } = useForm<TWarehouseConfig>({
    mode: "onBlur",
  });

  const [isUpdate, setIsUpdate] = useState(false);

  const title =
    type === "Add"
      ? "Tạo kho"
      : type === "View" && isUpdate
      ? "Cập nhật kho"
      : "Thông tin kho";

  useEffect(() => {
    if (type === "Add") {
      reset({});
    }

    if (type === "View" && defaultValue) {
      reset(defaultValue);
    }
  }, [defaultValue, reset]);

  // THIS MUST BE REPLACE BY EFFECTIVELY METHOD SOON
  const { data: branchsList } = useQuery(["BranchsList"], () =>
    branchs
      .getList({ pageSize: 999, pageIndex: 1 })
      .then((res) => res.data.items)
  );

  const mutationAdd = useMutation(
    (payload: Omit<TWarehouseConfig, "id">) => warehouseConfig.create(payload),
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
    (payload: TWarehouseConfig) => warehouseConfig.update(payload),
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
              onClick={handleSubmit((data: Omit<TWarehouseConfig, "id">) =>
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
            rules: { required: "Phải nhập mã kho" },
          }}
          label="Mã kho"
          required
          className="mb-4"
          disabled={type === "View" && !isUpdate}
        />

        <FormSelect
          controlProps={{
            name: "branchId",
            control,
            rules: { required: "Phải nhập số vị trí" },
          }}
          options={branchsList as []}
          selectShape={{ valueKey: "id", labelKey: "code" }}
          label="Chọn chi nhánh"
          className="mb-4"
          disabled={type === "View" && !isUpdate}
        />

        <FormInput
          controlProps={{
            name: "position",
            control,
            rules: { required: "Phải nhập số vị trí" },
          }}
          type="number"
          label="Số vị trí"
          required
          className="mb-4"
          disabled={type === "View" && !isUpdate}
        />

        <Box className="flex items-center justify-end mt-4">
          {renderButtons()}
        </Box>
      </Box>
    </Dialog>
  );
};
