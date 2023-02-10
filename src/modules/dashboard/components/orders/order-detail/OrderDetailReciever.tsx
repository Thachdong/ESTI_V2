import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import {
  FormCheckbox,
  FormInput,
  FormSelect,
} from "~modules-core/components";
import { paymentExpiredIn, paymentTypes } from "~modules-core/constance";

export const OrderDetailReciever: React.FC = () => {
  const { control } = useFormContext();
  return (
    <Box>
      <Typography className="font-bold uppercase mb-3">
        THÔNG TIN NHẬN HÀNG
      </Typography>

      <Box className="grid grid-cols-2 gap-4 bg-white rounded-sm p-3">
        <FormCheckbox
          controlProps={{
            name: "defaultReceiver",
            control,
          }}
          label="Thông tin nhận hàng giống thông tin tài khoản khách hàng đăng kí"
          className="col-span-2"
        />

        <FormInput
          controlProps={{
            name: "receiverFullName",
            control,
          }}
          label="Họ, tên người nhận:"
        />

        <FormInput
          controlProps={{
            name: "receiverPhone",
            control,
          }}
          label="Số điện thoại:"
        />

        <FormSelect
          controlProps={{
            name: "paymentType",
            control,
          }}
          label="Hình thức TT:"
          options={paymentTypes}
        />

        <FormSelect
          controlProps={{
            name: "paymentLimit",
            control,
          }}
          label="Thời hạn công nợ:"
          options={paymentExpiredIn}
        />

        <FormInput
          controlProps={{
            name: "receiverAddress",
            control,
          }}
          label="Đ/c nhận hàng:"
          required
        />
      </Box>
    </Box>
  );
};
