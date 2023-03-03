import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { branchs, customer, staff } from "src/api";
import {
  FormImageGallery,
  FormInput,
  FormSelect,
  FormSelectAsync,
} from "~modules-core/components";
import {
  businessAreas,
  paymentExpiredIn,
  paymentTypes,
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
        className="grid grid-cols-2 !border-grey-2 !rounded-[4px] gap-3 mb-4"
      >
        <legend>Thông tin tài khoản:</legend>

        <FormSelect
          options={saleStaffs || []}
          controlProps={{
            control,
            name: "salesId",
            rules: { required: "Phải chọn sale phụ trách" },
          }}
          label="Sale Phụ trách"
          disabled={isDisable}
          labelKey="fullName"
          shrinkLabel
        />

        <FormSelect
          options={saleAdminStaffs}
          controlProps={{
            control,
            name: "salesAdminId",
            rules: { required: "Phải chọn sale admin phụ trách" },
          }}
          label="Sales Admin phụ trách"
          disabled={isDisable}
          labelKey="fullName"
          shrinkLabel
        />

        <FormSelect
          options={deliveryStaffs}
          controlProps={{
            control,
            name: "deliveryId",
            rules: { required: "Phải chọn giao nhận phụ trách" },
          }}
          label="Giao nhận phụ trách"
          disabled={isDisable}
          labelKey="fullName"
          shrinkLabel
        />

        <FormSelectAsync
          fetcher={branchs.getList}
          controlProps={{
            name: "branchId",
            control,
            rules: { required: "Phải chọn chi nhánh" },
          }}
          label="Chọn chi nhánh:"
          labelKey="code"
          disabled={isDisable}
          shrinkLabel
        />
      </Box>

      <Box
        component="fieldset"
        className="grid grid-cols-2 !border-grey-2 !rounded-[4px] gap-3 mb-4"
      >
        <legend>Thông tin doanh nghiệp:</legend>

        <FormInput
          controlProps={{
            control,
            name: "companyName",
            rules: { required: "Phải nhập tên doanh nghiệp / khách hàng" },
          }}
          label="Tên doanh nghiệp / khách hàng"
          disabled={isDisable}
          shrinkLabel
        />

        <FormSelect
          options={businessAreas}
          controlProps={{
            control,
            name: "professionId",
            rules: { required: "Phải nhập ngành nghề" },
          }}
          label="Ngành nghề"
          disabled={isDisable}
          shrinkLabel
        />

        <FormInput
          controlProps={{
            control,
            name: "taxCode",
            rules: { required: "Phải nhập mã số thuế" },
          }}
          label="Mã số thuế"
          disabled={isDisable}
          shrinkLabel
        />

        <FormInput
          controlProps={{
            control,
            name: "hotline",
            rules: { required: "Phải nhập hotline / số điện thoại" },
          }}
          label="Hotline / số điện thoại"
          disabled={isDisable}
          shrinkLabel
        />

        <FormInput
          controlProps={{
            control,
            name: "email",
            rules: { required: "Phải nhập email" },
          }}
          label="Email"
          disabled={isDisable}
          shrinkLabel
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
          shrinkLabel
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
          shrinkLabel
        />

        <FormInput
          controlProps={{ control, name: "website" }}
          label="Website"
          disabled={isDisable}
          shrinkLabel
        />

        <FormInput
          controlProps={{ control, name: "identityCard" }}
          label="Số CMND (khách hàng là cá nhân)"
          disabled={isDisable}
          shrinkLabel
        />

        <FormInput
          multiline
          minRows={3}
          controlProps={{
            control,
            name: "address",
          }}
          label="Địa chỉ"
          disabled={isDisable}
          shrinkLabel
        />

        <FormImageGallery
          loader={customer.uploadImage}
          controlProps={{ control, name: "identityCardImage" }}
          title="Tải ảnh CMND"
          className="mb-3"
        />
      </Box>
    </Box>
  );
};
