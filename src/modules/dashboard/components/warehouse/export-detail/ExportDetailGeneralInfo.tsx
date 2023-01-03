import { Box, Paper, Typography } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { bookingOrder, branchs, staff, warehouse } from "src/api";
import {
  BaseButton,
  FormInputBase,
  FormSelect,
  FormSelectAsync,
} from "~modules-core/components";
import { warehouseExportStatus } from "~modules-core/constance";
import { toast } from "~modules-core/toast";

type TProps = {
  data: any;
  callback: (opt: any) => void;
};

export const ExportDetailGeneralInfo: React.FC<TProps> = ({
  data,
  callback,
}) => {  
  // EXTRACT PROPS
  const { transactionId } = useRouter().query;

  const { control, watch, setValue } = useFormContext();

  const isForDelete = watch("isForDelete");

  const {deliverId} = data || {};
  
  const {
    id,
    branchCode,
    created,
    deliveryName,
    warehouseConfigCode,
    mainOrderCode,
  } = data || {};

  useEffect(() => {
    deliverId && setValue("deliveryId", deliverId);
  }, [data])

  // DATA FETCHING
  const { data: deliveryOptions } = useQuery(
    ["deliveryOptions", { isForDelete }],
    () => staff.getListDeliveryStaff().then((res) => res.data),
    {
      enabled: isForDelete,
    }
  );

  const mutateUpdateStatus = useMutation(
    (payload: any) =>
      warehouse.updateExportSessionStatus(payload?.id, payload?.status),
    {
      onSuccess: (data) => {
        toast.success(data.resultMessage);
      },
      onError: (err: any) => {
        toast.error(err?.resultMessage);
      },
    }
  );

  // DOM UTILITIES
  const renderInputTag = useCallback(() => {
    switch (true) {
      case !!transactionId:
        return <FormInputBase value={mainOrderCode} disabled />;
      case isForDelete:
        return (
          <FormSelectAsync
            fetcher={branchs.getList}
            controlProps={{
              control,
              name: "branchId",
              rules: { required: "Phải chọn chi nhánh" },
            }}
            callback={callback}
            label="Mã chi nhánh"
          />
        );
      case !isForDelete:
        return (
          <FormSelectAsync
            fetcher={bookingOrder.getList}
            fetcherParams={{ status: 2 }} // Lấy order đang thực hiện
            selectShape={{ valueKey: "id", labelKey: "mainOrderCode" }}
            controlProps={{
              control,
              name: "mainOrderId",
              rules: { required: "Phải chọn đơn đặt hàng" },
            }}
            label="Đơn đặt hàng"
          />
        );
    }
  }, [transactionId, isForDelete]);

  const renderStatusTag = useCallback(() => {
    if (!transactionId) return;

    return (
      <>
        <FormSelect
          options={warehouseExportStatus}
          controlProps={{
            control,
            name: "exportStatus",
          }}
          label="Trạng thái xuất kho"
          getOptionLabel={option => option?.label}
          valueKey="value"
        />

        <Box className="flex justify-end col-span-2">
          <BaseButton>Cập nhật trạng thái</BaseButton>
        </Box>
      </>
    );
  }, [transactionId]);

  return (
    <Paper className="rounded-sm p-3 mb-4">
      <Typography className="text-sm font-medium mb-3">
        THÔNG TIN CHUNG
      </Typography>

      <Box className="grid grid-cols-2 gap-4">
        {renderInputTag()}

        {!isForDelete && (
          <FormInputBase
            value={created && moment(created).format("DD/MM/YYYY")}
            disabled={true}
            label="Ngày tạo"
          />
        )}

        <FormSelect
          controlProps={{
            control,
            name: "deliveryId",
            rules: { required: "Phải chọn nhân viên giao nhận" },
          }}
          label="Nhân viên giao nhận"
          options={deliveryOptions || []}
          disabled={!isForDelete}
          getOptionLabel={option => option?.fullName}
        />

        {!isForDelete && (
          <FormInputBase
            value={branchCode}
            disabled={true}
            label="Mã chi nhánh"
          />
        )}

        <FormInputBase
          value={warehouseConfigCode}
          disabled={true}
          label="Mã kho"
        />

        {renderStatusTag()}
      </Box>
    </Paper>
  );
};
