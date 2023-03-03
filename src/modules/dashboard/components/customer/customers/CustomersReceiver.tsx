import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormInput } from "~modules-core/components";

type TProps = {
  isDisable: boolean;
  index: number;
  type: string;
};

export const CustomersReceiver: React.FC<TProps> = ({
  isDisable,
  index,
  type,
}) => {
  const [defaultValue, setDefaultValue] = useState(true);

  const { control, watch, setValue } = useFormContext();

  useFieldArray({
    control,
    name: "curatorCreate",
  });

  const { curatorAddress, curatorEmail, curatorPhone, curatorName } =
    watch("curatorCreate")[index];

  useEffect(() => {
    if (defaultValue && type === "Add") {
      setValue(`curatorCreate.${index}.receiverName`, curatorName);
      setValue(`curatorCreate.${index}.receiverPhone1`, curatorPhone);
      setValue(`curatorCreate.${index}.receiverEmail`, curatorEmail);
      setValue(`curatorCreate.${index}.receiverAddress`, curatorAddress);
    }
  }, [
    type,
    defaultValue,
    curatorAddress,
    curatorEmail,
    curatorPhone,
    curatorName,
  ]);

  return (
    <Box
      component="fieldset"
      className="grid grid-cols-2 !border-grey-2 !rounded-[4px] gap-4 mb-3"
    >
      <legend>Thông tin người nhận hàng:</legend>

      {type === "Add" && (
        <FormControlLabel
          control={<Checkbox size="small" />}
          label="Cùng thông tin người liên hệ"
          disabled={isDisable}
          className="col-span-2"
          value={defaultValue}
          onChange={(e: any) => setDefaultValue(e.target.checked)}
          checked={defaultValue}
        />
      )}

      <FormInput
        controlProps={{
          control,
          name: `curatorCreate.${index}.receiverName`,
          rules: { required: "Phải nhập họ tên người nhận hàng" },
        }}
        label="Họ tên người nhận hàng"
        disabled={isDisable}
        shrinkLabel
      />

      <FormInput
        controlProps={{
          control,
          name: `curatorCreate.${index}.receiverEmail`,
        }}
        label="Email"
        disabled={isDisable}
        shrinkLabel
      />

      <FormInput
        controlProps={{
          control,
          name: `curatorCreate.${index}.receiverPhone1`,
          rules: { required: "Phải nhập số điện thoại 1" },
        }}
        label="Số điện thoại 1"
        disabled={isDisable}
        shrinkLabel
      />

      <FormInput
        controlProps={{
          control,
          name: `curatorCreate.${index}.receiverPhone2`,
          rules: { required: "Phải nhập số điện thoại 2" },
        }}
        label="Số điện thoại 2"
        disabled={isDisable}
        shrinkLabel
      />

      <FormInput
        controlProps={{
          control,
          name: `curatorCreate.${index}.receiverAddress`,
          rules: { required: "Phải nhập địa chỉ" },
        }}
        label="Địa chỉ"
        multiline
        minRows={3}
        disabled={isDisable}
        className="col-span-2"
        shrinkLabel
      />
    </Box>
  );
};
