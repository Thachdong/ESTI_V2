import { Box, Typography } from "@mui/material";
import moment from "moment";
import { FormInputBase } from "~modules-core/components";

type TProps = {
  data: {
    orderCode: string;
    billCode: string;
    billCreatedAt: number;
    salesAdminName: string;
    billNumber: string;
    branchCode: string;
  };
};

export const BillDetailGeneralView: React.FC<TProps> = ({ data }) => {
  return (
    <Box>
      <Typography className="font-bold uppercase mb-3">
        THÔNG TIN CHUNG
      </Typography>

      <Box className="grid grid-cols-2 gap-4 bg-white rounded-sm p-3">
        <FormInputBase value={data.orderCode} label="Mã đơn hàng: " disabled />

        <FormInputBase value={data.billCode} label="Mã giao hàng:" disabled />

        <FormInputBase value={data.billNumber} label="Số hóa đơn:" disabled />

        <FormInputBase
          value={moment(data.billCreatedAt).format("DD/MM/YYYY")}
          label="Ngày tạo:"
          disabled
        />

        <FormInputBase
          value={data.salesAdminName}
          label="Admin phụ trách:"
          disabled
        />

        <FormInputBase
          value={data.branchCode}
          label="Mã chi nhánh: "
          disabled
        />
      </Box>
    </Box>
  );
};
