import { Box, List, ListItem, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import {
  FormDatepicker,
  FormInput,
  FormSelect,
} from "~modules-core/components";

export const PurchaseDetailTerms = () => {
  const { control } = useFormContext();

  return (
    <Box className="bg-white p-4 mb-4">
      <Typography className="font-semibold">
        Điều khoản của đơn đặt hàng/ Terms and conditions of purchasing order:
      </Typography>

      <List className="p-0">
        <ListItem className="px-2 pb-0">
          - Tổng cộng tiền thanh toán đã bao đồm thuế GTGT và chi phí giao hàng/
          Total amount are included VAT and delivery fee
        </ListItem>

        <ListItem className="px-2 pb-0">
          - Hình thức thanh toán/ Payment term:
          <FormSelect
            options={[]}
            label=""
            controlProps={{
              control,
              name: "paymentMethod",
            }}
            className="min-w-[200px] ml-2"
          />
        </ListItem>

        <ListItem className="px-2 pb-0">
          - Thời gian giao hàng dự kiến / Estimated to delivery: {"  "}
          <FormDatepicker
            label=""
            controlProps={{
              control,
              name: "deliverDate",
            }}
            className="min-w-[200px] ml-2"
          />
        </ListItem>

        <ListItem className="px-2 pb-0">
          - Địa điểm giao hàng/ Place of Delivery:
          <FormInput
            label=""
            controlProps={{
              control,
              name: "receiverAddress",
            }}
            className="min-w-[200px] ml-2"
            fullWidth={false}
          />
        </ListItem>

        <ListItem className="px-2 pb-0">
          - Chứng từ thanh toán / Payment documents:
          <FormSelect
            options={[]}
            label=""
            controlProps={{
              control,
              name: "paymentDocument",
            }}
            className="min-w-[200px] ml-2"
          />
        </ListItem>
      </List>
    </Box>
  );
};
