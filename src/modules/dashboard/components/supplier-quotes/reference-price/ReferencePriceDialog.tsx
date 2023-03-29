import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import {
  products,
  referencePrice,
  suppliers,
  TCreateReferencePrice,
  TUpdateReferencePrice,
} from "src/api";
import {
  BaseButton,
  Dialog,
  FormDatepicker,
  FormInput,
  FormInputNumber,
  FormSelect,
  FormSelectAsync,
} from "~modules-core/components";
import { referencePriceProductStatus, VAT } from "~modules-core/constance";
import { toast } from "~modules-core/toast";
import { TDialog } from "~types/dialog";

export const ReferencePriceDialog: React.FC<TDialog> = ({
  type,
  onClose,
  open,
  refetch,
  defaultValue,
}) => {
  const [isUpdate, setIsUpdate] = useState(false);

  const {
    control,
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = useForm();

  const { supplierId } = watch();

  const title =
    type === "Add"
      ? "Tạo giá tham khảo"
      : type === "View" && isUpdate
      ? "Cập nhật giá tham khảo"
      : "Thông tin giá tham khảo";

  const disabled = type === "View" && !isUpdate;

  // SIDE EFFECTS
  useEffect(() => {
    if (!supplierId) {
      setValue("productId", "");
    }
  }, [supplierId]);

  useEffect(() => {
    if (type === "Add") {
      reset({});
    } else {
      const {
        supplierId,
        productId,
        quantity,
        price,
        productStatus,
        expireDate,
        vat,
        productStatusType,
        id,
      } = defaultValue || {};

      reset({
        supplierId,
        productId,
        quantity,
        price,
        productStatus,
        expireDate,
        vat,
        productStatusType,
        id,
      });
    }
  }, [type, defaultValue]);

  // DATA FETCHING
  const { data: productList } = useQuery(
    ["ProductList", supplierId],
    () => products.getBySupplierId(supplierId).then((res) => res.data),
    {
      enabled: !!supplierId,
    }
  );

  // METHODS
  const mutateAdd = useMutation(
    (payload: TCreateReferencePrice) => referencePrice.create(payload),
    {
      onSuccess: (data: any) => {
        toast.success(data?.resultMessage);

        refetch?.();

        reset({});

        onClose();
      },
    }
  );

  const handeAddReferencePrice = useCallback(async (data: any) => {
    await mutateAdd.mutateAsync({ ...data });
  }, []);

  const mutateUpdate = useMutation(
    (payload: TUpdateReferencePrice) => referencePrice.update(payload),
    {
      onSuccess: (data: any) => {
        toast.success(data?.resultMessage);

        setIsUpdate(false);

        refetch?.();

        reset({});

        onClose();
      },
    }
  );

  const handleUpdateReferencePrice = useCallback(async (data: any) => {
    await mutateUpdate.mutateAsync({ ...data });
  }, []);

  const renderButtons = useCallback(() => {
    switch (true) {
      case type === "Add":
        return (
          <>
            <BaseButton
              onClick={handleSubmit(handeAddReferencePrice)}
              className="mr-2"
              disabled={!isDirty}
            >
              Tạo
            </BaseButton>
            <BaseButton type="button" className="!bg-main-1" onClick={onClose}>
              Đóng
            </BaseButton>
          </>
        );
      case type === "View" && isUpdate === false:
        return (
          <>
            <BaseButton
              type="button"
              className="mr-2"
              onClick={() => setIsUpdate(true)}
            >
              Cập nhật
            </BaseButton>
            <BaseButton type="button" className="!bg-main-1" onClick={onClose}>
              Đóng
            </BaseButton>
          </>
        );
      case type === "View" && isUpdate === true:
        return (
          <>
            <BaseButton
              onClick={handleSubmit(handleUpdateReferencePrice)}
              className="mr-2"
              disabled={!isDirty}
            >
              Cập nhật
            </BaseButton>
            <BaseButton
              type="button"
              className="!bg-main-1"
              onClick={() => setIsUpdate(false)}
            >
              Quay lại
            </BaseButton>
          </>
        );
      default:
        return <></>;
    }
  }, [type, isDirty, isUpdate]);

  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm" title={title}>
      <Box className="grid grid-cols-1 gap-4">
        <FormSelectAsync
          controlProps={{
            control,
            name: "supplierId",
            rules: { required: "Phải chọn NCC" },
          }}
          label={"Chọn NCC"}
          fetcher={suppliers.getList}
          getOptionLabel={(opt) =>
            !!opt ? `${opt?.supplierCode} - ${opt?.supplierName}` : ""
          }
          shrinkLabel
          disabled={type === "View"}
        />

        <FormSelect
          controlProps={{
            control,
            name: "productId",
            rules: { required: "Phải chọn SP" },
          }}
          label={"Chọn sản phẩm"}
          getOptionLabel={(opt) =>
            !!opt ? `${opt?.productCode} - ${opt?.productName}` : ""
          }
          shrinkLabel
          valueKey="productId"
          options={productList || []}
          disabled={!supplierId || type === "View"}
        />

        <FormInputNumber
          controlProps={{
            control,
            name: "quantity",
            rules: { required: "Phải nhập số lượng" },
          }}
          label={"Số lượng"}
          disabled={disabled}
          shrinkLabel
        />

        <FormInputNumber
          controlProps={{
            control,
            name: "price",
            rules: { required: "Phải nhập giá" },
          }}
          label={"Giá"}
          disabled={disabled}
          shrinkLabel
        />

        <FormInput
          controlProps={{
            control,
            name: "productStatus",
          }}
          label={"Tình trạng SP"}
          disabled={disabled}
          shrinkLabel
        />

        <FormDatepicker
          controlProps={{
            control,
            name: "expireDate",
          }}
          label={"Ngày hết liệu lực"}
          disabled={disabled}
        />

        <FormSelect
          controlProps={{
            control,
            name: "vat",
          }}
          label={"Thuế VAT"}
          options={VAT}
          disabled={disabled}
          shrinkLabel
        />

        <FormSelect
          controlProps={{
            control,
            name: "productStatusType",
          }}
          label={"Trạng thái SP"}
          options={referencePriceProductStatus}
          valueKey="value"
          labelKey="label"
          disabled={disabled}
          shrinkLabel
        />
      </Box>

      <Box className="flex items-center justify-end mt-4">
        {renderButtons()}
      </Box>
    </Dialog>
  );
};
