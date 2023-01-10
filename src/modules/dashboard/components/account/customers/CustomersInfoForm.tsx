import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { branchs, staff } from "src/api";
import {
  FormInput,
  FormSelect,
  FormSelectAsync,
} from "~modules-core/components";
import {
  paymentExpiredIn,
  paymentTypes,
  productTypes,
} from "~modules-core/constance";

type TProps = {
  isDisable: boolean;
};

export const CustomersInfoForm: React.FC<TProps> = ({ isDisable }) => {
  const context = useFormContext();

  const { control } = context;

  const { data: deliveryStaffs } = useQuery(["deliveryStaffs"], () =>
    staff.getListDeliveryStaff().then((res) => res.data)
  );

  const { data: saleAdminStaffs } = useQuery(["saleAdminStaffs"], () =>
    staff.getListSaleAdmin().then((res) => res.data)
  );

  const { data: saleStaffs } = useQuery(["saleStaffs"], () =>
    staff.getListSale().then((res) => res.data)
  );

  return (
    <Box>
      <Box
        component="fieldset"
        className="grid grid-cols-2 !border-grey-2 !rounded-[4px] gap-4 mb-4"
      >
        <legend>Thông tin tài khoản:</legend>

        <FormSelectAsync
          fetcher={branchs.getList}
          controlProps={{
            control,
            name: "branchId",
            rules: { required: "Phải nhập chọn chi nhánh" },
          }}
          label="Chi nhánh"
          disabled={isDisable}
          getOptionLabel={option => option?.code}
          labelKey="code"
        />

        <FormSelect
          options={saleStaffs || []}
          controlProps={{
            control,
            name: "saleId",
            rules: { required: "Phải chọn sale phụ trách" },
          }}
          label="Sale Phụ trách"
          disabled={isDisable}
          getOptionLabel={(option) => option?.fullName}
        />

        <FormSelect
          options={saleAdminStaffs}
          controlProps={{
            control,
            name: "saleAdminId",
            rules: { required: "Phải chọn sale admin phụ trách" },
          }}
          label="Sales Admin phụ trách"
          disabled={isDisable}
          getOptionLabel={(option) => option?.fullName}
        />

        <FormSelect
          options={deliveryStaffs}
          controlProps={{
            control,
            name: "deliveryStaffId",
            rules: { required: "Phải chọn giao nhận phụ trách" },
          }}
          label="Giao nhận phụ trách"
          disabled={isDisable}
          getOptionLabel={(option) => option?.fullName}
        />
      </Box>

      <Box
        component="fieldset"
        className="grid grid-cols-2 !border-grey-2 !rounded-[4px] gap-4 mb-4"
      >
        <legend>Thông tin doanh nghiệp:</legend>

        <FormInput
          controlProps={{
            control,
            name: "taxCode",
            rules: { required: "Phải nhập mã số thuế " },
          }}
          label="Mã số thuế"
          disabled={isDisable}
        />

        <FormSelect
          options={productTypes}
          controlProps={{ control, name: "productSupply" }}
          label="Nhóm sản phẩm cung cấp"
          disabled={isDisable}
          multiple
        />

        <FormInput
          controlProps={{ control, name: "phone" }}
          label="Số điện thoại"
          disabled={isDisable}
        />

        <FormInput
          controlProps={{ control, name: "email" }}
          label="Email"
          disabled={isDisable}
        />

        <FormSelect
          options={paymentTypes}
          controlProps={{
            control,
            name: "paymentType",
            rules: { required: "Phải chọn hình thức thanh toán" },
          }}
          label="Hình thức thanh toán"
          disabled={isDisable}
        />

        <FormSelect
          options={paymentExpiredIn}
          controlProps={{
            control,
            name: "paymentLimit",
            rules: { required: "Phải chọn thời hạn thanh toán" },
          }}
          label="Thời hạn thanh toán"
          disabled={isDisable}
        />

        <FormInput
          multiline
          minRows={3}
          controlProps={{ control, name: "address" }}
          label="Địa chỉ"
          disabled={isDisable}
        />

        <FormInput
          multiline
          minRows={3}
          controlProps={{ control, name: "website" }}
          label="Website"
          disabled={isDisable}
        />
      </Box>
    </Box>
  );
};
