import { Box, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
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
import { FormInput } from "~modules-core/components";

export const ImportDetailPage: React.FC = () => {
  // LOCAL STATE AND EXTRACT PROPS
  const router = useRouter();

  const { query } = router;

  const [warehouseConfigId, setWarehouseConfigId] = useState("");

  const handleUpdateWarehouseId = useCallback((id: string) => {
    setWarehouseConfigId(id);
  }, []);

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
    // Update khi check/ bỏ check thông qua đơn mua hàng
    if (withoutPurchaseInvoice && !query.id) {
      methods.reset({ productList: [], withoutPurchaseInvoice });
    }
  }, [withoutPurchaseInvoice]);

  useEffect(() => {
    // Update mỗi khi chọn đơn mua hàng
    if (!!orderDetailData && !query.id) {
      const { deliveryId, branchId, supplierId, stockerId, purchaseId } =
        orderDetailData?.productOrder?.productOrder || {};

      const { productOrderDetail = [] } = orderDetailData || {};

      setValue("branchId", branchId);

      setValue("deliveryId", deliveryId);

      setValue("supplierId", supplierId);

      setValue("stockerId", stockerId);

      setValue("purchaseId", purchaseId);

      setValue(
        "productList",
        productOrderDetail.map((prod: any) => ({
          ...prod,
          rowId: prod?.id,
        }))
      );
    } else {
      setValue("branchId", undefined);

      setValue("deliveryId", undefined);

      setValue("supplierId", undefined);

      setValue("productList", []);
    }
  }, [orderDetailData, query.id]);

  useEffect(() => {
    // Update đối với màn chi tiết
    if (!!transactionData) {
      const { warehouse = [], warehouseSession } = transactionData || {};

      reset({
        ...warehouseSession,
        productList: warehouse.map((prod: any) => ({
          ...prod,
          rowId: prod?.id,
        })),
        withoutPurchaseInvoice: warehouseSession?.productOrderId ? false : true,
      });
    }
  }, [transactionData]);

  useEffect(() => {
    query.fromPurchaseOrderId &&
      setValue("productOrderId", query.fromPurchaseOrderId);
  }, [query.fromPurchaseOrderId]);

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
            <ImportDetailGeneralInfo
              orderDetail={orderDetail}
              handleUpdateWarehouseId={handleUpdateWarehouseId}
            />
          </>
        )}

        <Box className="mt-4">
          <Typography className="text-sm font-semibold mb-3 ">
            GHI CHÚ
          </Typography>

          <Box className="grid gap-3 rounded p-3 bg-white">
            <FormInput
              controlProps={{
                control: methods.control,
                name: "note",
              }}
              shrinkLabel
              label="Nhập ghi chú"
              multiline
              minRows={3}
              disabled={!!query.id}
            />
          </Box>
        </Box>

        <ImportDetailSupplierInfo supplierData={orderDetail} />

        <ImportDetailTable
          transactionData={transactionData?.warehouseSession}
          warehouseConfigId={warehouseConfigId}
          refetch={refetchTransaction}
        />

        <ImportDetailButtonsBox
          importStatus={transactionData?.warehouseSession?.importStatus}
          transactionData={transactionData}
          refetch={refetchTransaction}
        />
      </FormProvider>
    </Box>
  );
};
