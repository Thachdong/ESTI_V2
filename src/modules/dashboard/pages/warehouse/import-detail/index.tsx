import { Box } from "@mui/material";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { BaseButton } from "~modules-core/components";
import {
  ImportDetailTable,
  WarehouseImportCuratorInfo,
  WarehouseImportGeneralInfo,
  WarehouseImportSupplierInfo,
} from "~modules-dashboard/components";
import SaveIcon from "@mui/icons-material/Save";
import { FormCheckbox } from "~modules-core/components/form-hooks/FormCheckbox";
import { useMutation, useQuery } from "react-query";
import {
  orders,
  TCreateImportWarehouse,
  TCreateImportWarehouseProduct,
  warehouse,
} from "src/api";
import { _format } from "~modules-core/utility/fomat";
import { toast } from "~modules-core/toast";
import { useRouter } from "next/router";

export const ImportDetailPage = () => {
  // LOCAL STATE AND EXTRACT PROPS
  const [selectedOrder, setSelectedOrder] = useState<any>();

  const router = useRouter();

  const methods = useForm();

  const { watch, setValue, handleSubmit } = methods;

  const productOrderId = watch("productOrderId");

  // DATA FETCHING
  useQuery(
    ["orderDetail", { productOrderId }],
    () => orders.getById(productOrderId).then((res) => res.data),
    {
      enabled: !!productOrderId,
      onSuccess: (data) => {
        const { deliveryId, branchId, supplierId } =
          data?.productOrder?.productOrder || {};

        const { productOrderDetail } = data || {};

        setValue("branchId", branchId);

        setValue("deliveryId", deliveryId);

        setValue("supplierId", supplierId);

        setValue("productList", productOrderDetail || []);

        setSelectedOrder(data);
      },
    }
  );

  // METHODS
  const mutateCreate = useMutation(
    (data: TCreateImportWarehouse) => warehouse.createWarehouseImport(data),
    {
      onSuccess: (data) => {
        toast.success(data.resultMessage);

        router.push("/dashboard/warehouse/warehouse-import");
      },
    }
  );

  const handleValidateProduct = (product: TCreateImportWarehouseProduct) => {
    const { dateExpiration, dateManufacture, lotNumber, positionId } = product;

    let messages: string[] = [];

    switch (true) {
      case !dateExpiration:
        messages.push("chưa nhập hạn sử dụng!");
      case !dateManufacture:
        messages.push("chưa nhập ngày sản xuất!");
      case !lotNumber:
        messages.push("chưa nhập số LOT!");
      case !positionId:
        messages.push("chưa nhập vị trí!");
      case dateManufacture > dateExpiration:
        messages.push("Ngày sản xuất không hợp lệ!");
    }

    return messages.length > 0 ? messages : null;
  };

  const handleCreate = async(data: any) => {
    let error: any[] = [];

    const productList: TCreateImportWarehouseProduct[] = data?.productList?.map(
      (product: any) => {
        const errorMessage = handleValidateProduct(product);

        if (!!errorMessage) {
          error.push({
            productName: product.productName,
            message: errorMessage?.join(", "),
          });
        }

        return {
          productOrderDetailId: product?.id || null,
          productId: product?.productId,
          lotNumber: product?.lotNumber,
          dateManufacture: product?.dateManufacture,
          dateExpiration: product?.dateExpiration,
          quantity: product?.quantity,
          price: product?.price,
          vat: product?.vat,
          positionId: product?.positionId,
        };
      }
    );

    if (error.length > 0) {
      error.map((err: any) => {
        toast.error(`Sản phẩm: ${err.productName} lỗi: ${err.message}`);
      });

      return;
    }

    const payload: TCreateImportWarehouse = {
      productOrderId: productOrderId || null,
      branchId: data?.branchId,
      deliveryId: data?.deliveryId,
      supplierId: data?.supplierId,
      warehouseCreate: productList,
    };

    await mutateCreate.mutateAsync(payload);
  };

  return (
    <Box>
      <FormProvider {...methods}>
        <Box className="mb-2">
          <FormCheckbox
            controlProps={{
              name: "withoutPurchaseInvoice",
              control: methods.control,
            }}
            label="Nhập hàng không thông qua đơn mua"
          />
        </Box>

        <WarehouseImportGeneralInfo
          orderDetail={selectedOrder?.productOrder?.productOrder}
        />

        <Box className="grid grid-cols-2 gap-4 my-4">
          <WarehouseImportSupplierInfo
            orderDetail={selectedOrder?.productOrder?.productOrder}
          />

          <WarehouseImportCuratorInfo
            orderDetail={selectedOrder?.productOrder?.productOrder}
          />
        </Box>

        <ImportDetailTable />
      </FormProvider>

      <Box className="flex justify-end my-4">
        <BaseButton
          type="button"
          className="bg-[#2eaaa8]"
          onClick={handleSubmit(handleCreate)}
        >
          <SaveIcon className="mr-2" />
          Lưu
        </BaseButton>
      </Box>
    </Box>
  );
};
