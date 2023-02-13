import { Box, Typography } from "@mui/material";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import { mainOrder } from "src/api";
import { BaseButton, FormSelect } from "~modules-core/components";
import { orderStatus } from "~modules-core/constance";
import { toast } from "~modules-core/toast";

type TProps = {
  currentStatus: number;
  refetch: () => void;
};

export const OrderDetailStatus: React.FC<TProps> = ({ currentStatus, refetch }) => {
  const { control, watch } = useFormContext();

  const { status, id } = watch();

  const mutateUpdate = useMutation((payload: {id: string, status: number}) => mainOrder.updateStatus(payload), {
    onSuccess: (data: any) => {
      toast.success(data?.resultMessage);

      refetch?.();
    }
  });

  const handleUpdateStatus = useCallback(async() => {
    if (status >= currentStatus) {
      toast.error("Trạng thái cần cập nhật không hợp lệ !");

      return;
    }
    await mutateUpdate.mutateAsync({id, status})
  }, [status, id])

  return (
    <Box className="flex flex-col col-span-2">
      <Typography className="font-bold uppercase mb-3">
        Trạng thái đơn hàng
      </Typography>

      <Box className="grid grid-cols-2 gap-4 bg-white rounded-sm p-3">
        <FormSelect
          options={orderStatus}
          controlProps={{
            control,
            name: "status",
          }}
          label=""
          shrinkLabel
          labelKey="label"
          valueKey="value"
          disabled={currentStatus > 2}
        />

        <BaseButton disabled={currentStatus > 2} onClick={handleUpdateStatus} className="max-w-[200px]">
          Cập nhật trạng thái
        </BaseButton>
      </Box>
    </Box>
  );
};
