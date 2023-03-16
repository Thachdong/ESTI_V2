import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormInput } from "~modules-core/components";

export const ContactBill: React.FC = () => {
  const [defaultValue, setDefaultValue] = useState(true);

  const { control, watch, setValue } = useFormContext();

  const { curatorAddress, curatorEmail, curatorPhone, curatorName } =
    watch();

  useEffect(() => {
    if (defaultValue) {
      setValue("billFullName", curatorName);

      setValue("billPhone", curatorPhone);

      setValue("billEmail", curatorEmail);
    }
  }, [
    defaultValue,
    curatorAddress,
    curatorEmail,
    curatorPhone,
    curatorName,
  ]);

  return (
    <Box
      component="fieldset"
      className="grid grid-cols-2 !border-grey-2 !rounded-[4px] gap-3 mb-3"
    >
      <legend>Thông tin hóa đơn:</legend>

      <FormControlLabel
          control={<Checkbox size="small" />}
          label="Cùng thông tin người liên hệ"
          className="col-span-2"
          value={defaultValue}
          onChange={(e: any) => setDefaultValue(e.target.checked)}
          checked={defaultValue}
        />

      <FormInput
        controlProps={{
          control,
          name: "billFullName",
          rules: { required: "Phải nhập họ tên người nhận hóa đơn" },
        }}
        label="Họ tên người nhận hóa đơn"
        shrinkLabel
      />

      <FormInput
        controlProps={{
          control,
          name: "billEmail",
        }}
        label="Email"
        required={false}
        shrinkLabel
      />

      <FormInput
        controlProps={{
          control,
          name: "billPhone",
          rules: { required: "Phải nhập số điện thoại" },
        }}
        label="Số điện thoại 1"
        shrinkLabel
      />

      <FormInput
        controlProps={{
          control,
          name: "billNote",
          rules: { required: "Phải nhập địa chỉ" },
        }}
        label="Ghi chú"
        multiline
        minRows={3}
        shrinkLabel
      />
    </Box>
  );
};