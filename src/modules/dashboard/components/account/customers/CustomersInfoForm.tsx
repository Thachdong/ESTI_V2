import { Box } from "@mui/material";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { branchs, customer, staff } from "src/api";
import {
  FormCheckbox,
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

export const CustomersInfoForm: React.FC = () => {
  const { control, watch } = useFormContext();

  const isNotCompany = watch("isNotCompany");

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
          labelKey="fullName"
          shrinkLabel
        />
      </Box>

      <Box
        component="fieldset"
        className="grid grid-cols-2 !border-grey-2 !rounded-[4px] gap-3 mb-4"
      >
        <legend>Thông tin doanh nghiệp:</legend>

        <FormCheckbox
          controlProps={{
            control,
            name: "isNotCompany",
          }}
          label={"Khách hàng là cá nhân"}
          className="col-span-2"
        />

        <FormInput
          controlProps={{
            control,
            name: "name",
            rules: { required: "Phải nhập tên doanh nghiệp / khách hàng" },
          }}
          label="Tên doanh nghiệp / khách hàng"
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
          shrinkLabel
        />

        {!isNotCompany && (
          <FormInput
            controlProps={{
              control,
              name: "taxCode",
              rules: { required: "Phải nhập mã số thuế" },
            }}
            label="Mã số thuế"
            shrinkLabel
          />
        )}

        <FormInput
          controlProps={{
            control,
            name: "hotline",
            rules: { required: "Phải nhập hotline / số điện thoại" },
          }}
          label="Hotline / số điện thoại"
          shrinkLabel
        />

        <FormInput
          controlProps={{
            control,
            name: "email",
            rules: { required: "Phải nhập email" },
          }}
          label="Email"
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
          shrinkLabel
        />

        <FormInput
          controlProps={{ control, name: "website" }}
          label="Website"
          shrinkLabel
        />

        {isNotCompany && (
          <FormInput
            controlProps={{ control, name: "identityCard" }}
            label="Số CMND (khách hàng là cá nhân)"
            shrinkLabel
          />
        )}

        <FormInput
          multiline
          minRows={3}
          controlProps={{
            control,
            name: "address",
          }}
          label="Địa chỉ"
          shrinkLabel
          className={clsx("col-span-2")}
        />

        {isNotCompany && (
          <FormImageGallery
            loader={customer.uploadImage}
            controlProps={{ control, name: "identityCardImage" }}
            title="Tải ảnh CMND"
            className="mb-3"
          />
        )}
      </Box>
    </Box>
  );
};
