import { Box, List, ListItem, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useQueries } from "react-query";
import { paymentDocument, paymentType } from "src/api";
import {
  FormDatepicker,
  FormInput,
  FormSelect,
} from "~modules-core/components";

type TProps = {
  disabled: boolean;
};

export const PurchaseDetailTerms: React.FC<TProps> = ({ disabled }) => {
  const { control } = useFormContext();

  const selectOptions = useQueries([
    {
      queryKey: "paymentTypes",
      queryFn: () => paymentType.getList().then((res) => res.data),
    },
    {
      queryKey: "paymentDocument",
      queryFn: () => paymentDocument.getList().then((res) => res.data),
    },
  ]);

  return (
    <Box className="flex flex-col mb-4">
      <Typography className="font-bold uppercase mb-3 text-sm">
        Điều khoản của đơn mua hàng/ Terms and conditions of purchasing order:
      </Typography>

      <List className="bg-white rounded flex-grow p-3">
        <ListItem className="px-2 pb-0">
          - Tổng cộng tiền thanh toán đã bao đồm thuế GTGT và chi phí giao hàng/
          Total amount are included VAT and delivery fee
        </ListItem>

        <ListItem className="px-2 pb-0">
          - Hình thức thanh toán/ Payment term:
          <FormSelect
            options={selectOptions[0].data || []}
            label=""
            controlProps={{
              control,
              name: "paymentType",
            }}
            className="min-w-[250px] ml-2"
            labelKey="paymentTypeName"
            disabled={disabled}
            shrinkLabel
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
            shrinkLabel
            disabled={disabled}
          />
        </ListItem>

        <ListItem className="px-2 pb-0">
          - Chứng từ thanh toán / Payment documents:
          <FormSelect
            options={selectOptions[1].data || []}
            label=""
            controlProps={{
              control,
              name: "paymentDocument",
            }}
            className="min-w-[200px] ml-2"
            shrinkLabel
            multiple
            labelKey="paymentDocumentName"
            disabled={disabled}
          />
        </ListItem>
      </List>
    </Box>
  );
};
