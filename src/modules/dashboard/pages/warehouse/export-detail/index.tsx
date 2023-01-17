import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { bookingOrder, warehouse } from "src/api";
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

export const ExportDetailPage = () => {
  // LOCAL STATE AND EXTRACT PROPS
  const router = useRouter();

  const [selectedBranch, setSelectedBranch] = useState<any>();

  const { transactionId } = router.query;

  const methods = useForm<any>({
    defaultValues: {
      isDefaultReceiver: true,
    },
  });

  const { watch, reset, setValue } = methods;

  const isForDelete = watch("isForDelete");

  const orderId = watch("mainOrderId");

  // DATA FETCHING
  const { data: orderDetailData } = useQuery(
    ["orderDetail", { orderId }],
    () =>
      bookingOrder.getById(orderId).then((res) => {
        const { mainOrderDetail = [], mainOrder = {} } = res.data || {};

        // REMOVE ALL PRODUCTS WITH STATUS 2 - ĐÃ HOÀN THÀNH
        const products = mainOrderDetail.filter(
          (product: any) => product?.tProductStatus !== 2
        );

        setValue("productList", products);

        setValue("deliveryId", mainOrder?.deliveryId);

        return { ...res.data, mainOrderDetail: products };
      }),
    {
      enabled: !!orderId,
    }
  );

  const { data: transactionData, refetch: refetchTransactionDetail } = useQuery(
    ["warehouseExportDetail_" + transactionId],
    () =>
      warehouse
        .getExportSessionById(transactionId as string)
        .then((res) => res.data),
    {
      enabled: !!transactionId,
    }
  );

  let warehouseConfig: any = {};

  if (!!transactionId) {
    warehouseConfig = {
      warehouseConfigId: transactionData?.productOrder?.warehouseConfigId,
      warehouseConfigCode: transactionData?.productOrder?.warehouseConfigCode,
    };
  } else if (isForDelete) {
    warehouseConfig = {
      warehouseConfigId: selectedBranch?.warehouseConfigId,
      warehouseConfigCode: selectedBranch?.warehouseConfigCode,
    };
  } else {
    warehouseConfig = {
      warehouseConfigId: orderDetailData?.mainOrder?.warehouseConfigId,
      warehouseConfigCode: orderDetailData?.mainOrder?.warehouseConfigCode,
    };
  }

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
      deliveryUnit,
      codeVD,
      packageNumber,
      packageWeight,
      shippingFee,
      exportStatus,
    } = productOrder;

    reset({
      deliveryUnit,
      codeVD,
      packageNumber,
      packageWeight,
      shippingFee,
      exportStatus,
      productList: productOrderDetail,
    });
  }, [transactionData]);

  // DOM RENDERING
  return (
    <FormProvider {...methods}>
      {transactionId ? (
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
        <Box className="grid grid-cols-2 gap-4 mb-4">
          <ExportDetailCustomer
            customerData={
              transactionId
                ? transactionData?.productOrder
                : orderDetailData?.mainOrder
            }
          />

          <ExportDetailRecipient
            orderData={
              transactionId
                ? transactionData?.productOrder
                : orderDetailData?.mainOrder
            }
          />

          <ExportDetailShipping
            exportStatus={transactionData?.productOrder?.exportStatus}
          />
        </Box>
      )}

      <ExportDetailProducts
        exportStatus={transactionData?.productOrder?.exportStatus}
        warehouseConfig={warehouseConfig}
        productOptions={
          transactionId
            ? transactionData?.productOrderDetail || []
            : orderDetailData?.mainOrderDetail || []
        }
      />

      <ExportDetailButtonsBox
        exportStatus={transactionData?.productOrder?.exportStatus}
        orderData={orderDetailData?.mainOrder}
      />
    </FormProvider>
  );
};