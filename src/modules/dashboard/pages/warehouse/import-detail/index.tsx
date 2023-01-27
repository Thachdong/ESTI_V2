import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  ImportDetailButtonsBox,
  ImportDetailTable,
  ImportDetailGeneralInfo,
  ImportDetailSupplierInfo,
  ImportDetailViewGeneralInfo,
} from "~modules-dashboard/components";
import { FormCheckbox } from "~modules-core/components/form-hooks/FormCheckbox";
import { useQuery } from "react-query";
import { purchaseOrder, warehouse } from "src/api";
import { _format } from "~modules-core/utility/fomat";
import { useRouter } from "next/router";

export const ImportDetailPage = () => {
  // LOCAL STATE AND EXTRACT PROPS
  const router = useRouter();

  const { query } = router;

  const methods = useForm<any>({
    defaultValues: {
      productList: [],
    },
  });

  const { watch, setValue, reset } = methods;

  const productOrderId = watch("productOrderId");

  const withoutPurchaseInvoice = watch("withoutPurchaseInvoice");

  // DATA FETCHING
  const { data: orderDetailData } = useQuery(
    ["orderDetail", { productOrderId }],
    () => purchaseOrder.getById(productOrderId).then((res) => res.data),
    {
      enabled: !!productOrderId && !query.id,
    }
  );

  const { data: transactionData, refetch: refetchTransaction } = useQuery(
    ["ImportWarehouseDetail_" + query.id],
    () =>
      warehouse
        .getImportSessionById(query.id as string)
        .then((res) => res.data),
    {
      enabled: Boolean(query.id),
    }
  );

  let orderDetail: any = {};

  switch (true) {
    case !!query.id:
      orderDetail = transactionData?.warehouseSession;
      break;
    case !!productOrderId:
      orderDetail = orderDetailData?.productOrder?.productOrder;
      break;
    case withoutPurchaseInvoice:
    default:
      break;
  }

  // SIDE EFFECTS
  useEffect(() => {
    if (withoutPurchaseInvoice && !query.id) {
      methods.reset({ productList: [], withoutPurchaseInvoice });
    }
  }, [withoutPurchaseInvoice]);

  useEffect(() => {
    if (!query.id) {
      if (!!orderDetailData) {
        const { deliveryId, branchId, supplierId } =
          orderDetailData?.productOrder?.productOrder || {};

        const { productOrderDetail = [] } = orderDetailData || {};

        setValue("branchId", branchId);

        setValue("deliveryId", deliveryId);

        setValue("supplierId", supplierId);

        setValue(
          "productList",
          productOrderDetail.map((prod: any, index: number) => ({
            ...prod,
            no: index + 1,
          }))
        );
      } else {
        setValue("branchId", undefined);

        setValue("deliveryId", undefined);

        setValue("supplierId", undefined);

        setValue("productList", []);
      }
    }
  }, [orderDetailData, query.id]);

  useEffect(() => {
    if (!!transactionData) {
      const { warehouse = [], warehouseSession } = transactionData || {};

      reset({
        ...warehouseSession,
        productList: warehouse.map((prod: any, index: number) => ({
          ...prod,
          no: index + 1,
        })),
        withoutPurchaseInvoice: warehouseSession?.productOrderId ? false : true,
      });
    }
  }, [transactionData]);

  return (
    <Box className="container-center">
      <FormProvider {...methods}>
        {query.id ? (
          <ImportDetailViewGeneralInfo
            refetch={refetchTransaction}
            data={transactionData?.warehouseSession}
          />
        ) : (
          <>
            <Box className="mb-2">
              <FormCheckbox
                controlProps={{
                  name: "withoutPurchaseInvoice",
                  control: methods.control,
                }}
                label="Nhập hàng không thông qua đơn mua"
                checked={withoutPurchaseInvoice}
              />
            </Box>
            <ImportDetailGeneralInfo orderDetail={orderDetail} />
          </>
        )}

        <ImportDetailSupplierInfo supplierData={orderDetail} />

        <ImportDetailTable
          transactionData={transactionData?.warehouseSession}
        />

        <ImportDetailButtonsBox
          importStatus={transactionData?.warehouseSession?.importStatus}
        />
      </FormProvider>
    </Box>
  );
};
