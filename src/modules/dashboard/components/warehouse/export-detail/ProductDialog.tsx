import { Box } from "@mui/material";
import { useQuery } from "react-query";
import { useForm, useFormContext } from "react-hook-form";
import {
  BaseButton,
  Dialog,
  FormInputBase,
  FormSelect,
  FormSelectAsync,
} from "~modules-core/components";
import { FormInputNumber } from "~modules-core/components/form-hooks/FormInputNumber";
import { TDialog } from "~types/dialog";
import { position, products, products as productsApi } from "src/api";
import { useEffect, useState } from "react";
import { toast } from "~modules-core/toast";
import _ from "lodash";

type TProps = {
  productOptions: any[];
  warehouseConfigId: string;
  productsOperator: any;
};

export const ProductDialog: React.FC<TDialog & TProps> = ({
  open,
  onClose,
  type,
  defaultValue,
  warehouseConfigId,
  productsOperator,
  productOptions,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<any>();

  const [selectedLot, setSelectedLot] = useState<any>();

  const [selectedPosition, setSelectedPosition] = useState<any>();

  const { control, handleSubmit, reset, setError, watch } = useForm();

  const { watch: globalWatch } = useFormContext();

  const isForDelete = globalWatch("isForDelete");

  const title = type === "Update" ? "Cập nhật sản phẩm" : "Thêm sản phẩm";

  // SIDE EFFECTS
  useEffect(() => {
    if (type === "Add") {
      reset();
    } else {
      reset({ ...defaultValue });
    }
  }, [type]);

  // DATA FETCHING
  const { data: lotOptions } = useQuery(
    [
      "getLotOptions_" + selectedProduct?.productId,
      { warehouseConfigId, id: selectedProduct?.productId },
    ],
    () =>
      productsApi
        .getLot(selectedProduct?.productId, warehouseConfigId)
        .then((res) => res.data),
    {
      // enabled: !!selectedProduct && !!warehouseConfigId,
    }
  );

  // METHODS
  const handleCreateProduct = (data: any) => {
    const { quantity } = data;

    if (quantity > selectedLot?.quantity) {
      setError("quantity", {
        type: "quantity",
        message: "Số lượng không được lớn hơn tồn kho!",
      });

      return;
    }

    const totalPrice = quantity * selectedProduct?.price;

    const product = {
      ...selectedProduct,
      id: new Date().getTime(),
      quantity,
      totalPrice,
      dateExpiration: selectedLot?.dateExpiration,
      dateManufacture: selectedLot?.dateManufacture,
      lotNumber: selectedLot?.lotNumber,
      positionId: selectedPosition?.positionId,
      positionName: selectedPosition?.positionName,
      selectedPosition,
    };

    productsOperator.addProduct({ ...product });

    toast.success("Thêm sản phẩm thành công!");

    reset();

    onClose();
  };

  const handleUpdateProduct = (data: any) => {
    const { quantity } = data;

    if (quantity > selectedLot?.quantity) {
      setError("quantity", {
        type: "quantity",
        message: "Số lượng không được lớn hơn tồn kho!",
      });

      return;
    }

    const totalPrice = quantity * selectedProduct?.price;

    const product = {
      ...defaultValue,
      quantity,
      totalPrice,
      dateExpiration: selectedLot?.dateExpiration,
      dateManufacture: selectedLot?.dateManufacture,
      lotNumber: selectedLot?.lotNumber,
      positionId: selectedPosition?.positionId,
      positionName: selectedPosition?.positionName,
      selectedPosition,
    };

    productsOperator.updateProduct(defaultValue?.id, { ...product });

    toast.success("Cập nhật sản phẩm thành công!");

    reset();

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      headerClassName="text-center"
      title={title}
    >
      <Box className="grid gap-4">
        {isForDelete ? (
          <FormSelectAsync
            fetcher={products.getList}
            controlProps={{
              control,
              name: "productId",
              rules: { required: "Phải chọn mã sản phẩm" },
            }}
            label="Mã sản phẩm"
            callback={(opt) => setSelectedProduct(opt)}
            labelKey="productCode"
          />
        ) : (
          <FormSelect
            controlProps={{
              control,
              name: "productId",
              rules: { required: "Phải chọn mã sản phẩm" },
            }}
            options={productOptions}
            label="Mã sản phẩm"
            callback={(opt) => setSelectedProduct(opt)}
            getOptionLabel={option => option?.productCode}
          />
        )}

        <FormSelect
          controlProps={{
            control,
            name: "lotNumber",
            rules: { required: "Phải chọn lot" },
          }}
          options={lotOptions || []}
          label="Chọn LOT"
          callback={(opt) => setSelectedLot(opt)}
          getOptionLabel={option => option?.lotNumber}
          valueKey="lotNumber"
        />

        <FormInputBase value={selectedLot?.quantity} label="Tồn kho" disabled />

        <FormSelectAsync
          controlProps={{
            control,
            name: "positionId",
            rules: { required: "Phải chọn vị trí" },
          }}
          fetcher={position.getProductsByPositionId}
          fetcherParams={{ lotNumber: selectedLot?.lotNumber }}
          callback={(opt) => setSelectedPosition(opt)}
          label="Chọn vị trí"
          defaultOptions={
            type === "Update" ? [defaultValue?.selectedPosition] : []
          }
          labelKey="positionName"
        />

        <FormInputNumber
          controlProps={{
            control,
            name: "quantity",
            rules: { required: "Phải nhập số lượng" },
          }}
          label="Số lượng"
        />
      </Box>

      <Box className="flex items-center justify-center my-4">
        {type === "Update" ? (
          <BaseButton onClick={handleSubmit(handleUpdateProduct)}>
            Cập nhật
          </BaseButton>
        ) : (
          <BaseButton onClick={handleSubmit(handleCreateProduct)}>
            Tạo
          </BaseButton>
        )}

        <BaseButton onClick={onClose} className="!bg-main-1 ml-3">
          Đóng
        </BaseButton>
      </Box>
    </Dialog>
  );
};
