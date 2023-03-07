import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { products, stamp, TProduct } from "src/api";
import {
  Dialog,
  FormInput,
  FormSelect,
  FormSelectAsync,
} from "~modules-core/components";
import { productTypesStamp } from "~modules-core/constance";
import { TDialog } from "~types/dialog";
import { StampButtons } from "./StampButtons";

export const StampDialog: React.FC<TDialog> = ({
  onClose,
  open,
  type,
  refetch,
  defaultValue,
}) => {
  const [isUpdate, setIsUpdate] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<TProduct>();

  const methods = useForm<any>({
    mode: "onBlur",
  });

  const { reset, control, watch, setValue } = methods;

  const disabled = type === "View" || type === "ViewLabel";

  const labelType = watch("labelType");

  const { data: stampDetail, refetch: refetchDetail } = useQuery(
    ["StampDetail", defaultValue?.id],
    () => stamp.getById(defaultValue?.id).then((res) => res.data),
    {
      enabled: !!defaultValue?.id,
    }
  );

  // SIDE EFFECTS
  useEffect(() => {
    if (type === "Add") {
      reset({});
    } else {
      const {
        id,
        labelType = 1,
        productId,
        productCode,
        productName,
        origin,
        manufactor,
        specs,
        chemicalName,
        casCode,
      } = stampDetail || {};

      reset({
        id,
        labelType,
        productId,
        productCode,
        productName,
        origin,
        manufactor,
        specs,
        chemicalName,
        casCode,
      });
    }
  }, [type, stampDetail]);

  useEffect(() => {
    if (type === "Add") {
      setValue("productId", "");

      setSelectedProduct(undefined);
    }
  }, [labelType, type]);

  useEffect(() => {
    if (selectedProduct) {
      const { manufactor, specs, origin, chemicalName, casCode } =
        selectedProduct;

      setValue("manufactor", manufactor);
      setValue("specs", specs);
      setValue("origin", origin);
      setValue("chemicalName", chemicalName);
      setValue("casCode", casCode);
      setValue("labelType", labelType);
    }
  }, [selectedProduct]);

  // CREATE TITLE BASE ON DIALOG TYPE
  const title =
    type === "Add" || type === "CreateLabel"
      ? "Thêm nhãn sản phẩm"
      : type === "View" && isUpdate
      ? "Cập nhật nhãn sản phẩm"
      : "Thông tin nhãn sản phẩm";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      title={title}
      headerClassName="text-center"
    >
      <FormProvider {...methods}>
        <Box component="form">
          <Box className="grid gap-4">
            <FormSelect
              options={productTypesStamp}
              controlProps={{
                control,
                name: "labelType",
                rules: { required: "Phải chọn nhóm sản phẩm" },
              }}
              label="Nhóm sản phẩm"
              disabled={disabled}
            />
            <FormSelectAsync
              fetcher={products.getList}
              fetcherParams={{ labelType }}
              controlProps={{
                control,
                name: "productId",
                rules: { required: "Phải chọn mã sản phẩm" },
              }}
              label="Mã sản phẩm"
              callback={(opt) => setSelectedProduct(opt)}
              disabled={disabled || !labelType}
              labelKey="productCode"
            />

            <FormSelectAsync
              fetcher={products.getList}
              fetcherParams={{ labelType }}
              controlProps={{
                control,
                name: "productId",
                rules: { required: "Phải chọn tên sản phẩm" },
              }}
              label="Tên sản phẩm"
              callback={(opt) => setSelectedProduct(opt)}
              disabled={disabled || !labelType}
              labelKey="productName"
            />

            <FormInput
              controlProps={{
                control,
                name: "manufactor",
              }}
              label="Hãng sản xuất"
              disabled={true}
            />

            <FormInput
              controlProps={{
                control,
                name: "origin",
              }}
              label="Xuất xứ"
              disabled={true}
            />

            {labelType !== 3 && (
              <FormInput
                controlProps={{
                  control,
                  name: "specs",
                }}
                label="Quy cách"
                disabled={true}
              />
            )}

            {labelType === 1 && (
              <FormInput
                controlProps={{
                  name: "chemicalName",
                  control,
                }}
                label="Công thức hóa học"
                disabled={disabled && !isUpdate}
              />
            )}

            <FormInput
              controlProps={{
                name: "casCode",
                control,
              }}
              label="Mã CAS"
              disabled={disabled && !isUpdate}
            />
          </Box>

          <Box className="flex justify-center items-center mt-4">
            <StampButtons
              type={type}
              isUpdate={isUpdate}
              onClose={onClose}
              refetch={refetch}
              refetchDetail={refetchDetail}
              setIsUpdate={setIsUpdate}
            />
          </Box>
        </Box>
      </FormProvider>
    </Dialog>
  );
};
