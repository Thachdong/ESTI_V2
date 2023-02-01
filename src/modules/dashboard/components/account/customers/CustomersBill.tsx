import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  FormInput,
} from "~modules-core/components";

type TProps = {
  isDisable: boolean;
  index: number;
};

export const CustomersBill: React.FC<TProps> = ({ isDisable, index }) => {
  const [defaultValue, setDefaultValue] = useState(true);

  const { control, watch, setValue } = useFormContext();

  useFieldArray({
    control,
    name: "curatorCreate",
  });

  const { curatorAddress, curatorEmail, curatorPhone, curatorName } =
    watch("curatorCreate")[index];

  useEffect(() => {
    if (defaultValue) {
      setValue(`curatorCreate.${index}.billFullName`, curatorName);

      setValue(`curatorCreate.${index}.billPhone`, curatorPhone);

      setValue(`curatorCreate.${index}.billEmail`, curatorEmail);

      setValue(`curatorCreate.${index}.billAddress`, curatorAddress);
    }
  }, [defaultValue, { curatorAddress, curatorEmail, curatorPhone, curatorName }]);

  return (
    <Box
      component="fieldset"
      className="grid grid-cols-2 !border-grey-2 !rounded-[4px] gap-4 mb-3"
    >
      <legend>Thông tin hóa đơn:</legend>

      <FormControlLabel
        control={<Checkbox size="small" />}
        label="Cùng thông tin người liên hệ"
        disabled={isDisable}
        className="col-span-2"
        value={defaultValue}
        onChange={(e: any) => setDefaultValue(e.target.checked)}
        checked={defaultValue}
      />

      <FormInput
        controlProps={{
          control,
          name: `curatorCreate.${index}.billFullName`,
          rules: { required: "Phải nhập họ tên người nhận hóa đơn" },
        }}
        label="Họ tên người nhận hóa đơn"
        disabled={isDisable}
        shrinkLabel
      />

      <FormInput
        controlProps={{
          control,
          name: `curatorCreate.${index}.billEmail`,
        }}
        label="Email"
        required={false}
        disabled={isDisable}
        shrinkLabel
      />

      <FormInput
        controlProps={{
          control,
          name: `curatorCreate.${index}.billPhone`,
          rules: { required: "Phải nhập số điện thoại" },
        }}
        label="Số điện thoại 1"
        disabled={isDisable}
        shrinkLabel
      />

      <FormInput
        controlProps={{
          control,
          name: `curatorCreate.${index}.billAddress`,
          rules: { required: "Phải nhập địa chỉ" },
        }}
        label="Địa chỉ"
        multiline
        minRows={3}
        disabled={isDisable}
        shrinkLabel
      />
    </Box>
  );
};
