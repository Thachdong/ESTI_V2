import { Box, Typography } from "@mui/material";
import _ from "lodash";
import { useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import { suppliers } from "src/api";
import { FormInputBase, FormSelectAsync } from "~modules-core/components";
import { productTypes } from "~modules-core/constance";

type TProps = {
  disabled: boolean;
};

export const PurchasePlanCustomer: React.FC<TProps> = ({ disabled }) => {
  const [supplier, setSupplier] = useState<any>();

  const { control } = useFormContext();

  const convertProductSupply = useCallback((key: string) => {
    // convert data from [1,2,3] to ["text 1", "text 2", text 3]
    if (!key) return;

    const arr = key.split?.(",") || [];

    const productGroups = arr.map((item: string) =>
      productTypes.find((t: any) => t.id.toString() === item)
    );

    return _.compact(productGroups)
      .map((prod) => prod.name)
      .join(", ");
  }, []);

  return (
    <Box className="grid grid-cols-2 gap-3">
      <Box className="mb-3">
        <Typography className="font-semibold mb-2 text-sm">
          THÔNG TIN NHÀ CUNG CẤP
        </Typography>
        <Box className="grid gap-3">
          <FormSelectAsync
            fetcher={suppliers.getList}
            controlProps={{
              name: "supplierId",
              control,
              rules: { required: "Phải chọn nhà cung cấp" },
            }}
            callback={(opt) => setSupplier(opt)}
            label="Chọn nhà cung cấp:"
            getOptionLabel={(supplier: any) =>
              !!supplier
                ? supplier?.supplierCode + " - " + supplier?.supplierName
                : ""
            }
            disabled={disabled}
            shrinkLabel
          />

          <FormInputBase
            value={convertProductSupply(supplier?.productSupply)}
            label="Nhóm sản phẩm cung cấp:"
            disabled
          />

          <FormInputBase
            value={supplier?.taxCode}
            label="Mã số thuế:"
            disabled
          />

          <FormInputBase value={supplier?.address} label="Địa chỉ:" disabled />
        </Box>
      </Box>

      <Box className="mb-3">
        <Typography className="font-semibold text-sm mb-2">
          THÔNG TIN LIÊN HỆ
        </Typography>
        <Box className="grid gap-3">
          <FormInputBase
            value={supplier?.curatorName}
            label="Người phụ trách:"
            disabled
          />

          <FormInputBase
            value={supplier?.curatorPositionName}
            label="Chức vụ:"
            disabled
          />

          <FormInputBase
            value={supplier?.curatorPhone}
            label="Điện thoại:"
            disabled
          />

          <FormInputBase
            value={supplier?.curatorEmail}
            label="Email:"
            disabled
          />
        </Box>
      </Box>
    </Box>
  );
};
