import { Box, Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { suppliers } from "src/api";
import { FormInputBase, FormSelectAsync } from "~modules-core/components";

type TProps = {
  supplierData: any;
};

export const WarehouseImportSupplierInfo: React.FC<TProps> = ({
  supplierData,
}) => {
  // LOCAL STATE AND EXTRACT PROPS
  const [selectedSupplier, setSelectedSupplier] = useState<any>();

  const {query} = useRouter();

  const { control, watch } = useFormContext();

  const withoutPurchaseInvoice = watch("withoutPurchaseInvoice");

  const supplier = withoutPurchaseInvoice ? selectedSupplier : supplierData;

  // DOM RENDERING
  return (
    <Box className="grid grid-cols-2 gap-4 my-4">
      <Paper className="rounded-sm p-3">
        <Typography className="text-sm font-medium mb-3">
          THÔNG TIN NHÀ CUNG CẤP
        </Typography>

        <Box className="grid gap-4">
          {withoutPurchaseInvoice && !query.id ? (
            <FormSelectAsync
              fetcher={suppliers.getList}
              controlProps={{
                control,
                name: "supplierId",
              }}
              label="Nhà cung cấp"
              callback={(option) => setSelectedSupplier(option)}
              labelKey="supplierCode"
            />
          ) : (
            <Box className="grid grid-cols-3 gap-4">
              <FormInputBase
                value={supplier?.supplierCode || supplier?.code}
                label="Mã nhà cung cấp"
                disabled
              />
              <FormInputBase
                label="Tên nhà cung cấp"
                className="col-span-2"
                disabled
                value={supplier?.supplierName || supplier?.name}
              />
            </Box>
          )}

          <FormInputBase
            name="address"
            label="Địa chỉ"
            value={supplier?.supplierAddress || supplier?.address}
            disabled
          />

          <FormInputBase
            name="taxCode"
            label="Mã số thuế"
            value={supplier?.suppliertaxCode || supplier?.taxCode}
            disabled
          />
        </Box>
      </Paper>

      <Paper className="rounded-sm p-3">
        <Typography className="text-sm font-medium mb-3">
          THÔNG TIN LIÊN HỆ
        </Typography>

        <Box className="grid gap-4">
          <FormInputBase
            name="name"
            label="Người phụ trách"
            value={supplier?.curatorName}
            disabled
          />

          <FormInputBase
            name="phone"
            label="Điện thoại"
            value={supplier?.curatorPhone}
            disabled
          />

          <FormInputBase
            name="email"
            label="Email"
            value={supplier?.curatorEmail}
            disabled
          />
        </Box>
      </Paper>
    </Box>
  );
};