import { Box, List, ListItem, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { paymentDocument } from "src/api";
import {
  FormDatepicker,
  FormInput,
  FormSelect,
} from "~modules-core/components";
import { paymentTypes } from "~modules-core/constance";

type TProps = {
  disabled: boolean;
};

export const QuoteDetailTerms: React.FC<TProps> = ({ disabled }) => {
  const { id } = useRouter().query;

  const { control, watch } = useFormContext();

  const paymentTypesValue = watch("paymentType");

  const { data } = useQuery(["PaymentDocument"], () =>
    paymentDocument.getList().then((res) => res.data)
  );

  return (
    <Box className="flex flex-col">
      <Typography className="font-bold uppercase mb-3 text-sm">
        Điều khoản của đơn đặt hàng/ Terms and conditions of purchasing order:
      </Typography>

      <Box className="bg-white rounded flex-grow p-3 ">
        <List className="p-0">
          <ListItem disableGutters className="pb-0 text-sm">
            - Tổng cộng tiền thanh toán đã bao đồm thuế GTGT và chi phí giao
            hàng/ Total amount are included VAT and delivery fee
          </ListItem>

          <ListItem disableGutters className="pb-0 text-sm">
            - Hình thức thanh toán/ Payment term:
            <FormSelect
              controlProps={{
                name: "paymentType",
                control,
              }}
              label=""
              options={paymentTypes}
              disabled={disabled}
              valueKey="name"
              freeSolo
              className="w-[200px] ml-2"
              shrinkLabel
            />
          </ListItem>

          <ListItem disableGutters className="pb-0 text-sm">
            - Thời gian giao hàng dự kiến / Estimated to delivery: {"  "}
            <FormDatepicker
              label=""
              controlProps={{
                control,
                name: "deliverDate",
              }}
              className="min-w-[200px] ml-2"
              disabled={disabled}
            />
          </ListItem>

          <ListItem disableGutters className="pb-0 text-sm">
            - Hiệu lực của báo giá / Valid Thru:
            <FormDatepicker
              label=""
              controlProps={{
                control,
                name: "expireDate",
              }}
              className="min-w-[200px] ml-2"
              disabled={disabled}
            />
          </ListItem>

          <ListItem disableGutters className="pb-0 text-sm">
            - Địa điểm giao hàng/ Place of Delivery:
            <FormInput
              label=""
              controlProps={{
                control,
                name: "receiverAddress",
              }}
              className="min-w-[200px] ml-2"
              fullWidth={false}
              shrinkLabel
              disabled={disabled}
            />
          </ListItem>

          <ListItem disableGutters className="text-sm">
            - Chứng từ thanh toán / Payment documents:
            <FormSelect
              options={data}
              label=""
              controlProps={{
                control,
                name: "paymentDocument",
              }}
              className="min-w-[200px] ml-2"
              labelKey="paymentDocumentName"
              shrinkLabel
              multiple
              disabled={disabled}
            />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};
