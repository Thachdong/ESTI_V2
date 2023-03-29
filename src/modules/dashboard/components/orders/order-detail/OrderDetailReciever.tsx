import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";
import { FormCheckbox, FormInput, FormSelect } from "~modules-core/components";
import { paymentExpiredIn, paymentTypes } from "~modules-core/constance";

type TProps = {
  disabled: boolean;
};

export const OrderDetailReciever: React.FC<TProps> = ({ disabled }) => {
  const { control } = useFormContext();

  const { id } = useRouter().query;

  return (
    <Box>
      <Typography className="font-bold uppercase mb-3 text-sm">
        THÔNG TIN NHẬN HÀNG
      </Typography>

      <Box className="grid lg:grid-cols-2 gap-3 bg-white rounded p-3">
        <FormCheckbox
          controlProps={{
            name: "defaultReceiver",
            control,
          }}
          label="Thông tin nhận hàng giống thông tin tài khoản khách hàng đăng kí"
          className="lg:col-span-2 ml-[2px] w-full"
          disabled={disabled}
        />

        <FormInput
          controlProps={{
            name: "receiverFullName",
            control,
          }}
          label="Họ, tên người nhận:"
          disabled={disabled}
        />

        <FormInput
          controlProps={{
            name: "receiverPhone",
            control,
          }}
          label="Số điện thoại:"
          disabled={disabled}
        />
        {!!id ? (
          <FormInput
            controlProps={{
              name: "paymentType",
              control,
            }}
            label="Hình thức TT:"
            disabled={disabled}
          />
        ) : (
          <FormSelect
            controlProps={{
              name: "paymentType",
              control,
            }}
            label="Hình thức TT:"
            options={paymentTypes}
            valueKey="name"
            freeSolo
          />
        )}

        <FormSelect
          controlProps={{
            name: "paymentLimit",
            control,
          }}
          label="Thời hạn công nợ:"
          options={paymentExpiredIn}
          disabled={disabled}
        />

        <FormInput
          controlProps={{
            name: "receiverAddress",
            control,
          }}
          label="Đ/c nhận hàng:"
          disabled={disabled}
        />
      </Box>
    </Box>
  );
};
