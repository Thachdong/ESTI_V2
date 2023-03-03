import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useQueries } from "react-query";
import { customer, staff } from "src/api";
import { FormAvatar, FormSelect } from "~modules-core/components";

type TProps = {
  isUpdate: boolean;
};

export const CustomerDetailAccount: React.FC<TProps> = ({ isUpdate }) => {
  const { control } = useFormContext();

  const options = useQueries([
    {
      queryKey: "SaleList",
      queryFn: () => staff.getListSale().then((res) => res.data),
    },
    {
      queryKey: "SaleAdminList",
      queryFn: () => staff.getListSaleAdmin().then((res) => res.data),
    },
    {
      queryKey: "DeliveryList",
      queryFn: () => staff.getListDeliveryStaff().then((res) => res.data),
    },
  ]);

  return (
    <Box className="flex flex-col mb-4">
      <Typography className="font-bold uppercase mb-3 text-sm">
        Thông tin tài khoản
      </Typography>

      <Box className="grid grid-cols-3 gap-4 bg-white rounded flex-grow p-3">
        <Box className="grid gap-4 col-span-2">
          <FormSelect
            options={options[0]?.data || []}
            controlProps={{
              control,
              name: "salesId",
              rules: { required: "Phải chọn sale phụ trách" },
            }}
            label="Sale Phụ trách"
            labelKey="fullName"
            disabled={!isUpdate}
          />

          <FormSelect
            options={options[1]?.data || []}
            controlProps={{
              control,
              name: "salesAdminId",
              rules: { required: "Phải chọn sale admin phụ trách" },
            }}
            label="Sales Admin phụ trách"
            labelKey="fullName"
            disabled={!isUpdate}
          />

          <FormSelect
            options={options[2]?.data || []}
            controlProps={{
              control,
              name: "deliveryId",
              rules: { required: "Phải chọn giao nhận phụ trách" },
            }}
            label="Giao nhận phụ trách"
            labelKey="fullName"
            disabled={!isUpdate}
          />
        </Box>

        <Box className="flex items-center justify-center">
          <FormAvatar
            loader={customer.uploadImage}
            controlProps={{ control, name: "avatar" }}
            label="Ảnh đại diện"
            disabled={!isUpdate}
          />
        </Box>
      </Box>
    </Box>
  );
};
