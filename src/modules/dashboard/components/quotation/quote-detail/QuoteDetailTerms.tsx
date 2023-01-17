import { Box, List, ListItem, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import {
  FormDatepicker,
  FormInput,
  FormSelect,
} from "~modules-core/components";

export const QuoteDetailTerms = () => {
  const { control } = useFormContext();

  return (
    <Box className="flex flex-col">
      <Typography className="font-bold uppercase mb-3">
        Điều khoản của đơn đặt hàng/ Terms and conditions of purchasing order:
      </Typography>

      <Box className="bg-white rounded-sm flex-grow px-3">
        <List className="p-0">
          <ListItem disableGutters className="pb-0">
            - Tổng cộng tiền thanh toán đã bao đồm thuế GTGT và chi phí giao
            hàng/ Total amount are included VAT and delivery fee
          </ListItem>

          <ListItem disableGutters className="pb-0">
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

          <ListItem disableGutters className="pb-0">
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

          <ListItem disableGutters className="pb-0">
            - Hiệu lực của báo giá / Valid Thru:
            <FormDatepicker
              label=""
              controlProps={{
                control,
                name: "quoteValidDate",
              }}
              className="min-w-[200px] ml-2"
            />
          </ListItem>

          <ListItem disableGutters className="pb-0">
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

          <ListItem disableGutters>
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
    </Box>
  );
};
