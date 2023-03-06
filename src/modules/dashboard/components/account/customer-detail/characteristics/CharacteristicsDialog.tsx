import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import {
  customerCharacteristics,
  TCreateCustomerCharacteristics,
  TUpdateCustomerCharacteristics,
} from "src/api";
import {
  customerDemand,
  TCreateCustomerDemand,
  TUpdateCustomerDemand,
} from "src/api/customer-demand";
import {
  BaseButton,
  Dialog,
  FormInput,
} from "~modules-core/components";
import { toast } from "~modules-core/toast";
import { TDialog } from "~types/dialog";

export const CharacteristicsDialog: React.FC<TDialog> = ({
  onClose,
  open,
  type,
  refetch,
  defaultValue,
}) => {
  const [isUpdate, setIsUpdate] = useState(false);

  const { id } = useRouter().query;

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm();

  const disabled = type === "View" && !isUpdate;

  const title =
    type === "Add"
      ? "Thêm đặc điểm"
      : type === "View" && isUpdate
      ? "Cập nhật đặc điểm"
      : "Chi tiết";

  // SIDE EFFECTS
  useEffect(() => {
    if (!!defaultValue && type !== "Add") {
      const { id, characteristicsName, description } = defaultValue || {};

      reset({ id, characteristicsName, description });
    } else {
      reset({});
    }
  }, [type, defaultValue]);

  // METHODS
  const mutateAdd = useMutation(
    (payload: TCreateCustomerCharacteristics) =>
      customerCharacteristics.create(payload),
    {
      onSuccess: (data) => {
        toast.success(data.resultMessage);

        refetch?.();

        onClose();
      },
    }
  );

  const handleCreate = useCallback(
    async (data: any) => {
      const payload = {
        ...data,
        uid: id,
      };

      await mutateAdd.mutateAsync(payload);
    },
    [id]
  );

  const mutateUpdate = useMutation(
    (payload: TUpdateCustomerCharacteristics) =>
      customerCharacteristics.update(payload),
    {
      onSuccess: (data) => {
        toast.success(data.resultMessage);

        refetch?.();

        setIsUpdate(false);
      },
    }
  );

  const handleUpdate = useCallback(
    async (data: any) => {
      const payload = {
        ...data,
        uid: id,
      };

      await mutateUpdate.mutateAsync(payload);
    },
    [id]
  );

  const renderButtons = useCallback(() => {
    switch (true) {
      case type === "Add":
        return (
          <>
            <BaseButton onClick={handleSubmit(handleCreate)} className="mr-2">
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
              disabled={!isDirty}
              onClick={handleSubmit(handleUpdate)}
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
      default:
        return <></>;
    }
  }, [type, isUpdate, isDirty]);

  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm" title={title}>
      <Box className="grid gap-4">
        <FormInput
          controlProps={{
            name: "characteristicsName",
            control,
            rules: { required: "Phải nhập đặc điểm" },
          }}
          label="Đặc điểm"
          shrinkLabel
          disabled={disabled}
        />

        <FormInput
          controlProps={{
            name: "description",
            control,
            rules: { required: "Phải nhập mô tả" },
          }}
          label="Mô tả"
          shrinkLabel
          disabled={disabled}
          multiline
          minRows={3}
        />

        <Box className="flex items-center justify-end">{renderButtons()}</Box>
      </Box>
    </Dialog>
  );
};
