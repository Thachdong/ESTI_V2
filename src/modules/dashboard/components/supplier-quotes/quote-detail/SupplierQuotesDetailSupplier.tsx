import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { suppliers } from "src/api";
import {
  AutoCompleteBase,
  FormInputBase,
  FormSelectAsync,
} from "~modules-core/components";
import { productTypes } from "~modules-core/constance";

export const SupplierQuotesDetailSupplier: React.FC = () => {
  const [supplierDetail, setSupplierDetail] = useState<any>();

  const { id } = useRouter().query;

  const { control, setValue } = useFormContext();

  const getProductTypesValue = useCallback(() => {
    const { productSupply } = supplierDetail || {};

    return !productSupply
      ? []
      : productSupply?.split?.(",")?.map?.((prod: any) => +prod);
  }, [supplierDetail?.productSupply]);

  useEffect(() => {
    if (!!supplierDetail) {
      setValue("supplierCode", supplierDetail?.supplierCode);
    } else {
      setValue("supplierCode", null);
    }
  }, [supplierDetail]);

  return (
    <Box className="grid lg:grid-cols-2 gap-4">
      <Box>
        <Typography className="font-bold uppercase mb-3 text-sm">
          THÔNG TIN NHÀ CUNG CẤP
        </Typography>

        <Box className="grid gap-4 bg-white rounded p-3 mb-4">
          <FormSelectAsync
            controlProps={{
              name: "supplierId",
              control,
              rules: { required: "Phải chọn nhà cung cấp" },
            }}
            label="Nhà cung cấp:"
            fetcher={suppliers.getList}
            labelKey="supplierCode"
            getOptionLabel={(opt: any) =>
              !!opt ? `${opt?.supplierCode} - ${opt?.supplierName}` : ""
            }
            callback={(opt) => setSupplierDetail(opt)}
            disabled={!!id}
          />

          <FormInputBase
            label="Địa chỉ"
            value={supplierDetail?.address}
            disabled
          />

          <FormInputBase
            label="Mã số thuế"
            value={supplierDetail?.taxCode}
            disabled
          />

          <AutoCompleteBase
            label="Nhóm sản phẩm cung cấp"
            value={getProductTypesValue()}
            labelKey="name"
            onChange={() => undefined}
            multiple
            options={productTypes}
            disabled
          />
        </Box>
      </Box>

      <Box>
        <Typography className="font-bold uppercase mb-3 text-sm">
          Thông tin liên hệ
        </Typography>

        <Box className="grid gap-4 bg-white rounded p-3">
          <FormInputBase
            label="Người phụ trách"
            value={supplierDetail?.curatorName}
            disabled
          />

          <FormInputBase
            label="Chức vụ"
            value={supplierDetail?.curatorPositionName}
            disabled
          />

          <FormInputBase
            label="Điện thoại"
            value={supplierDetail?.curatorPhone}
            disabled
          />

          <FormInputBase
            label="Email"
            value={supplierDetail?.curatorEmail}
            disabled
          />
        </Box>
      </Box>
    </Box>
  );
};
