import { Box, Paper, Typography } from "@mui/material";
import { useMutation } from "react-query";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { warehouse } from "src/api";
import {
  BaseButton,
  FormInputBase,
  FormSelect,
} from "~modules-core/components";
import { warehouseExportStatus } from "~modules-core/constance";
import { toast } from "~modules-core/toast";

type TProps = {
  data: any;
  refetch: Function;
};
export const ExportViewGeneralInfo: React.FC<TProps> = ({ data, refetch }) => {
  const { control, reset, handleSubmit } = useForm();

  const { transactionId } = useRouter().query;

  useEffect(() => {
    !!data && reset({ exportStatus: data?.exportStatus });
  }, [data]);

  const mutateUpdateStatus = useMutation(
    (data: any) => warehouse.updateExportSessionStatus(data?.id, data?.status),
    {
      onSuccess: (data) => {
        refetch();

        toast.success(data.resultMessage);
      },
    }
  );

  const _onSubmit = async (data: any) => {
    await mutateUpdateStatus.mutateAsync({ id: transactionId, status: data.exportStatus });
  };

  return (
    <Paper className="rounded-sm p-3 mb-4">
      <Typography className="text-sm font-medium mb-3">
        THÔNG TIN CHUNG
      </Typography>

      <Box className="grid grid-cols-2 gap-4">
        <FormInputBase disabled value={data?.code} label="Mã đơn xuất kho" />

        <FormInputBase
          disabled
          value={data?.created && moment(data?.created).format("DD/MM/YYYY")}
          label="Ngày tạo"
        />

        <FormInputBase
          disabled
          value={data?.productOrderCode}
          label="Mã đơn bán hàng"
        />

        <FormInputBase disabled value={data?.code} label="Người tạo" />

        <FormInputBase disabled value={data?.branchCode} label="Mã chi nhánh" />

        <FormInputBase
          disabled
          value={data?.deliveryFullName}
          label="Giao nhận"
        />

        <FormSelect
          controlProps={{
            name: "exportStatus",
            control,
          }}
          options={warehouseExportStatus}
          valueKey="value"
          getOptionLabel={(option) => option?.label}
          label={"Trạng thái xuất kho"}
          disabled={data?.exportStatus > 0}
        />

        <Box className="col-span-2 flex justify-end">
          <BaseButton
            disabled={data?.exportStatus > 0}
            onClick={handleSubmit(_onSubmit)}
            variant="contained"
          >
            Cập nhật trạng thái
          </BaseButton>
        </Box>
      </Box>
    </Paper>
  );
};
