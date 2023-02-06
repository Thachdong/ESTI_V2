import { Box } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { customerType } from "src/api/customer-type";
import { FormInput, FormSelect } from "~modules-core/components";
import {
  curatorDepartments,
  discountTypeOptions,
  genderData,
} from "~modules-core/constance";

type TProps = {
  isDisable: boolean;
  index: number;
};

export const CustomersCurator: React.FC<TProps> = ({ isDisable, index }) => {
  const { control } = useFormContext();

  useFieldArray({
    control,
    name: "curatorCreate",
  });

  const { data: customerTypeOptions = [] } = useQuery(["CustomerTypesList"], () =>
    customerType.getAll().then((res) => res.data)
  );

  return (
    <>
      <Box
        component="fieldset"
        className="grid grid-cols-2 !border-grey-2 !rounded-[4px] gap-4 mb-4"
      >
        <legend>Thông tin tài khoản:</legend>

        <FormInput
          controlProps={{
            control,
            name: `curatorCreate.${index}.userName`,
            rules: { required: "Phải nhập tên tài khoản" },
          }}
          label="Tên tài khoản"
          disabled={isDisable}
          shrinkLabel
        />

        <FormSelect
          controlProps={{
            control,
            name: `curatorCreate.${index}.typeAccount`,
            rules: { required: "Phải chọn loại tài khoản" },
          }}
          options={customerTypeOptions}
          label="Loại tài khoản"
          disabled={isDisable}
          shrinkLabel
          labelKey="levelName"
        />

        <FormSelect
          controlProps={{
            control,
            name: `curatorCreate.${index}.typeDiscount`,
            rules: { required: "Phải chọn loại chiết khấu" },
          }}
          options={discountTypeOptions}
          label="Loại chiết khấu"
          disabled={isDisable}
          shrinkLabel
        />
      </Box>

      <Box
        component="fieldset"
        className="grid grid-cols-2 !border-grey-2 !rounded-[4px] gap-4 mb-4"
      >
        <legend>Thông tin người liên hệ:</legend>

        <FormInput
          controlProps={{
            control,
            name: `curatorCreate.${index}.curatorName`,
            rules: { required: "Phải nhập tên người liên hệ" },
          }}
          label="Tên người liên hệ"
          disabled={isDisable}
          shrinkLabel
        />

        <FormSelect
          options={curatorDepartments}
          controlProps={{
            control,
            name: `curatorCreate.${index}.curatorDepartment`,
            rules: { required: "Phải chọn phòng ban" },
          }}
          label="Phòng ban"
          disabled={isDisable}
          shrinkLabel
        />

        <FormSelect
          options={genderData}
          controlProps={{
            control,
            name: `curatorCreate.${index}.curatorGender`,
            rules: { required: "Phải chọn giới tính" },
          }}
          label="Giới tính"
          disabled={isDisable}
          shrinkLabel
        />

        <FormInput
          controlProps={{
            control,
            name: `curatorCreate.${index}.curatorPhone`,
            rules: { required: "Phải nhập số điện thoại" },
          }}
          label="Số điện thoại"
          disabled={isDisable}
          shrinkLabel
        />

        <FormInput
          controlProps={{
            control,
            name: `curatorCreate.${index}.curatorEmail`,
          }}
          label="Email"
          required={false}
          disabled={isDisable}
          shrinkLabel
        />

        <FormInput
          controlProps={{
            control,
            name: `curatorCreate.${index}.curatorAddress`,
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
    </>
  );
};
