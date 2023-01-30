import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { staff } from "src/api";
import { FormInput, FormSelect } from "~modules-core/components";
import { FormCheckbox } from "~modules-core/components/form-hooks/FormCheckbox";
import { curatorDepartments, genderData } from "~modules-core/constance";

type TProps = {
  isDisable: boolean;
};

export const CustomersReceiveInfoForm: React.FC<TProps> = ({ isDisable }) => {
  const { control } = useFormContext();

  const { data: saleAdminStaffs } = useQuery(["saleAdminStaffs"], () =>
    staff.getListSaleAdmin().then((res) => res.data)
  );

  return (  
    <Box>
      <Box
        component="fieldset"
        className="grid grid-cols-2 !border-grey-2 !rounded-[4px] gap-4 mb-4"
      >
        <legend>Thông tin người liên hệ:</legend>

        <FormInput
          controlProps={{
            control,
            name: "curatorName",
            rules: { required: "Phải nhập tên người liên hệ" },
          }}
          label="Tên người liên hệ"
          disabled={isDisable}
        />

        <FormSelect
          options={curatorDepartments}
          controlProps={{
            control,
            name: "curatorDepartment",
            rules: { required: "Phải chọn phòng ban" },
          }}
          label="Phòng ban"
          disabled={isDisable}
        />

        <FormSelect
          options={saleAdminStaffs || []}
          controlProps={{
            control,
            name: "salesAdminID",
            rules: { required: "Phải chọn nhân viên phụ trách" },
          }}
          label="Nhân viên phụ trách"
          disabled={isDisable}
          getOptionLabel={(option) => option?.fullName}
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
            name: "curatorEmail",
          }}
          label="Email"
          required={false}
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
          className="col-span-2"
        />
      </Box>

      <Box
        component="fieldset"
        className="grid grid-cols-2 !border-grey-2 !rounded-[4px] gap-4 mb-[100px]"
      >
        <legend>Thông tin người nhận hàng:</legend>

        <FormCheckbox
          controlProps={{
            control,
            name: "checkbox",
          }}
          label="Cùng thông tin người liên hệ"
          disabled={isDisable}
          className="col-span-2"
        />

        <FormInput
          controlProps={{
            control,
            name: "receiverName",
            rules: { required: "Phải nhập họ tên người nhận hàng" },
          }}
          label="Họ tên người nhận hàng"
          disabled={isDisable}
        />

        <FormInput
          controlProps={{
            control,
            name: "receiverEmail",
          }}
          label="Email"
          required={false}
          disabled={isDisable}
        />

        <FormInput
          controlProps={{
            control,
            name: "curatorPhone1",
            rules: { required: "Phải nhập số điện thoại 1" },
          }}
          label="Số điện thoại 1"
          disabled={isDisable}
        />

        <FormInput
          controlProps={{
            control,
            name: "curatorPhone2",
            rules: { required: "Phải nhập số điện thoại 2" },
          }}
          label="Số điện thoại 2"
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
          className="col-span-2"
        />
      </Box>
    </Box>
  );
};
