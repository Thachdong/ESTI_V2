import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { askPriceOrder } from "src/api";
import { BaseButton, FormSelect } from "~modules-core/components";
import { supplierQuotesStatus } from "~modules-core/constance";
import { toast } from "~modules-core/toast";

type TProps = {
  currentStatus: number;
  refetch: () => void;
};

export const SupplierQuotesDetailStatus: React.FC<TProps> = ({
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
      askPriceOrder.updateStatus(payload),
    {
      onSuccess: (data: any) => {
        toast.success(data?.resultMessage);

        refetch?.();
      },
    }
  );

  const handleUpdateStatus = useCallback(async () => {
    await mutateUpdate.mutateAsync({ id: id as string, status });
  }, [status, id]);

  return (
    <Box className="flex flex-col col-span-2">
      <Typography className="font-bold uppercase mb-3 text-sm">
        Trạng thái đơn hỏi giá
      </Typography>

      <Box className="grid grid-cols-2 gap-4 bg-white rounded p-3">
        <FormSelect
          options={supplierQuotesStatus}
          controlProps={{
            control,
            name: "status",
          }}
          label=""
          shrinkLabel
          labelKey="label"
          valueKey="value"
          disabled={currentStatus > 1}
        />

        <BaseButton
          disabled={currentStatus > 1}
          onClick={handleUpdateStatus}
          className="max-w-[200px] bg-main"
        >
          Cập nhật trạng thái
        </BaseButton>
      </Box>
    </Box>
  );
};
