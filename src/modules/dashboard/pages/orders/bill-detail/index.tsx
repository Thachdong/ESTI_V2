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
  BillDetailProducts,
  BillDetailReciever,
} from "~modules-dashboard/components";

export const BillDetailPage: React.FC = () => {
  const { id } = useRouter().query;

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
  const { data: billDetail, refetch } = useQuery(
    ["billDetail", id],
    () => bill.getById(id as string).then((res) => res.data),
    {
      enabled: !!id,
    }
  );

  const { data: orderDetail } = useQuery(
    ["orderDetail", mainOrderId],
    () => orderApi.getById(mainOrderId).then((res) => res.data),
    {
      enabled: !!mainOrderId,
    }
  );

  const { mainOrder = {} } = orderDetail || {};

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

  return (
    <FormProvider {...method}>
      <BillDetailGeneral
        data={{
          saleAdmin: mainOrder.salesAdminCode,
          branchCode: mainOrder.branchCode,
        }}
      />

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
        <BillDetailReciever />

        <BillDetailAttach />
      </Box>

      <BillDetailButtons refetch={refetch} />
    </FormProvider>
  );
};