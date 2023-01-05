import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import {
  bookingOrder,
  TCreateExportWarehouse,
  TCreateExportWarehouseProduct,
  warehouse,
} from "src/api";
import { BaseButton, FormCheckbox } from "~modules-core/components";
import { toast } from "~modules-core/toast";
import {
  ExportDetailContact,
  ExportDetailCustomer,
  ExportDetailGeneralInfo,
  ExportDetailProducts,
  ExportDetailRecipient,
  ExportDetailShipping,
} from "~modules-dashboard/components";

export const ExportDetailPage = () => {
  // LOCAL STATE AND EXTRACT PROPS
  const [selectedBranch, setSelectedBranch] = useState<any>();

  const [selectedOrder, setSelectedOrder] = useState<any>();

  const [products, setProducts] = useState<any[]>([]);

  const [productOptions, setProductOptions] = useState<any[]>([]);

  const router = useRouter();

  const { transactionId } = router?.query;

  const methods = useForm<any>({
    defaultValues: {
      isDefaultReceiver: true,
    },
  });

  const { watch, handleSubmit, reset, setValue } = methods;

  const isForDelete = watch("isForDelete");

  const orderId = watch("mainOrderId");

  const warehouseConfigId = isForDelete
    ? selectedBranch?.warehouseCongifId
    : (selectedOrder?.warehouseConfigId as string);

    console.log(selectedBranch);
    

  // SIDE EFFECTS
  useEffect(() => {
    if (isForDelete) {
      reset({ isForDelete });

      setProducts([]);

      setSelectedOrder({});
    }
  }, [isForDelete]);

  // DATA FETCHING
  useQuery(
    ["orderDetail", { orderId }],
    () => bookingOrder.getById(orderId).then((res) => res.data),
    {
      enabled: !!orderId,
      onSuccess: (data: any) => {
        const { mainOrderDetail = [], mainOrder } = data || {};

        setSelectedOrder(mainOrder || {});

        // REMOVE ALL PRODUCTS WITH STATUS 2 - ĐÃ HOÀN THÀNH
        const productList = mainOrderDetail.filter(
          (product: any) => product?.tProductStatus !== 2
        );

        setProducts(productList);

        setProductOptions(productList);
      },
    }
  );

  useQuery(
    ["warehouseExportDetail_" + transactionId],
    () =>
      warehouse.getExportSessionById(transactionId as string).then((res) => {
        const {productOrder, productOrderDetail} = res.data || {};

        setProducts(productOrderDetail);

        setSelectedOrder(productOrder);

        setValue("exportStatus", productOrder?.exportStatus)
      }),
    {
      enabled: !!transactionId,
    }
  );

  // PRODUCTS OPERATIONS
  const addProduct = useCallback(
    (prod: any) => {
      setProducts([...products, prod]);
    },
    [products]
  );

  const updateProduct = useCallback(
    (id: string, prod: any) => {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === id ? { ...prod } : { ...product }
        )
      );
    },
    [setProducts]
  );

  const deleteProduct = useCallback(
    (id: string) => {
      setProducts((prev) => prev.filter((prod: any) => prod?.id !== id));
    },
    [setProducts]
  );

  const productsOperator = {
    addProduct,
    updateProduct,
    deleteProduct,
  };

  const createMutation = useMutation(
    (data: TCreateExportWarehouse) => warehouse.createExportWarehouse(data),
    {
      onError: (error: any) => {
        toast.error(error?.resultMessage);
      },
      onSuccess: (data) => {
        toast.success(data.resultMessage);

        router.push("/dashboard/warehouse/warehouse-export");
      },
    }
  );

  const handleValidateProduct = (product: any) => {
    const { lotNumber, positionId } = product;

    let messages: string[] = [];

    switch (true) {
      case !lotNumber:
        messages.push("chưa nhập số LOT!");
      case !positionId:
        messages.push("chưa nhập vị trí!");
    }

    return messages.length > 0 ? messages : null;
  };

  const handleCreate = async (data: any) => {
    // 1. CATCH INVALID PRODUCTS
    let error: any[] = [];

    const productList: TCreateExportWarehouseProduct[] = products.map(
      (prod: any) => {
        const errorMessage = handleValidateProduct(prod);

        if (!!errorMessage) {
          error.push({
            productName: prod?.productName,
            message: errorMessage?.join(", "),
          });
        }

        return {
          productId: prod?.productId,
          lotNumber: prod?.lotNumber,
          dateManufacture: prod?.dateManufacture,
          dateExpiration: prod?.dateExpiration,
          quantity: prod?.quantity,
          price: prod?.price,
          vat: prod?.vat,
          positionId: prod?.positionId,
        };
      }
    );

    if (error.length > 0) {
      error.map((err: any) => {
        toast.error(`Sản phẩm: ${err.productName} lỗi: ${err.message}`);
      });

      return;
    }

    // 2. CALL API
    const {paymentDocument} = data;

    const payload: TCreateExportWarehouse = {
      ...data,
      paymentDocument: paymentDocument.join(","),
      exportWarehouseCreate: productList,
    };
    
    await createMutation.mutateAsync(payload);
  };

  const callback = useCallback((opt: any) => {
    setSelectedBranch(opt);
  }, []);

  // DOM RENDERING
  return (
    <FormProvider {...methods}>
      <Box className="mb-2">
        <FormCheckbox
          controlProps={{
            name: "isForDelete",
            control: methods.control,
          }}
          label="Xuất bỏ sản phẩm"
        />
      </Box>

      <ExportDetailGeneralInfo
        callback={callback}
        data={isForDelete ? selectedBranch : selectedOrder}
      />

      {!isForDelete && (
        <Box className="grid grid-cols-2 gap-4 mb-4">
          <ExportDetailCustomer selectedOrder={selectedOrder} />

          <ExportDetailContact selectedOrder={selectedOrder} />

          <ExportDetailRecipient selectedOrder={selectedOrder} />

          <ExportDetailShipping />
        </Box>
      )}

      <ExportDetailProducts
        products={products}
        warehouseConfigId={warehouseConfigId}
        productsOperator={productsOperator}
        productOptions={productOptions}
      />

      <Box className="flex justify-end my-4">
        <BaseButton type="button" onClick={handleSubmit(handleCreate)}>
          Xuất kho
        </BaseButton>
      </Box>
    </FormProvider>
  );
};