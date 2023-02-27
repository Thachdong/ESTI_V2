import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { purchaseOrder } from "src/api";
import { BaseButton, FormSelect } from "~modules-core/components";
import { purchaseOrderStatus } from "~modules-core/constance";
import { toast } from "~modules-core/toast";

type TProps = {
  currentStatus: number;
  refetch: () => void;
};

export const PurchaseDetailStatus: React.FC<TProps> = ({
  currentStatus,
  refetch,
}) => {
  const { id } = useRouter().query;

  const { control, watch } = useForm({
    defaultValues: {
      status: currentStatus,
    },
  });

  const { status } = watch();

  const mutateUpdate = useMutation(
    (payload: { id: string; status: number }) =>
      purchaseOrder.updateStatus(payload),
    {
      onSuccess: (data: any) => {
        toast.success(data?.resultMessage);

        refetch?.();
      },
    }
  );

  const handleUpdateStatus = useCallback(async () => {
    if (status <= currentStatus) {
      toast.error("Trạng thái cần cập nhật không hợp lệ !");

      return;
    }
    await mutateUpdate.mutateAsync({ id: id as string, status });
  }, [status, id]);

  return (
    <Box className="flex flex-col col-span-2 mb-4">
      <Typography className="font-bold uppercase mb-3">
        Trạng thái đơn hàng
      </Typography>

      <Box className="grid grid-cols-2 gap-4 bg-white rounded p-3">
        <FormSelect
          options={purchaseOrderStatus}
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

        <BaseButton
          disabled={currentStatus > 2}
          onClick={handleUpdateStatus}
          className="max-w-[200px] bg-main"
        >
          Cập nhật trạng thái
        </BaseButton>
      </Box>
    </Box>
  );
};
