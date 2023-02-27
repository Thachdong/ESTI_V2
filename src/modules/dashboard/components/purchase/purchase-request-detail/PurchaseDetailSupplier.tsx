import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import { suppliers } from "src/api";
import { FormInputBase, FormSelectAsync } from "~modules-core/components";
import { productTypes } from "~modules-core/constance";

export const PurchaseDetailSupplier: React.FC = () => {
  const [supplier, setSupplier] = useState<any>();

  const { id } = useRouter().query;

  const { control } = useFormContext();

  // METHODS
  const convertProductSupply = useCallback((key: string) => {
    if (typeof key === "string" && !!key) {
      return key
        .split(",")
        ?.map((item: string) => productTypes[+item + 1]?.name)
        ?.join(", ");
    }
  }, []);

  return (
    <Box className="grid grid-cols-2 gap-4 mb-4">
      <Box className="flex flex-col">
        <Typography className="font-bold uppercase mb-3 text-sm">
          THÔNG TIN NHÀ CUNG CẤP
        </Typography>

        <Box className="bg-white grid gap-3 rounded flex-grow p-3">
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
            disabled={!!id}
          />

          <FormInputBase label="Địa chỉ:" value={supplier?.address} disabled />

          <FormInputBase
            label="Mã số thuế:"
            value={supplier?.taxCode}
            disabled
          />

          <FormInputBase
            label="Nhóm sản phẩm cung cấp:"
            value={convertProductSupply(supplier?.productSupply)}
            disabled
          />
        </Box>
      </Box>

      <Box className="flex flex-col">
        <Typography className="font-bold uppercase mb-3 text-sm">
          THÔNG TIN LIÊN HỆ
        </Typography>

        <Box className="bg-white grid gap-3 rounded flex-grow p-3">
          <FormInputBase
            label="Người phụ trách:"
            value={supplier?.curatorName}
            disabled
          />

          <FormInputBase
            label="Chức vụ:"
            value={supplier?.curatorPositionName}
            disabled
          />

          <FormInputBase
            label="Điện thoại:"
            value={supplier?.curatorPhone}
            disabled
          />

          <FormInputBase
            label="Email:"
            value={supplier?.curatorEmail}
            disabled
          />
        </Box>
      </Box>
    </Box>
  );
};
