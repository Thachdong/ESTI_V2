import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useQueries } from "react-query";
import { staff } from "src/api";
import { FormSelect } from "~modules-core/components";

type TProps = {
  disabled: boolean;
};

export const PurchaseDetailImplement: React.FC<TProps> = ({ disabled }) => {
  const { control } = useFormContext();

  const selectOptions = useQueries([
    {
      queryKey: "SaleAdminList",
      queryFn: () => staff.getListSaleAdmin().then((res) => res.data),
    },
    {
      queryKey: "DeliveryStaffList",
      queryFn: () => staff.getListDeliveryStaff().then((res) => res.data),
    },
  ]);

  return (
    <Box className="flex flex-col mb-4">
      <Typography className="font-bold uppercase mb-3">
        PHÂN CÔNG VIỆC
      </Typography>

      <Box className="bg-white grid grid-cols-2 gap-4 rounded-sm flex-grow p-3">
        <FormSelect
          options={selectOptions[0].data || []}
          controlProps={{
            name: "salesAdminId",
            control,
            rules: { required: "Phải chọn admin phụ trách" },
          }}
          label="Admin phụ trách"
          labelKey="fullName"
        />

        <FormSelect
          options={selectOptions[1].data || []}
          controlProps={{
            name: "deliveryId",
            control,
            rules: { required: "Phải chọn giao nhận phụ trách" },
          }}
          label="Giao nhận phụ trách"
          labelKey="fullName"
        />
      </Box>
    </Box>
  );
};
