import { Box, Typography } from "@mui/material";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import { customer } from "src/api";
import {
  FormImageGallery,
  FormInput,
  FormSelect,
} from "~modules-core/components";
import {
  businessAreas,
  paymentExpiredIn,
  paymentTypes,
} from "~modules-core/constance";

type TProps = {
  isUpdate: boolean;
};

export const CustomerDetailCompany: React.FC<TProps> = ({ isUpdate }) => {
  const { control, watch } = useFormContext();

  const taxCode = watch("taxCode");
    
  return (
    <Box className="flex flex-col mb-4">
      <Typography className="font-bold uppercase mb-3 text-sm">
        Thông tin doanh nghiệp
      </Typography>

      <Box className="grid lg:grid-cols-2 gap-4 bg-white rounded flex-grow p-3">
        <FormInput
          controlProps={{
            control,
            name: "name",
            rules: { required: "Phải nhập tên doanh nghiệp / khách hàng" },
          }}
          label="Tên doanh nghiệp / khách hàng"
          disabled={!isUpdate}
        />

        <FormSelect
          options={businessAreas}
          controlProps={{
            control,
            name: "professionId",
            rules: { required: "Phải nhập ngành nghề" },
          }}
          label="Ngành nghề"
          disabled={!isUpdate}
        />

        <FormInput
          controlProps={{
            control,
            name: "taxCode",
          }}
          label="Mã số thuế"
          disabled={!isUpdate}
        />

        <FormInput
          controlProps={{
            control,
            name: "hotline",
            rules: { required: "Phải nhập hotline / số điện thoại" },
          }}
          label="Hotline / số điện thoại"
          disabled={!isUpdate}
        />

        <FormInput
          controlProps={{
            control,
            name: "email",
            rules: { required: "Phải nhập email" },
          }}
          label="Email"
          disabled={!isUpdate}
        />

        <FormSelect
          options={paymentTypes}
          controlProps={{
            control,
            name: "paymentType",
            rules: { required: "Phải chọn hình thức thanh toán" },
          }}
          label="Hình thức thanh toán"
          disabled={!isUpdate}
        />

        <FormSelect
          options={paymentExpiredIn}
          controlProps={{
            control,
            name: "paymentLimit",
            rules: { required: "Phải chọn thời hạn thanh toán" },
          }}
          label="Thời hạn thanh toán"
          disabled={!isUpdate}
        />

        <FormInput
          controlProps={{ control, name: "website" }}
          label="Website"
          disabled={!isUpdate}
        />

        {!taxCode && (
          <FormInput
            controlProps={{ control, name: "identityCard" }}
            label="Số CMND"
            disabled={!isUpdate}
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
          disabled={!isUpdate}
        />
        {!taxCode && (
          <FormImageGallery
            loader={customer.uploadImage}
            controlProps={{ control, name: "identityCardImage" }}
            title="Tải ảnh CMND"
            className={clsx("mb-3", !isUpdate && "!bg-input-label")}
            disabled={!isUpdate}
          />
        )}
      </Box>
    </Box>
  );
};
