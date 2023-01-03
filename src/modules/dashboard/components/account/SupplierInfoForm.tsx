import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form";
import {  useQuery } from "react-query";
import { staff } from "src/api";
import { FormInput, FormSelect, FormSelectMultiple } from "~modules-core/components";
import {
  paymentExpiredIn,
  paymentTypes,
  productTypes,
} from "~modules-core/constance";

type TProps = {
  isDisable: boolean;
}

export const SupplierInfoForm: React.FC<TProps> = ({isDisable}) => {  
  const context = useFormContext();

  const {control} = context;

  const {data: deliveryStaffs} = useQuery(["deliveryStaffs"], () => staff.getListDeliveryStaff().then(res => res.data));

  const {data: saleAdminStaffs} = useQuery(["saleAdminStaffs"], () => staff.getListSaleAdmin().then(res => res.data));
  
  return (
    <Box>
      <Box
        component="fieldset"
        className="grid grid-cols-2 !border-grey-2 !rounded-[4px] gap-4 mb-4"
      >
        <legend>Thông tin doanh nghiệp:</legend>

        <FormInput
          controlProps={{
            control,
            name: "supplierName",
            rules: { required: "Phải nhập tên công ty" },
          }}
          label="Tên công ty"
          disabled={isDisable}
        />

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
          className="col-span-2"
          disabled={isDisable}
        />
      </Box>

      <Box
        component="fieldset"
        className="grid grid-cols-2 !border-grey-2 !rounded-[4px] gap-4 mb-4"
      >
        <legend>Thông tin tài khoản thanh toán:</legend>

        <FormInput
          controlProps={{
            control,
            name: "cardNumber",
            rules: { required: "Phải nhập số tài khoản" },
          }}
          label="Số tài khoản"
          disabled={isDisable}
        />

        <FormInput
          controlProps={{
            control,
            name: "cardOwner",
            rules: { required: "Phải nhập tên tài khoản " },
          }}
          label="Tên tài khoản"
          disabled={isDisable}
        />

        <FormInput
          controlProps={{
            control,
            name: "bankName",
            rules: { required: "Phải nhập tên ngân hàng*" },
          }}
          label="Tên ngân hàng"
          className="col-span-2"
          disabled={isDisable}
        />
      </Box>

      <Box
        component="fieldset"
        className="grid grid-cols-2 !border-grey-2 !rounded-[4px] gap-4 mb-[100px]"
      >
        <legend>Nhân viên phụ trách:</legend>

        <FormSelect
          options={saleAdminStaffs || []}
          controlProps={{
            control,
            name: "salesAdminID",
            rules: { required: "Phải chọn nhân viên phụ trách" },
          }}
          label="Nhân viên phụ trách"
          getOptionLabel={option => option?.fullName}
          disabled={isDisable}
        />

        <FormSelect
          options={deliveryStaffs || []}
          controlProps={{
            control,
            name: "deliveryID",
            rules: { required: "Phải chọn giao nhận phụ trách" },
          }}
          label="Giao nhận phụ trách"
          getOptionLabel={option => option?.fullName}
          disabled={isDisable}
        />
      </Box>
    </Box>
  );
};
