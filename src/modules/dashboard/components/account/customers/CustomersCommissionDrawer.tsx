import { Drawer } from "@mui/material";
import React from "react";
import { OrderDetailCommission } from "~modules-dashboard/components";

type TProps = {
  open: boolean;
  onClose: () => void;
  orderId: string;
};

export const CustomersCommissionDrawer: React.FC<TProps> = ({
  open,
  onClose,
  orderId,
}) => {
  return (
    <Drawer anchor={"bottom"} open={open} onClose={onClose}>
      <OrderDetailCommission orderId={orderId} />
    </Drawer>
  );
};