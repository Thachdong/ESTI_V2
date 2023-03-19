import { Box, Typography } from "@mui/material";
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

export const ExportDetailRecipient: React.FC = () => {
  // EEXTRACT PROPS
  const { id } = useRouter().query;

  const { control, watch } = useFormContext();

  const isDefaultReceiver = watch("isDefaultReceiver");

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

      <Box className="grid gap-3 rounded p-3 bg-white">
        {!id && (
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
          disabled={isDefaultReceiver || !!id}
        />

        <FormInput
          controlProps={{
            name: "receiverPhone",
            control,
            rules: { required: "Phải nhập SĐT" },
          }}
          label="SĐT"
          disabled={isDefaultReceiver || !!id}
        />

        <FormInput
          controlProps={{
            name: "receiverAddress",
            control,
            rules: { required: "Phải nhập Đ/c nhận hàng" },
          }}
          label="Đ/c nhận hàng"
          disabled={isDefaultReceiver || !!id}
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
          disabled={!!id}
        />

        <FormSelect
          controlProps={{
            name: "paymentDocument",
            control,
          }}
          label="Chứng từ thanh toán"
          options={paymentOptions || []}
          disabled={!!id}
          labelKey="paymentDocumentName"
          multiple
        />
      </Box>
    </Box>
  );
};
