import { Box } from "@mui/material";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { position, TCreatePosition, warehouseConfig } from "src/api";
import {
  BaseButton,
  Dialog,
  FormInput,
  FormSelectAsync,
} from "~modules-core/components";
import { toast } from "~modules-core/toast";
import { TDialog } from "~types/dialog";

export const CreatePositionDialog: React.FC<TDialog> = ({
  onClose,
  open,
  title,
  refetch,
}) => {
  const { control, handleSubmit, reset } = useForm<TCreatePosition>({ mode: "onBlur" });

  const mutateAdd = useMutation(
    (data: TCreatePosition) => position.create(data),
    {
      onSuccess: (data) => {
        toast.success(data?.resultMessage);

        refetch?.();

        reset();

        onClose();
      },
      onError: (error: any) => {
        toast.error(error?.resultMessage);
      },
    }
  );

  const handleAddPosition = useCallback(async (data: TCreatePosition) => {
    await mutateAdd.mutateAsync(data);
  }, []);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      title={title}
      headerClassName="text-center"
    >
      <Box component="form">
        <Box className="grid gap-4">
          <FormSelectAsync
            fetcher={warehouseConfig.getList}
            controlProps={{
              control,
              name: "warehouseConfigID",
              rules: { required: "Phải chọn kho" },
            }}
            label="Kho"
            selectShape={{ valueKey: "id", labelKey: "code" }}
          />

          <FormInput
            controlProps={{
              name: "positionName",
              control,
              rules: { required: "Phải nhập tên vị trí" },
            }}
            label="Tên vị trí"
          />

          <FormInput
            controlProps={{
              name: "positionSize",
              control,
              rules: { required: "Phải nhập kích thước DxRxC" },
            }}
            label="Kích thước DxRxC"
          />

          <FormInput
            controlProps={{
              name: "note",
              control,
            }}
            label="Mô tả vị trí kho"
            multiline
            minRows={3}
          />
        </Box>

        <Box className="flex justify-center mt-4">
          <BaseButton onClick={handleSubmit(handleAddPosition)}>Tạo</BaseButton>
          <BaseButton
            type="button"
            className="!bg-main-1 ml-3"
            onClick={onClose}
          >
            Đóng
          </BaseButton>
        </Box>
      </Box>
    </Dialog>
  );
};
