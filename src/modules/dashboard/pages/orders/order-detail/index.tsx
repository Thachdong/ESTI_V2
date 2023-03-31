import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { mainOrder } from "src/api";
import { FormCheckbox } from "~modules-core/components";
import { _format } from "~modules-core/utility/fomat";
import {
  OrderDetailAddition,
  OrderDetailAdvancePayment,
  OrderDetailAttach,
  OrderDetailButtons,
  OrderDetailCommission,
  OrderDetailCurator,
  OrderDetailCustomer,
  OrderDetailGeneral,
  OrderDetailGeneralView,
  OrderDetailImplement,
  OrderDetailNote,
  OrderDetailProducts,
  OrderDetailReciever,
  OrderDetailStatus,
  QuoteDetailDeliveryHistory,
  QuoteDetailInvoiceHistory,
} from "~modules-dashboard/components";

export const OrderDetailPage: React.FC = () => {
  const [isUpdate, setIsUpdate] = useState(false);

  const { id } = useRouter().query;

  const disabled = !!id && !isUpdate;

  const method = useForm<any>({
    mode: "onBlur",
    defaultValues: {
      products: [],
      defaultReceiver: true,
      notFromQuote: false,
    },
  });

  // DATA FETCHING
  const { data: orderDetail, refetch } = useQuery(
    ["orderDetail", id],
    () => mainOrder.getById(id as string).then((res) => res.data),
    {
      enabled: !!id,
    }
  );

  // SIDE EFFECTS
  useEffect(() => {
    const { mainOrder = {}, mainOrderDetail = [] } = orderDetail || {};

    // SET DETAIL
    const {
      status,
      id,
      preQuoteId,
      created,
      customerId,
      curatorId,
      curatorPhone,
      curatorEmail,
      curatorDepartmentId,
      receiverFullName,
      receiverPhone,
      paymentType,
      paymentLimit,
      receiverAddress,
      salesId,
      salesAdminId,
      deliveryId,
      requirements,
      attachFile,
      totalPrice,
      totalPriceNotTax,
      totalTax,
      smgNote,
      salesNote,
      salesAdminNote,
      deliverNote,
    } = mainOrder;

    method.reset({
      id,
      status,
      salesId,
      customerId,
      curatorId,
      requirements,
      smgNote,
      salesNote,
      receiverAddress,
      paymentType,
      preQuoteId,
      created,
      curatorPhone,
      curatorEmail,
      curatorDepartmentId,
      receiverFullName,
      receiverPhone,
      paymentLimit,
      salesAdminId,
      deliveryId,
      totalPrice,
      totalPriceNotTax,
      totalTax,
      salesAdminNote,
      deliverNote,
      products: [...mainOrderDetail],
      attachFile: !attachFile ? [] : attachFile.split(","),
    });
  }, [orderDetail]);

  return (
    <FormProvider {...method}>
      <Box className="container-center">
        <Box className="grid gap-4">
          {!!id ? (
            <>
              <OrderDetailStatus
                currentStatus={orderDetail?.mainOrder?.status}
                refetch={refetch}
              />

              <OrderDetailGeneralView data={orderDetail?.mainOrder} />
            </>
          ) : (
            <>
              <FormCheckbox
                label="Đặt hàng không thông qua đơn mua"
                controlProps={{
                  name: "notFromQuote",
                  control: method.control,
                }}
              />

              <OrderDetailGeneral />
            </>
          )}

          <Box className="grid lg:grid-cols-2 gap-4">
            <OrderDetailCustomer />

            <OrderDetailCurator disabled={disabled} />
          </Box>

          <Box className="grid lg:grid-cols-2 gap-4">
            <OrderDetailReciever disabled={disabled} />

            <OrderDetailImplement disabled={disabled} />
          </Box>

          <Box className="grid lg:grid-cols-2 gap-4">
            <OrderDetailAttach disabled={disabled} />

            <OrderDetailAddition disabled={disabled} />
          </Box>

          <OrderDetailProducts disabled={disabled} />

          <Box className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <OrderDetailNote
              disabled={true}
              controlName={"smgNote"}
              title={"SHOP MANAGER NOTE"}
            />

            <OrderDetailNote
              disabled={true}
              controlName={"saleAdminNote"}
              title={"SALES ADMIN NOTE"}
            />

            <OrderDetailNote
              disabled={true}
              controlName={"salesNote"}
              title={"SALES NOTE"}
            />

            <OrderDetailNote
              disabled={true}
              controlName={"deliveryNote"}
              title={"GIAO NHẬN NOTE"}
            />
          </Box>

          {!!id && (
            <>
              <QuoteDetailDeliveryHistory
                orderStatus={orderDetail?.mainOrder?.status}
                orderCode={orderDetail?.mainOrder?.mainOrderCode}
              />

              <QuoteDetailInvoiceHistory
                orderStatus={orderDetail?.mainOrder?.status}
                orderCode={orderDetail?.mainOrder?.mainOrderCode}
              />

              <OrderDetailAdvancePayment
                status={orderDetail?.mainOrder?.status}
              />

              <OrderDetailCommission orderId={id as string} />
            </>
          )}

          <OrderDetailButtons
            isUpdate={isUpdate}
            setIsUpdate={setIsUpdate}
            sendMailData={{
              to: orderDetail?.mainOrder?.curatorEmail,
              cc: [orderDetail?.mainOrder?.curatorEmail],
            }}
            orderDetail={orderDetail}
            refetch={refetch}
          />
        </Box>
      </Box>
    </FormProvider>
  );
};
