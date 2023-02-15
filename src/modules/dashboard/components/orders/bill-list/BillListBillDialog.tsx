import {
  Box,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { bill, TBillAddbill } from "src/api";
import {
  BaseButton,
  Dialog,
  FormDatepicker,
  FormInputNumber,
} from "~modules-core/components";
import { toast } from "~modules-core/toast";
import { _format } from "~modules-core/utility/fomat";
import { TDialog } from "~types/dialog";

export const BillListBillDialog: React.FC<TDialog> = ({
  onClose,
  open,
  refetch,
  defaultValue,
}) => {
  const { control, handleSubmit } = useForm<any>({
    defaultValues: {
      paymentDate: moment().valueOf()
    }
  });

  const title = "Thêm mới phiếu thanh toán";

  // METHODS
  const mutateUpdate = useMutation(
    (payload: TBillAddbill) => bill.addBill(payload),
    {
      onSuccess: (data) => {
        toast.success(data.resultMessage);

        refetch?.();

        onClose();
      },
    }
  );

  const handleUpdate = useCallback(
    async (data: any) => {
      const { id, nextPaymentDate } = defaultValue || {};

      const { paid, paymentDate } = data || {};

      await mutateUpdate.mutateAsync({
        billId: id,
        nextPaymentDate,
        paid,
        paymentDate,
      });
    },
    [defaultValue]
  );

  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm" title={title}>
      <Box className="grid gap-4">
        <FormDatepicker
          controlProps={{
            control,
            name: "paymentDate",
            rules: { required: "Phải chọn ngày thanh toán" },
          }}
          label="Ngày thanh toán"
        />

        <FormInputNumber
          controlProps={{
            control,
            name: "paid",
            rules: { required: "Phải nhập số tiền thanh toán" },
          }}
          label="Số tiền thanh toán"
        />

        <Typography>
          Còn lại: <strong>{_format.getVND(defaultValue?.unPaid)}</strong>
        </Typography>
      </Box>

      <Box className="flex justify-center items-center mt-4">
        <BaseButton onClick={handleSubmit(handleUpdate)}>Lưu</BaseButton>

        <BaseButton type="button" className="!bg-main-1 ml-3" onClick={onClose}>
          Hủy
        </BaseButton>
      </Box>
    </Dialog>
  );
};
