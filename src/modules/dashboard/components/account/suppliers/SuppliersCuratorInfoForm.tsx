import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { FormInput, FormSelect } from "~modules-core/components";
import { curatorPositions, genderData } from "~modules-core/constance";

type TProps = {
  isDisable: boolean;
};

export const SuppliersCuratorInfoForm: React.FC<TProps> = ({ isDisable }) => {
  const { control } = useFormContext();

  return (
    <Box className="grid grid-cols-2 gap-3 h-100">
      <FormInput
        controlProps={{
          control,
          name: "curatorName",
          rules: { required: "Phải nhập họ tên" },
        }}
        label="Họ tên"
        disabled={isDisable}
      />

      <FormSelect
        options={genderData}
        controlProps={{
          control,
          name: "curatorGender",
          rules: { required: "Phải chọn giới tính" },
        }}
        label="Giới tính"
        disabled={isDisable}
        labelKey="name"
      />

      <FormSelect
        options={curatorPositions}
        controlProps={{
          control,
          name: "curatorPosition",
          rules: { required: "Phải chọn chức vụ" },
        }}
        label="Chức vụ"
        disabled={isDisable}
        labelKey="name"
      />

      <FormInput
        controlProps={{
          control,
          name: "curatorPhone",
          rules: { required: "Phải nhập số điện thoại" },
        }}
        label="Số điện thoại"
        disabled={isDisable}
      />

      <FormInput
        controlProps={{
          control,
          name: "curatorAddress",
          rules: { required: "Phải nhập địa chỉ" },
        }}
        label="Địa chỉ"
        multiline
        minRows={3}
        disabled={isDisable}
      />

      <FormInput
        controlProps={{
          control,
          name: "curatorEmail",
        }}
        label="Email"
        required={false}
        disabled={isDisable}
      />
    </Box>
  );
};
