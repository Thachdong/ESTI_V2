import { Box, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useMutation } from "react-query";
import { useCallback, useState } from "react";
import { askPriceOrder, TUpdateStatusAskPriceOrder } from "src/api";
import { BaseButton, Dialog } from "~modules-core/components";
import { toast } from "~modules-core/toast";
import { TDialog } from "~types/dialog";
import { supplierQuotesStatus } from "~modules-core/constance";

export const SupplierQuotesStatusDialog: React.FC<TDialog> = ({
  open,
  onClose,
  defaultValue,
  refetch,
}) => {
  const [status, setStatus] = useState(defaultValue?.status);
  
  const mutateUpdate = useMutation(
    (payload: TUpdateStatusAskPriceOrder) =>
      askPriceOrder.updateStatus(payload),
    {
      onSuccess: (data) => {
        toast.success(data.resultMessage);

        refetch?.();

        onClose();
      },
    }
  );

  const handleUpdate = useCallback(async () => {
    if (defaultValue?.id) {
      await mutateUpdate.mutateAsync({
        id: defaultValue?.id,
        status: +status,
      });
    }
  }, [defaultValue?.id, status]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      title={"Trạng thái hỏi giá - " + defaultValue?.code}
      headerClassName="text-center"
    >
      <RadioGroup
        defaultValue={defaultValue?.status}
        onChange={(e) => setStatus(e.target.value)}
      >
        {supplierQuotesStatus?.map((status: any) => (
          <FormControlLabel
            key={status.value}
            value={status.value}
            control={<Radio />}
            label={status.label}
            disabled={defaultValue?.status > status.value}
          />
        ))}
      </RadioGroup>

      <Box className="flex justify-center items-center mt-4">
        <BaseButton
          onClick={handleUpdate}
          disabled={status === defaultValue?.exportStatus}
        >
          Cập nhật
        </BaseButton>
        <BaseButton type="button" className="!bg-main-1 ml-3" onClick={onClose}>
          Đóng
        </BaseButton>
      </Box>
    </Dialog>
  );
};
