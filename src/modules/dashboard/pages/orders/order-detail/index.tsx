import { Box } from "@mui/material";
import React, { useState } from "react";
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
  OrderDetailNote,
  OrderDetailProducts,
  OrderDetailReciever,
} from "~modules-dashboard/components";

export const OrderDetailPage: React.FC = () => {
  const [isUpdate, setIsUpdate] = useState(false);

  const method = useForm({
    mode: "onBlur",
    defaultValues: {
      products: [],
      defaultReceiver: true,
      notFromQuote: false,
    },
  });
  
  return (
    <FormProvider {...method}>
      <Box className="container-center grid grid-cols-2 gap-4">
        <FormCheckbox
          label="Đặt hàng không thông qua đơn mua"
          controlProps={{
            name: "notFromQuote",
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

        <OrderDetailAttach disabled={true} />

        <OrderDetailAddition />

        <Box className="col-span-2">
          <OrderDetailProducts />
        </Box>

        <Box className="col-span-2 grid grid-cols-2 lg:grid-cols-4 gap-4">
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
      </Box>

      <OrderDetailButtons isUpdate={isUpdate} setIsUpdate={setIsUpdate} />
    </FormProvider>
  );
};
