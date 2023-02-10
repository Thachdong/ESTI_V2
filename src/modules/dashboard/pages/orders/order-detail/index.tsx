import { Box } from "@mui/material";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormCheckbox } from "~modules-core/components";
import { _format } from "~modules-core/utility/fomat";
import {
  OrderDetailAddition,
  OrderDetailAttach,
  OrderDetailButtons,
  OrderDetailCurator,
  OrderDetailCustomer,
  OrderDetailGeneral,
  OrderDetailImplement,
  OrderDetailProducts,
  OrderDetailReciever,
} from "~modules-dashboard/components";

export const OrderDetailPage: React.FC = () => {
  const method = useForm({
    defaultValues: {
      products: [],
      defaultReceiver: true,
      isQuote: false,
    },
  });
  return (
    <Box className="container-center grid grid-cols-2 gap-4">
      <FormProvider {...method}>
        <FormCheckbox
          label="Đặt hàng không thông qua đơn mua"
          controlProps={{
            name: "isQuote",
            control: method.control,
          }}
        />

        <Box className="col-span-2">
          <OrderDetailGeneral />
        </Box>

        <OrderDetailCustomer />

        <OrderDetailCurator />

        <Box className="col-span-2 grid grid-cols-3 gap-4">
          <Box className="col-span-2">
            <OrderDetailReciever />
          </Box>

          <OrderDetailImplement />
        </Box>

        <OrderDetailAttach disabled={false} />

        <OrderDetailAddition />

        <Box className="col-span-2">
          <OrderDetailProducts />
        </Box>

        <OrderDetailButtons />
      </FormProvider>
    </Box>
  );
};
