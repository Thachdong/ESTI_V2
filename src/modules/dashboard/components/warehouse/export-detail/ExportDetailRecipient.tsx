import { Box, Paper, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { paymentDocument } from "src/api";
import {
  FormCheckbox,
  FormDatepicker,
  FormInput,
  FormSelectMultiple,
} from "~modules-core/components";
import { useRouter } from "next/router";

type TProps = {
  selectedOrder: any;
};

export const ExportDetailRecipient: React.FC<TProps> = ({ selectedOrder }) => {
  const { transactionId } = useRouter().query;

  const { receiverFullName, receiverPhone, receiverAddress } =
    selectedOrder || {};

  const { control, setValue, watch } = useFormContext();

  const isDefaultReceiver = watch("isDefaultReceiver");

  useEffect(() => {
    setValue("receiverFullName", receiverFullName);

    setValue("receiverPhone", receiverPhone);

    setValue("receiverAddress", receiverAddress);
  }, [receiverFullName, receiverPhone, receiverAddress]);

  const { data: paymentOptions } = useQuery(["paymentOptions"], () =>
    paymentDocument.getList().then((res) => res.data)
  );

  return (
    <Paper className="rounded-sm p-3">
      <Typography className="text-sm font-medium mb-3">
        THÔNG TIN NHẬN HÀNG
      </Typography>

      <Box className="grid gap-4">
        {!transactionId && (
          <FormCheckbox
            controlProps={{
              name: "isDefaultReceiver",
              control,
            }}
            label="Sử dụng thông tin trong đơn hàng"
            defaultChecked
          />
        )}

        <FormInput
          controlProps={{
            name: "receiverFullName",
            control,
            rules: { required: "Phải nhập người nhận hàng" },
          }}
          label="Người nhận hàng"
          disabled={isDefaultReceiver}
        />

        <FormInput
          controlProps={{
            name: "receiverPhone",
            control,
            rules: { required: "Phải nhập SĐT" },
          }}
          label="SĐT"
          disabled={isDefaultReceiver}
        />

        <FormInput
          controlProps={{
            name: "receiverAddress",
            control,
            rules: { required: "Phải nhập Đ/c nhận hàng" },
          }}
          label="Đ/c nhận hàng"
          disabled={isDefaultReceiver}
          multiline
          minRows={2}
        />

        <FormDatepicker
          controlProps={{
            name: "deliveryDate",
            control,
            rules: { required: "Phải chọn ngày giao dự kiến" },
          }}
          label="Ngày giao dự kiên"
          disabled={!!transactionId}
        />

        <FormSelectMultiple
          controlProps={{
            name: "paymentDocument",
            control,
          }}
          label="Chứng từ thanh toán"
          selectShape={{ valueKey: "id", labelKey: "paymentDocumentName" }}
          options={paymentOptions || []}
          disabled={!!transactionId}
        />
      </Box>
    </Paper>
  );
};
