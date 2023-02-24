import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useQueries } from "react-query";
import { staff } from "src/api";
import { FormSelect } from "~modules-core/components";

type TProps = {
  disabled: boolean;
};

export const OrderDetailImplement: React.FC<TProps> = ({ disabled }) => {
  const { control } = useFormContext();

  // DATA FETCHING
  const selectOptions = useQueries([
    {
      queryKey: "SaleAdminList",
      queryFn: () => staff.getListSaleAdmin().then((res) => res.data),
    },
    {
      queryKey: "SaleList",
      queryFn: () => staff.getListSale().then((res) => res.data),
    },
    {
      queryKey: "DeliveryStaffList",
      queryFn: () => staff.getListDeliveryStaff().then((res) => res.data),
    },
  ]);

  return (
    <Box className="flex flex-col">
      <Typography className="font-bold uppercase mb-3 text-sm">
        PHÂN CÔNG VIỆC
      </Typography>

      <Box className="bg-white rounded flex-grow p-3">
        <FormSelect
          options={selectOptions[0]?.data as []}
          controlProps={{
            name: "salesAdminId",
            control,
            rules: { required: "Phải chọn sale admin" },
          }}
          label="Sale admin:"
          labelKey="fullName"
          className="mb-4"
          disabled={disabled}
        />

        <FormSelect
          options={selectOptions[1]?.data as []}
          controlProps={{
            name: "salesId",
            control,
            rules: { required: "Phải chọn sale" },
          }}
          label="Sale:"
          labelKey="fullName"
          className="mb-4"
          disabled={disabled}
        />

        <FormSelect
          options={selectOptions[2]?.data as []}
          controlProps={{
            name: "deliveryId",
            control,
            rules: { required: "Phải chọn giao nhận" },
          }}
          label="Giao nhận:"
          labelKey="fullName"
          disabled={disabled}
        />
      </Box>
    </Box>
  );
};
