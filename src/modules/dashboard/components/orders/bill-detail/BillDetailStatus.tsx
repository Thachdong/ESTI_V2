import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { bill, TBillUpdateStatus } from "src/api";
import { BaseButton, FormSelect } from "~modules-core/components";
import { billStatus } from "~modules-core/constance";
import { toast } from "~modules-core/toast";

type TProps = {
  currentStatus: number;
  refetch: () => void;
};

export const BillDetailStatus: React.FC<TProps> = ({
  currentStatus,
  refetch,
}) => {
  const {id} = useRouter().query;

  const { control, watch, reset } = useForm();

  const { status } = watch();

  // METHODS
  const mutateUpdate = useMutation(
    (payload: TBillUpdateStatus) => bill.updateStatus(payload),
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

    const payload = {
      id: id as string,
      status
    };

    await mutateUpdate.mutateAsync(payload);
  }, [status, id]);

  useEffect(() => {
    reset({status: currentStatus})
  }, [currentStatus]);

  return (
    <Box className="flex flex-col col-span-2">
      <Typography className="font-bold uppercase mb-3">
        Trạng thái hóa đơn
      </Typography>

      <Box className="grid grid-cols-2 gap-4 bg-white rounded-sm p-3">
        <FormSelect
          options={billStatus}
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
          className="max-w-[200px]"
        >
          Cập nhật trạng thái
        </BaseButton>
      </Box>
    </Box>
  );
};
