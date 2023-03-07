import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";
import { FormCheckbox, FormInput } from "~modules-core/components";

export const BillDetailReciever: React.FC = () => {
  const { id } = useRouter().query;

  const { control, watch } = useFormContext();

  const { defaultReceiver } = watch();
  return (
    <Box>
      <Typography className="font-bold uppercase mb-3 text-sm">
        THÔNG TIN NHẬN HÓA ĐƠN
      </Typography>

      <Box className="bg-white rounded p-3">
        {!id && (
          <FormCheckbox
            controlProps={{
              name: "defaultReceiver",
              control,
            }}
            label="Thông tin nhận hóa đơn giống thông tin nhận hàng"
            className="mb-4"
          />
        )}

        <FormInput
          controlProps={{
            name: "billRecipientName",
            control,
            rules: { required: "Phải nhập người nhận" },
          }}
          label="Người nhận: "
          disabled={defaultReceiver || !!id}
          className="mb-4"
        />

        <FormInput
          controlProps={{
            name: "billRecipientPhone",
            control,
            rules: { required: "Phải nhập số điện thoại" },
          }}
          label="Số điện thoại:"
          disabled={defaultReceiver || !!id}
          className="mb-4"
        />

        <FormInput
          controlProps={{
            name: "billRecipientEmail",
            control,
            rules: { required: "Phải nhập email" },
          }}
          label="Email:"
          disabled={defaultReceiver || !!id}
          className="mb-4"
        />

        <FormInput
          controlProps={{
            name: "billRecipientAddress",
            control,
            rules: { required: "Phải nhập địa chỉ" },
          }}
          label="Địa chỉ:"
          disabled={defaultReceiver || !!id}
        />
      </Box>
    </Box>
  );
};
