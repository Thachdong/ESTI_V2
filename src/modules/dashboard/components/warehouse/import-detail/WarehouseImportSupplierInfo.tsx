import { Box, Paper, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { suppliers } from "src/api";
import {
  FormInputBase,
  FormSelectAsync,
} from "~modules-core/components";

type TProps = {
  orderDetail: any;
};

export const WarehouseImportSupplierInfo: React.FC<TProps> = ({
  orderDetail,
}) => {
  const { control, watch } = useFormContext();

  const withoutPurchaseInvoice = watch("withoutPurchaseInvoice");

  return (
    <Paper className="rounded-sm p-3">
      <Typography className="text-sm font-medium mb-3">
        THÔNG TIN NHÀ CUNG CẤP
      </Typography>

      <Box className="grid gap-4">
        <FormSelectAsync
          fetcher={suppliers.getList}
          controlProps={{
            control,
            name: "supplierId",
          }}
          selectShape={{ valueKey: "id", labelKey: "supplierCode" }}
          label="Nhà cung cấp"
          disabled={!withoutPurchaseInvoice}
        />

        <FormInputBase
          name="address"
          label="Địa chỉ"
          value={orderDetail?.supplierAddress || ""}
          disabled
        />

        <FormInputBase
          name="taxCode"
          label="Mã số thuế"
          value={orderDetail?.suppliertaxCode || ""}
          disabled
        />
      </Box>
    </Paper>
  );
};
