import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { position, TPosition, warehouseConfig } from "src/api";
import {
  BaseButton,
  Dialog,
  FormInput,
  FormSelect,
  FormSelectAsync,
} from "~modules-core/components";
import { positionStatus } from "~modules-core/constance";
import { toast } from "~modules-core/toast";
import { TDialog } from "~types/dialog";
import { PositionProducts } from "./PositionProducts";
import { PositionProductsHistory } from "./PositionProductsHistory";

export const PositionDialog: React.FC<TDialog> = ({
  onClose,
  open,
  title,
  refetch,
  defaultValue,
}) => {
  const { control, handleSubmit, reset } = useForm<Partial<TPosition>>({
    mode: "onBlur",
  });

  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (defaultValue) {
      const {
        warehouseConfigID,
        positionName,
        positionSize,
        note,
        positionStatus,
        id,
      } = defaultValue || {};

      reset({
        warehouseConfigID,
        positionName,
        positionSize,
        note,
        positionStatus,
        id,
      });
    }
  }, [defaultValue]);

  const mutateUpdate = useMutation(
    (data: Partial<TPosition>) => position.update(data),
    {
      onSuccess: (data) => {
        toast.success(data?.resultMessage);

        refetch?.();

        setIsUpdate(false);
      },
      onError: (error: any) => {
        toast.error(error?.resultMessage);
      },
    }
  );

  const handleUpdate = useCallback(async (data: Partial<TPosition>) => {
    if (!isUpdate) {
      setIsUpdate(!isUpdate);

      return;
    }

    await mutateUpdate.mutateAsync(data);
  }, [isUpdate]);

  const handleCancel = useCallback(() => {
    if (isUpdate) {
      setIsUpdate(false);
    } else {
        onClose();
    }
  }, [isUpdate]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      title={title}
      headerClassName="text-center"
    >
      <Box component="form" className="mb-4">
        <Box className="grid grid-cols-2 gap-4">
          <FormSelectAsync
            fetcher={warehouseConfig.getList}
            controlProps={{
              control,
              name: "warehouseConfigID",
              rules: { required: "Phải chọn kho" },
            }}
            label="Kho"
            selectShape={{ valueKey: "id", labelKey: "code" }}
            disabled={!isUpdate}
          />

          <FormInput
            controlProps={{
              name: "positionName",
              control,
              rules: { required: "Phải nhập tên vị trí" },
            }}
            label="Tên vị trí"
            disabled={!isUpdate}
          />

          <FormInput
            controlProps={{
              name: "positionSize",
              control,
              rules: { required: "Phải nhập kích thước DxRxC" },
            }}
            label="Kích thước DxRxC"
            disabled={!isUpdate}
          />

          <FormSelect
            options={positionStatus}
            controlProps={{
              name: "positionStatus",
              control,
            }}
            label="Trạng thái"
            disabled={!isUpdate}
          />

          <FormInput
            controlProps={{
              name: "note",
              control,
            }}
            label="Mô tả vị trí kho"
            multiline
            minRows={3}
            className="col-span-2"
            disabled={!isUpdate}
          />
        </Box>

        <Box className="flex justify-end mt-4">
          <BaseButton onClick={handleSubmit(handleUpdate)}>
            {isUpdate ? "Lưu" : "Cập nhật"}
          </BaseButton>
          <BaseButton
            type="button"
            className="!bg-main-1 ml-3"
            onClick={handleCancel}
          >
            {isUpdate ? "Hủy" : "Đóng"}
          </BaseButton>
        </Box>
      </Box>

      <PositionProducts positionId={defaultValue?.id} open={open} />

      <PositionProductsHistory positionId={defaultValue?.id} open={open} />
    </Dialog>
  );
};
