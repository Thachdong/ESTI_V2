import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { bill, mainOrder as orderApi } from "src/api";
import { _format } from "~modules-core/utility/fomat";
import {
  BillDetailAttach,
  BillDetailButtons,
  BillDetailCurator,
  BillDetailCustomer,
  BillDetailGeneral,
  BillDetailGeneralView,
  BillDetailPaymentHistory,
  BillDetailPaymentStatus,
  BillDetailProducts,
  BillDetailReciever,
  BillDetailRecieverView,
  BillDetailStatus,
} from "~modules-dashboard/components";

export const BillDetailPage: React.FC = () => {
  const { id, fromOrderId } = useRouter().query;

  const method = useForm<any>({
    mode: "onBlur",
    defaultValues: {
      products: [],
      defaultReceiver: true,
    },
  });

  const { watch, setValue } = method;

  const { mainOrderId, defaultReceiver } = watch();

  // DATA FETCHING
  // FETCH BILL DETAIL
  const { data: billDetail, refetch } = useQuery(
    ["billDetail", id],
    () => bill.getById(id as string).then((res) => res.data),
    {
      enabled: !!id,
    }
  );

  const { BillView = {} } = billDetail || {};

  // FETCH ORDER DETAIL
  const { data: orderDetail } = useQuery(
    ["orderDetail", mainOrderId, billDetail],
    () => {
      if (!!id) {
        return orderApi
          .getById(billDetail?.BillView?.bill?.mainOrderId)
          .then((res) => res.data);
      } else {
        return orderApi.getById(mainOrderId).then((res) => res.data);
      }
    },
    {
      enabled: !!mainOrderId || !!billDetail?.BillView?.bill?.mainOrderId,
    }
  );

  const { mainOrder = {} } = orderDetail || {};

  // METHODS
  const handleCoppyReceiver = useCallback(() => {
    const { receiverFullName, receiverPhone, receiverEmail, receiverAddress } =
      mainOrder;

    setValue("billRecipientName", receiverFullName);

    setValue("billRecipientPhone", receiverPhone);

    setValue("billRecipientEmail", receiverEmail);

    setValue("billRecipientAddress", receiverAddress);
  }, [mainOrder]);

  // SIDE EFFECTS
  useEffect(() => {
    if (!!orderDetail) {
      const { mainOrder = {}, mainOrderDetail = [] } = orderDetail;

      const { attachFile } = mainOrder;

      defaultReceiver && handleCoppyReceiver();

      setValue("attachFile", !attachFile ? [] : attachFile.split?.(","));

      const orderProducts = mainOrderDetail.map((prod: any, index: number) => ({
        ...prod,
        no: index + 1,
        manufactor: prod?.productManufactor,
        specs: prod?.productSpecs,
      }));

      setValue("products", orderProducts);
    }
  }, [orderDetail]);

  useEffect(() => {
    defaultReceiver && handleCoppyReceiver();
  }, [defaultReceiver]);

  useEffect(() => {
    !!fromOrderId && setValue("mainOrderId", fromOrderId);
  }, [fromOrderId]);

  return (
    <FormProvider {...method}>
      {!!id ? (
        <Box className="grid grid-cols-1 gap-y-3 mb-4">
          <BillDetailStatus
            currentStatus={BillView.bill?.status}
            refetch={refetch}
          />

          <BillDetailGeneralView
            data={{
              orderCode: BillView?.mainOrder?.mainOrderCode,
              salesAdminName: BillView?.mainOrder?.salesAdminName,
              branchCode: BillView?.mainOrder?.branchCode,
              billCode: BillView?.bill?.billCode,
              billNumber: BillView?.bill?.billNumber,
              billCreatedAt: BillView?.bill?.created,
            }}
          />
        </Box>
      ) : (
        <BillDetailGeneral
          data={{
            saleAdmin: mainOrder.salesAdminCode,
            branchCode: mainOrder.branchCode,
          }}
        />
      )}

      <Box className="grid grid-cols-2 gap-4 my-4">
        <BillDetailCustomer
          data={{
            customerCode: mainOrder.customerCode,
            customerName: mainOrder.companyName,
            address: mainOrder.companyAddress,
            taxCode: mainOrder.companyTaxCode,
          }}
        />

        <BillDetailCurator
          data={{
            curatorName: mainOrder.curatorName,
            curatorDepartmentName: mainOrder.curatorDepartmentName,
            curatorPhone: mainOrder.curatorPhone,
            curatorEmail: mainOrder.curatorEmail,
          }}
        />
      </Box>

      <BillDetailProducts productList={orderDetail?.mainOrderDetail || []} />

      <Box className="grid grid-cols-2 gap-4 my-4">
        {!!id ? (
          <BillDetailRecieverView
            data={{
              name: BillView?.bill?.billRecipientName,
              phone: BillView?.bill?.billRecipientPhone,
              email: BillView?.bill?.billRecipientEmail,
              address: BillView?.bill?.billRecipientAddress,
            }}
          />
        ) : (
          <BillDetailReciever />
        )}

        <Box>
          <BillDetailAttach />
          {!!id && (
            <BillDetailPaymentStatus
              data={{
                paid: BillView?.paid,
                unPaid: BillView?.collectedPaid,
              }}
            />
          )}
        </Box>
      </Box>

      {!!id && (
        <BillDetailPaymentHistory
          refetch={refetch}
          data={BillView?.paymentHistory || []}
          paidData={{
            id,
            nextPaymentDate: 0,
            unPaid: BillView?.collectedPaid,
          }}
        />
      )}

      <BillDetailButtons
        refetch={refetch}
        sendMailData={{
          to: BillView?.bill?.billRecipientEmail,
          status: BillView?.bill?.status,
          cc: [BillView?.mainOrder?.curatorEmail],
        }}
      />
    </FormProvider>
  );
};
