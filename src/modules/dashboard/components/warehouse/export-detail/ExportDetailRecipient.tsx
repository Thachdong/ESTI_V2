import { Box, Paper, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import {
  FormCheckbox,
  FormDatepicker,
  FormInputBase,
  FormSelect,
} from "~modules-core/components";

export const ExportDetailRecipient = () => {
  const { control } = useFormContext();
  return (
    <Paper className="rounded-sm p-3">
      <Typography className="text-sm font-medium mb-3">
        THÔNG TIN LIÊN HỆ
      </Typography>

      <Box className="grid gap-4">
        <FormCheckbox
          controlProps={{
            name: "expectedDate",
            control,
          }}
          label="Sử dụng thông tin trong đơn hàng"
        />

        <FormInputBase
          value="dfasdf "
          disabled={true}
          label="Người nhận hàng"
        />

        <FormInputBase value="dfasdf " disabled={true} label="SĐT" />

        <FormInputBase value="dfasdf " disabled={true} label="Đ/c nhận hàng" />

        <FormDatepicker
          controlProps={{
            name: "expectedDate",
            control,
            rules: { required: "Phải chọn ngày giao dự kiến" },
          }}
          label="Ngày giao dự kiên"
        />

        <FormSelect
          controlProps={{
            name: "expectedDate",
            control,
          }}
          label="Chứng từ thanh toán"
          options={[]}
        />
      </Box>
    </Paper>
  );
};
