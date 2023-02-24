import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { mainOrder } from "src/api";
import {
  FormInput,
  FormInputBase,
  FormSelectAsync,
} from "~modules-core/components";

type TProps = {
  data: {
    saleAdmin: string;
    branchCode: string;
  };
};

export const BillDetailGeneral: React.FC<TProps> = ({ data }) => {
  const { control } = useFormContext();

  return (
    <Box>
      <Typography className="font-bold uppercase mb-3 text-sm">
        THÔNG TIN CHUNG
      </Typography>

      <Box className="grid grid-cols-2 gap-3 bg-white rounded p-3">
        <FormSelectAsync
          controlProps={{
            name: "mainOrderId",
            control,
            rules: { required: "Phải chọn mã đơn hàng" },
          }}
          label={"Mã đơn hàng"}
          fetcher={mainOrder.getList}
          labelKey="mainOrderCode"
        />

        <FormInput
          controlProps={{
            name: "billNumber",
            control,
            rules: { required: "Phải nhập số hóa đơn" },
          }}
          label={"Số hóa đơn"}
        />

        <FormInputBase value={data.saleAdmin} label="Sale admin: " disabled />

        <FormInputBase
          value={data.branchCode}
          label="Mã chi nhánh: "
          disabled
        />
      </Box>
    </Box>
  );
};
