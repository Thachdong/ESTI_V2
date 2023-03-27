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
import { position, products } from "src/api";
import { useCallback, useEffect, useState } from "react";
import { toast } from "~modules-core/toast";
import _ from "lodash";
import moment from "moment";

type TProps = {
  productOptions: any[];
  getWarehouseConfig: () => {
    warehouseConfigId: string;
    warehouseConfigCode: string;
  };
};

export const ExportDetailProductDialog: React.FC<TDialog & TProps> = ({
  open,
  onClose,
  type,
  defaultValue,
  getWarehouseConfig,
  productOptions,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<any>();

  const [selectedLot, setSelectedLot] = useState<any>();

  const [selectedPosition, setSelectedPosition] = useState<any>();

  const { control, handleSubmit, reset, setError, watch, setValue } = useForm();

  const { productId, lotNumber } = watch();

  const { watch: globalWatch, setValue: setGlobalValue } = useFormContext();

  const { isForDelete, productList } = globalWatch();

  const title = type === "Update" ? "Cập nhật sản phẩm" : "Thêm sản phẩm";

  const { warehouseConfigId, warehouseConfigCode } = getWarehouseConfig();

  // SIDE EFFECTS
  useEffect(() => {
    if (type === "Add") {
      reset({});
    } else {
      const { productId, lotNumber, positionId, quantity } = defaultValue || {};

      reset({ productId, lotNumber, positionId, quantity });
    }
  }, [type]);

  useEffect(() => {
    if (!lotNumber) {
      setValue("positionId", "");
    }
  }, [lotNumber]);

  // DATA FETCHING
  const { data: lotOptions } = useQuery(
    ["getLotOptions_" + productId, productId, warehouseConfigId],
    () => products.getLot(productId, warehouseConfigId).then((res) => res.data),
    {
      enabled: !!productId,
    }
  );

  // METHODS
  const handleCreateProduct = (data: any) => {
    // 1. DATA VALIDATION
    const { quantity } = data;

    if (quantity > selectedPosition?.quantity) {
      setError("quantity", {
        type: "quantity",
        message: "Số lượng không được lớn hơn tồn kho!",
      });

      return;
    }

    //2. DUBPLICATE PRODUCT
    const existedProduct = productList.filter(
      (prod: any) =>
        prod?.productId === selectedProduct?.productId ||
        prod?.productId === selectedProduct?.id
    )?.[0];

    if (!!existedProduct) {
      const { positionId, lotNumber } = existedProduct;

      if (
        positionId === selectedPosition?.positionId &&
        lotNumber === selectedLot?.lotNumber
      ) {
        toast.error(
          `Sản phẩm ${selectedProduct?.productCode} - số lot ${lotNumber} - vị trí ${selectedPosition?.positionName} đã tồn tại`
        );
        return;
      }
    }

    //3. ADD PRODUCT
    const totalPrice = quantity * (selectedProduct?.price || 0);

    const product = {
      ...selectedProduct,
      ...data,
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

    setGlobalValue("productList", [...productList, { ...product }]);

    //4. CLEAN UP
    toast.success("Thêm sản phẩm thành công!");

    reset();

    onClose();
  };

  const handleUpdateProduct = (data: any) => {
    // 1. DATA VALIDATION
    const { quantity } = data;

    if (quantity > selectedLot?.quantity) {
      setError("quantity", {
        type: "quantity",
        message: "Số lượng không được lớn hơn tồn kho!",
      });

      return;
    }

    //2. UPDATE PRODUCT
    const totalPrice = quantity * (selectedProduct?.price || 0);

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

    const updatedProductList = productList.map((prod: any) =>
      prod?.id === product?.id ? { ...product } : { ...prod }
    );

    setGlobalValue("productList", updatedProductList);

    //3. CLEAN UP
    toast.success("Cập nhật sản phẩm thành công!");

    reset();

    onClose();
  };

  const getPositionLabel = useCallback((opt: any) => {
    if (!opt) return "";

    const { positionName, quantity, dateManufacture, dateExpiration } =
      opt || {};

    return !!opt
      ? `${positionName} - SL: ${quantity} - NSX: ${
          !!dateManufacture
            ? moment(dateManufacture).format("DD/MM/YYYY")
            : "__"
        } - HSD: ${
          !!dateExpiration ? moment(dateExpiration).format("DD/MM/YYYY") : "__"
        }`
      : "";
  }, []);

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
            getOptionLabel={(opt: any) =>
              !!opt ? `${opt?.productCode} - ${opt?.productName}` : ""
            }
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
            valueKey="productId"
            labelKey="productCode"
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
          valueKey="lotNumber"
          getOptionLabel={(opt: any) =>
            !!opt ? `${opt?.lotNumber} - SL: ${opt?.quantity}` : ""
          }
        />

        <FormSelectAsync
          controlProps={{
            control,
            name: "positionId",
            rules: { required: "Phải chọn vị trí" },
          }}
          fetcher={position.getPositionByProduct}
          fetcherParams={{
            lotNumber: selectedLot?.lotNumber,
            warehouseConfigCode,
            productCode: selectedProduct?.productCode,
          }}
          callback={(opt) => setSelectedPosition(opt)}
          label="Chọn vị trí"
          defaultOptions={
            type === "Update" ? [defaultValue?.selectedPosition] : []
          }
          valueKey="positionId"
          disabled={!lotNumber}
          getOptionLabel={getPositionLabel}
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
