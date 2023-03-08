import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormInput } from "~modules-core/components";

export const ContactReceiver: React.FC = () => {
  const [defaultValue, setDefaultValue] = useState(true);

  const { control, watch, setValue } = useFormContext();

  const {
    curatorAddress,
    curatorEmail,
    curatorPhone,
    curatorName,
    curatorNote,
  } = watch();

  useEffect(() => {
    if (defaultValue) {
      setValue("receiverName", curatorName);
      setValue("receiverPhone1", curatorPhone);
      setValue("receiverEmail", curatorEmail);
      setValue("receiverAddress", curatorAddress);
      setValue("receiverNote", curatorNote);
    }
  }, [
    defaultValue,
    curatorAddress,
    curatorEmail,
    curatorPhone,
    curatorName,
    curatorNote,
  ]);

  return (
    <Box
      component="fieldset"
      className="grid grid-cols-2 !border-grey-2 !rounded-[4px] gap-3 mb-3"
    >
      <legend>Thông tin người nhận hàng:</legend>

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
          name: "receiverName",
          rules: { required: "Phải nhập họ tên người nhận hàng" },
        }}
        label="Họ tên người nhận hàng"
        shrinkLabel
      />

      <FormInput
        controlProps={{
          control,
          name: "receiverEmail",
        }}
        label="Email"
        shrinkLabel
      />

      <FormInput
        controlProps={{
          control,
          name: "receiverPhone1",
          rules: { required: "Phải nhập số điện thoại 1" },
        }}
        label="Số điện thoại 1"
        shrinkLabel
      />

      <FormInput
        controlProps={{
          control,
          name: "receiverPhone2",
          rules: { required: "Phải nhập số điện thoại 2" },
        }}
        label="Số điện thoại 2"
        shrinkLabel
      />

      <FormInput
        controlProps={{
          control,
          name: "receiverAddress",
          rules: { required: "Phải nhập địa chỉ" },
        }}
        label="Địa chỉ"
        multiline
        minRows={3}
        shrinkLabel
      />
      <FormInput
        controlProps={{
          control,
          name: "receiverNote",
          rules: undefined,
        }}
        label="Ghi chú"
        multiline
        minRows={3}
        shrinkLabel
      />
    </Box>
  );
};
