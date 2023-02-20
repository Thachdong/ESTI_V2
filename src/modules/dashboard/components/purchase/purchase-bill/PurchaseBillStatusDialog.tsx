import { Box, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useCallback, useState } from "react";
import { useMutation } from "react-query";
import { purchaseOrderBill, TPurchaseOrderBillUpdateStatus } from "src/api/purchase-order-bill";
import { BaseButton, Dialog } from "~modules-core/components";
import { purchaseOrderBillStatus } from "~modules-core/constance";
import { toast } from "~modules-core/toast";
import { TDialog } from "~types/dialog";

export const PurchaseBillStatusDialog: React.FC<TDialog> = ({
  onClose,
  open,
  refetch,
  defaultValue,
}) => {
    const [status, setStatus] = useState<number>(defaultValue?.status || 0);
  
    const title = `Trạng thái hóa đơn - ${defaultValue?.billNumber}`;
  
    const mutateUpdate = useMutation(
      (payload: TPurchaseOrderBillUpdateStatus) => purchaseOrderBill.updateStatus(payload),
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
      <Dialog onClose={onClose} open={open} maxWidth="sm" title={title}>
        <RadioGroup
          defaultValue={defaultValue?.status}
          onChange={(e) => setStatus(+e.target.value)}
        >
          {purchaseOrderBillStatus?.map((status: any) => (
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
  
