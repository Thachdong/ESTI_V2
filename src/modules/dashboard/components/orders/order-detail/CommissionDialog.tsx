import { Box } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { commission, TCreateCommission } from "src/api";
import { BaseButton, Dialog, FormDatepicker } from "~modules-core/components";
import { FormInputNumber } from "~modules-core/components/form-hooks/FormInputNumber";
import { toast } from "~modules-core/toast";
import { TDialog } from "~types/dialog";

export const CommissionDialog: React.FC<TDialog> = ({
  onClose,
  open,
  type,
  refetch,
  defaultValue,
}) => {
  // LOCAL STATE AND EXTRACT PROPS
  const { orderId } = defaultValue || {};

  const methods = useForm();

  const { control, reset, handleSubmit } = methods;

  const title = "Tạo hoa hồng";

  // SIDE EFFECTS
  useEffect(() => {
    reset({});
  }, [type]);

  // METHODS
  const mutateAdd = useMutation(
    (payload: TCreateCommission) => commission.create(payload),
    {
      onSuccess: (data: any) => {
        toast.success(data?.resultMessage);

        refetch?.();

        reset({});

        onClose();
      },
    }
  );

  const handleCreate = useCallback(async (data: any) => {
    await mutateAdd.mutateAsync({ ...data, mainOrderId: orderId });
  }, []);

  return (
    <Dialog
      onClose={onClose}
      open={open}
      maxWidth="sm"
      title={title}
      headerClassName="text-center"
    >
      <Box>
        <Box className="grid gap-4">
          <FormInputNumber
            controlProps={{
              control,
              name: "paid",
              rules: { required: "Phải nhập số tiền" },
            }}
            label="Hoa hồng"
            shrinkLabel
          />

          <FormDatepicker
            controlProps={{
              control,
              name: "paymentDate",
              rules: { required: "Phải nhập ngày" },
            }}
            label="Ngày chi"
          />
        </Box>

        <Box className="flex items-center justify-center mt-4">
          <BaseButton className="mr-2" onClick={handleSubmit(handleCreate)}>
            Tạo
          </BaseButton>

          <BaseButton type="button" className="!bg-main-1" onClick={onClose}>
            Đóng
          </BaseButton>
        </Box>
      </Box>
    </Dialog>
  );
};
