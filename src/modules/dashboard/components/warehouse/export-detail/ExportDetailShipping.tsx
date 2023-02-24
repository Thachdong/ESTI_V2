import { Box, Paper, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { FormInput } from "~modules-core/components";
import { FormInputNumber } from "~modules-core/components/form-hooks/FormInputNumber";

type TProps = {
  exportStatus: number;
};

export const ExportDetailShipping: React.FC<TProps> = ({ exportStatus }) => {
  const { control } = useFormContext();

  return (
    <Box>
      <Typography className="text-sm font-medium mb-3">
        THÔNG TIN VẬN CHUYỂN
      </Typography>

      <Box className="grid gap-4 rounded p-3 bg-white">
        <FormInput
          controlProps={{
            control,
            name: "deliveryUnit",
          }}
          label="Đơn vị v/c"
          disabled={exportStatus > 0}
        />

        <FormInput
          controlProps={{
            control,
            name: "codeVD",
          }}
          label="Mã vận đơn"
          disabled={exportStatus > 0}
        />
        <FormInputNumber
          controlProps={{
            control,
            name: "packageNumber",
          }}
          label="Số kiện hàng"
          disabled={exportStatus > 0}
        />
        <FormInput
          controlProps={{
            control,
            name: "packageWeight",
          }}
          label="Khối lượng"
          disabled={exportStatus > 0}
        />
        <FormInputNumber
          controlProps={{
            control,
            name: "shippingFee",
          }}
          label="Cước phí"
          disabled={exportStatus > 0}
        />
      </Box>
    </Box>
  );
};
