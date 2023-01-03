import { Box, Paper, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { suppliers } from "src/api";
import {
  FormInputBase,
  FormSelectAsync,
} from "~modules-core/components";

type TProps = {
  orderDetail: any;
  callback: (supplier: any) => void;
};

export const WarehouseImportSupplierInfo: React.FC<TProps> = ({
  orderDetail,
  callback
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
          label="Nhà cung cấp"
          disabled={!withoutPurchaseInvoice}
          callback={withoutPurchaseInvoice ? callback : undefined}
          labelKey="supplierCode"
        />

        <FormInputBase
          name="address"
          label="Địa chỉ"
          value={orderDetail?.supplierAddress ||orderDetail?.address || ""}
          disabled
        />

        <FormInputBase
          name="taxCode"
          label="Mã số thuế"
          value={orderDetail?.suppliertaxCode || orderDetail?.taxCode || ""}
          disabled
        />
      </Box>
    </Paper>
  );
};
