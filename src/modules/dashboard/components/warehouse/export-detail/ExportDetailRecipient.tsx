import { Box, Paper, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { paymentDocument } from "src/api";
import {
  FormCheckbox,
  FormDatepicker,
  FormInput,
  FormSelect,
} from "~modules-core/components";
import { useRouter } from "next/router";

type TProps = {
  orderData: any;
};

export const ExportDetailRecipient: React.FC<TProps> = ({ orderData = {} }) => {
  // EEXTRACT PROPS
  const { transactionId } = useRouter().query;

  const { receiverFullName, receiverPhone, receiverAddress } = orderData;

  const { control, setValue, watch } = useFormContext();

  const isDefaultReceiver = watch("isDefaultReceiver");

  // SIDE EFFECTS
  useEffect(() => {
    setValue("receiverFullName", receiverFullName);

    setValue("receiverPhone", receiverPhone);

    setValue("receiverAddress", receiverAddress);
  }, [receiverFullName, receiverPhone, receiverAddress]);

  // DATA FETCHING
  const { data: paymentOptions } = useQuery(["paymentOptions"], () =>
    paymentDocument.getList().then((res) => res.data)
  );

  // DOM RENDERING
  return (
    <Box>
      <Typography className="text-sm font-medium mb-3">
        THÔNG TIN NHẬN HÀNG
      </Typography>

      <Box className="grid gap-4 rounded p-3 bg-white">
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
          disabled={isDefaultReceiver || !!transactionId}
        />

        <FormInput
          controlProps={{
            name: "receiverPhone",
            control,
            rules: { required: "Phải nhập SĐT" },
          }}
          label="SĐT"
          disabled={isDefaultReceiver || !!transactionId}
        />

        <FormInput
          controlProps={{
            name: "receiverAddress",
            control,
            rules: { required: "Phải nhập Đ/c nhận hàng" },
          }}
          label="Đ/c nhận hàng"
          disabled={isDefaultReceiver || !!transactionId}
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

        <FormSelect
          controlProps={{
            name: "paymentDocument",
            control,
          }}
          label="Chứng từ thanh toán"
          options={paymentOptions || []}
          disabled={!!transactionId}
          labelKey="paymentDocumentName"
          multiple
        />
      </Box>
    </Box>
  );
};
