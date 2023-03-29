import { Box, Button, Paper, Typography } from "@mui/material";
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
import { warehouseImportStatus } from "~modules-core/constance";
import { toast } from "~modules-core/toast";

type TProps = {
  data: any;
  refetch: Function;
};
export const ImportDetailViewGeneralInfo: React.FC<TProps> = ({
  data,
  refetch,
}) => {
  const { control, reset, handleSubmit } = useForm();

  const { id } = useRouter().query;

  useEffect(() => {
    if (!!data) {
      const importStatus = data.importStatus;

      reset({ importStatus });
    }
  }, [data]);

  const mutateUpdateStatus = useMutation(
    (data: any) => warehouse.updateImportSessionStatus(data?.id, data?.status),
    {
      onSuccess: (data) => {
        refetch();

        toast.success(data.resultMessage);
      },
    }
  );

  const mutateUpdateReceiveBill = useMutation(
    (id: string) => warehouse.updateReceivedBill(id),
    {
      onSuccess: (data) => {
        refetch();

        toast.success(data.resultMessage);
      },
    }
  );

  const _onSubmit = async (data: any) => {
    await mutateUpdateStatus.mutateAsync({ id, status: data.importStatus });
  };

  const _onUpdate = async () => {
    await mutateUpdateReceiveBill.mutateAsync(id as string);
  };

  return (
    <Box className="">
      <Typography className="text-sm font-semibold mb-3">
        THÔNG TIN CHUNG
      </Typography>

      <Box className="grid lg:grid-cols-2 gap-4 rounded p-3 bg-white">
        <FormInputBase disabled value={data?.code} label="Mã nhập kho" />

        <FormInputBase
          disabled
          value={data?.created && moment(data?.created).format("DD/MM/YYYY")}
          label="Ngày tạo"
        />

        <FormInputBase
          disabled
          value={data?.productOrderCode}
          label="Mã mua hàng"
        />

        <FormInputBase disabled value={data?.code} label="Người tạo" />

        <FormInputBase disabled value={data?.branchCode} label="Mã chi nhánh" />

        <FormInputBase
          disabled
          value={data?.deliveryName}
          label="Giao nhận"
        />

        <Box className="flex items-center">
          <FormInputBase
            value={data?.receivedBill ? "Đã nhận" : "Chưa nhận"}
            label="Hóa đơn"
            disabled
            className="flex-grow mr-2"
          />

          <BaseButton
            size="small"
            variant="contained"
            className="h-[40px] bg-main"
            // className="!text-[#000] bg-[#edf2f7] hover:bg-[#e2e8f0] h-[40px]"
            disabled={data?.receivedBill}
            onClick={_onUpdate}
          >
            Nhận
          </BaseButton>
        </Box>

        <FormSelect
          controlProps={{
            name: "importStatus",
            control,
          }}
          options={warehouseImportStatus}
          valueKey="value"
          labelKey="label"
          label={"Trạng thái nhập kho"}
          disabled={data?.importStatus > 0}
        />

        <Box className="col-span-2 flex justify-end">
          <BaseButton
            disabled={data?.importStatus > 0}
            onClick={handleSubmit(_onSubmit)}
            variant="contained"
            className="bg-main"
          >
            Cập nhật trạng thái
          </BaseButton>
        </Box>
      </Box>
    </Box>
  );
};
