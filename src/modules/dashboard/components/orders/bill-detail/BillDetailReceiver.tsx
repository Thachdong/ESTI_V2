import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { FormCheckbox, FormInput } from "~modules-core/components";

type TProps = {
  disabled: boolean;
};

export const BillDetailReciever: React.FC<TProps> = ({ disabled }) => {
  const { control, watch } = useFormContext();

  const { defaultReceiver } = watch();
  return (
    <Box>
      <Typography className="font-bold uppercase mb-3">
        THÔNG TIN NHẬN HÓA ĐƠN
      </Typography>

      <Box className="grid gap-4 bg-white rounded-sm p-3">
        <FormCheckbox
          controlProps={{
            name: "defaultReceiver",
            control,
          }}
          label="Thông tin nhận hóa đơn giống thông tin nhận hàng"
        />

        <FormInput
          controlProps={{
            name: "billRecipientName",
            control,
            rules: { required: "Phải nhập người nhận" },
          }}
          label="Người nhận: "
          disabled={disabled || defaultReceiver}
        />

        <FormInput
          controlProps={{
            name: "billRecipientPhone",
            control,
            rules: { required: "Phải nhập số điện thoại" },
          }}
          label="Số điện thoại:"
          disabled={disabled || defaultReceiver}
        />

        <FormInput
          controlProps={{
            name: "billRecipientEmail",
            control,
            rules: { required: "Phải nhập email" },
          }}
          label="Email:"
          disabled={disabled || defaultReceiver}
        />

        <FormInput
          controlProps={{
            name: "billRecipientAddress",
            control,
            rules: { required: "Phải nhập địa chỉ" },
          }}
          label="Địa chỉ:"
          disabled={disabled || defaultReceiver}
        />
      </Box>
    </Box>
  );
};
