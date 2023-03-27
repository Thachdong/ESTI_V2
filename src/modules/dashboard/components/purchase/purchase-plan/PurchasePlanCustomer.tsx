import { Box, Typography } from "@mui/material";
import _ from "lodash";
import { useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { suppliers } from "src/api";
import {
  FormInputBase,
  FormSelect,
  FormSelectAsync,
} from "~modules-core/components";
import { productTypes } from "~modules-core/constance";

type TProps = {
  disabled: boolean;
  type: string;
  defaultSupplier: boolean;
};

export const PurchasePlanCustomer: React.FC<TProps> = ({
  disabled,
  type,
  defaultSupplier,
}) => {
  const [supplier, setSupplier] = useState<any>();

  const { control, watch } = useFormContext();

  const { productId, supplierId } = watch();

  // DATA FETCHING
  const { data: supplierList } = useQuery(
    ["SupplierList", type, productId],
    () => suppliers.getByProductId(productId as string).then((res) => res.data),
    {
      enabled: type !== "Add" && !supplierId && !!productId,
    }
  );

  // METHODS
  const convertProductSupply = useCallback((key: string) => {
    // input: string of list values (ex: "1,2,3")
    // output: array of labels (ex: ["text 1", "text 2", text 3])
    if (!key) return;

    const arr = key.split?.(",") || [];

    const productGroups = arr.map((item: string) =>
      productTypes.find((t: any) => t.id.toString() === item)
    );

    return _.compact(productGroups)
      .map((prod) => prod.name)
      .join(", ");
  }, []);

  const renderSupplierTag = useCallback(() => {
    if (type !== "Add" && !defaultSupplier) {
      return (
        <FormSelect
          controlProps={{
            name: "supplierId",
            control,
            rules: { required: "Phải chọn nhà cung cấp" },
          }}
          options={supplierList || []}
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
      );
    }

    return (
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
    );
  }, [type, defaultSupplier, supplierList]);

  return (
    <Box className="grid grid-cols-2 gap-3">
      <Box className="mb-3">
        <Typography className="font-semibold mb-2 text-sm">
          THÔNG TIN NHÀ CUNG CẤP
        </Typography>
        <Box className="grid gap-3">
          {renderSupplierTag()}

          <FormInputBase
            value={convertProductSupply(supplier?.productSupply)}
            label="Nhóm sản phẩm cung cấp:"
            disabled
            shrinkLabel
          />

          <FormInputBase
            value={supplier?.taxCode}
            label="Mã số thuế:"
            disabled
            shrinkLabel
          />

          <FormInputBase value={supplier?.address} label="Địa chỉ:" disabled shrinkLabel />
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
            shrinkLabel
          />

          <FormInputBase
            value={supplier?.curatorPositionName}
            label="Chức vụ:"
            disabled
            shrinkLabel
          />

          <FormInputBase
            value={supplier?.curatorPhone}
            label="Điện thoại:"
            disabled
            shrinkLabel
          />

          <FormInputBase
            value={supplier?.curatorEmail}
            label="Email:"
            disabled
            shrinkLabel
          />
        </Box>
      </Box>
    </Box>
  );
};
