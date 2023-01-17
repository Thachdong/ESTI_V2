import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { branchs, staff } from "src/api";
import {
  FormInputBase,
  FormSelect,
  FormSelectAsync,
} from "~modules-core/components";

export const QuoteDetailGeneral: React.FC = () => {
  const { control } = useFormContext();

  const { data: saleStaff } = useQuery(["saleStaffList"], () =>
    staff.getListSale().then((res) => res.data)
  );

  return (
    <Box className="flex flex-col">
      <Typography className="font-bold uppercase mb-3">
        THÔNG TIN CHUNG
      </Typography>

      <Box className="grid grid-cols-2 gap-4 bg-white rounded-sm p-3">
        <FormSelectAsync
          controlProps={{
            name: "branchId",
            control: control,
            rules: { required: "Phải chọn chi nhánh" },
          }}
          fetcher={branchs.getList}
          label="CN thực hiện"
        />

        <FormSelect
          options={saleStaff || []}
          label="Sales phụ trách"
          controlProps={{
            name: "salesId",
            control,
            rules: { required: "Phải chọn sale phụ trách" },
          }}
          labelKey="code"
        />
      </Box>
    </Box>
  );
};
