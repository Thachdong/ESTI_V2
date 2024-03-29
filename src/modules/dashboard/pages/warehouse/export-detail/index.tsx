import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { mainOrder, warehouse } from "src/api";
import { FormCheckbox } from "~modules-core/components";
import {
  ExportDetailButtonsBox,
  ExportDetailCustomer,
  ExportDetailGeneralInfo,
  ExportDetailProducts,
  ExportDetailRecipient,
  ExportDetailShipping,
  ExportViewGeneralInfo,
} from "~modules-dashboard/components";

export const ExportDetailPage: React.FC = () => {
  // LOCAL STATE AND EXTRACT PROPS
  const router = useRouter();

  const [selectedBranch, setSelectedBranch] = useState<any>();

  const { id, fromOrderId } = router.query;

  const methods = useForm<any>({
    defaultValues: {
      isDefaultReceiver: true,
    },
  });

  const { watch, reset, setValue } = methods;

  const { isForDelete, mainOrderId, isDefaultReceiver } = watch();

  // DATA FETCHING
  const { data: orderDetailData } = useQuery(
    ["orderDetail", { mainOrderId }],
    () =>
      mainOrder.getById(mainOrderId).then((res) => {
        const { mainOrderDetail = [], mainOrder = {} } = res.data || {};

        // REMOVE ALL PRODUCTS WITH STATUS 2 - ĐÃ HOÀN THÀNH
        const products = mainOrderDetail.filter(
          (product: any) => product?.tProductStatus !== 2
        );

        // số lượng = số lượng đơn hàng(quantity) - số lượng đã xuất(delivered) (công thức của api)
        const updatedProductQuantity = products?.map((prod: any) => {
          const {quantity = 0, delivered = 0} = prod || {};
          
          const currentQuantity = quantity - delivered;

          return {...prod, quantity: currentQuantity}
        })

        setValue("productList", updatedProductQuantity);

        setValue("deliveryId", mainOrder?.deliveryId);

        return { ...res.data, mainOrderDetail: products };
      }),
    {
      enabled: !!mainOrderId,
    }
  );

  const { data: transactionData, refetch: refetchTransactionDetail } = useQuery(
    ["warehouseExportDetail_" + id],
    () => warehouse.getExportSessionById(id as string).then((res) => res.data),
    {
      enabled: !!id,
    }
  );

  const getWarehouseConfig = useCallback(() => {
    switch (true) {
      case !!id:
        return {
          warehouseConfigId: transactionData?.productOrder?.warehouseConfigId,
          warehouseConfigCode:
            transactionData?.productOrder?.warehouseConfigCode,
        };
      case !!isForDelete:
        return {
          warehouseConfigId: selectedBranch?.warehouseConfigId,
          warehouseConfigCode: selectedBranch?.warehouseConfigCode,
        };
      default:
        return {
          warehouseConfigId: orderDetailData?.mainOrder?.warehouseConfigId,
          warehouseConfigCode: orderDetailData?.mainOrder?.warehouseConfigCode,
        };
    }
  }, [transactionData, selectedBranch, orderDetailData]);

  // SIDE EFFECTS
  useEffect(() => {
    if (isForDelete) {
      reset({ isForDelete });

      setValue("productList", []);
    }
  }, [isForDelete]);

  useEffect(() => {
    const { productOrder = {}, productOrderDetail } = transactionData || {};

    const {
      id,
      deliveryUnit,
      codeVD,
      packageNumber,
      packageWeight,
      shippingFee,
      exportStatus,
      receiverFullName,
      receiverPhone,
      receiverAddress,
      deliveryDate,
      paymentDocument,
    } = productOrder;

    reset({
      id,
      deliveryUnit,
      codeVD,
      packageNumber,
      packageWeight,
      shippingFee,
      exportStatus,
      receiverFullName,
      receiverPhone,
      receiverAddress,
      deliveryDate,
      paymentDocument: !paymentDocument ? [] : paymentDocument.split(","),
      productList: productOrderDetail,
    });
  }, [transactionData]);

  useEffect(() => {
    setValue("mainOrderId", fromOrderId);
  }, [fromOrderId]);

  useEffect(() => {
    if (!!isDefaultReceiver && !!orderDetailData) {
      const { receiverFullName, receiverPhone, receiverAddress } =
        orderDetailData?.mainOrder || {};

      setValue("receiverFullName", receiverFullName);

      setValue("receiverPhone", receiverPhone);

      setValue("receiverAddress", receiverAddress);
    }
  }, [isDefaultReceiver, orderDetailData]);

  // DOM RENDERING
  return (
    <Box className="container-center">
      <FormProvider {...methods}>
        {id ? (
          <ExportViewGeneralInfo
            refetch={refetchTransactionDetail}
            data={transactionData?.productOrder}
          />
        ) : (
          <>
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
              orderDetail={orderDetailData?.mainOrder}
              selectedBranch={selectedBranch}
              setSelectedBranch={setSelectedBranch}
            />
          </>
        )}

        {!isForDelete && (
          <Box className="grid lg:grid-cols-2 gap-4 mb-4">
            <ExportDetailCustomer
              customerData={
                id ? transactionData?.productOrder : orderDetailData?.mainOrder
              }
            />

            <ExportDetailRecipient />

            <ExportDetailShipping
              exportStatus={transactionData?.productOrder?.exportStatus}
            />
          </Box>
        )}

        <ExportDetailProducts
          transactionData={transactionData?.productOrder}
          getWarehouseConfig={getWarehouseConfig}
          productOptions={
            id
              ? transactionData?.productOrderDetail || []
              : orderDetailData?.mainOrderDetail || []
          }
        />

        <ExportDetailButtonsBox
          exportStatus={transactionData?.productOrder?.exportStatus}
          orderData={orderDetailData?.mainOrder}
          transactionData={transactionData}
        />
      </FormProvider>
    </Box>
  );
};
