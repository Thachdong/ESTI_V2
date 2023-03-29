import { Box, Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { suppliers } from "src/api";
import { FormInputBase, FormSelectAsync } from "~modules-core/components";

type TProps = {
  supplierData: any;
};

export const ImportDetailSupplierInfo: React.FC<TProps> = ({
  supplierData,
}) => {
  // LOCAL STATE AND EXTRACT PROPS
  const [selectedSupplier, setSelectedSupplier] = useState<any>();

  const { query } = useRouter();

  const { control, watch } = useFormContext();

  const withoutPurchaseInvoice = watch("withoutPurchaseInvoice");

  const supplier = selectedSupplier ? selectedSupplier : supplierData;

  // DOM RENDERING
  return (
    <Box className="grid lg:grid-cols-2 gap-4 my-4">
      <Box className="">
        <Typography className="text-sm font-semibold mb-3 ">
          THÔNG TIN NHÀ CUNG CẤP
        </Typography>

        <Box className="grid gap-3 rounded p-3 bg-white">
          {withoutPurchaseInvoice && !query.id ? (
            <FormSelectAsync
              fetcher={suppliers.getList}
              controlProps={{
                control,
                name: "supplierId",
              }}
              label="Nhà cung cấp"
              callback={(option) => setSelectedSupplier(option)}
              getOptionLabel={(opt: any) =>
                !!opt ? `${opt.supplierCode} - ${opt.supplierName}` : ""
              }
            />
          ) : (
            <Box className="grid grid-cols-3 gap-3">
              <FormInputBase
                value={supplier?.supplierCode || supplier?.code}
                label="Mã NCC"
                disabled
              />
              <FormInputBase
                label="Tên NCC"
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
            value={supplier?.supplierTaxCode || supplier?.taxCode}
            disabled
          />
        </Box>
      </Box>

      <Box className="">
        <Typography className="text-sm font-semibold mb-3">
          THÔNG TIN LIÊN HỆ
        </Typography>

        <Box className="grid gap-3 rounded p-3 bg-white">
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
      </Box>
    </Box>
  );
};
