import { Box, Paper, Typography } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { bookingOrder, branchs, staff } from "src/api";
import {
  FormInputBase,
  FormSelect,
  FormSelectAsync,
} from "~modules-core/components";

type TProps = {
  data: any;
  callback: (opt: any) => void;
};

export const ExportDetailGeneralInfo: React.FC<TProps> = ({
  data, callback
}) => {
  const [selectedBranch, setSelectedBranch] = useState<any>();
  
  const { control, watch } = useFormContext();

  const isForDelete = watch("isForDelete");

  const { branchCode, created, deliveryName, warehouseConfigCode } =
    data || {};

  const { data: deliveryOptions } = useQuery(
    ["deliveryOptions", { isForDelete }],
    () => staff.getListDeliveryStaff().then((res) => res.data),
    {
      enabled: isForDelete,
    }
  );

  return (
    <Paper className="rounded-sm p-3 mb-4">
      <Typography className="text-sm font-medium mb-3">
        THÔNG TIN CHUNG
      </Typography>

      <Box className="grid grid-cols-2 gap-4">
        {isForDelete ? (
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
        ) : (
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
        )}

        {/* <FormSelect
          options={warehouseExportStatus}
          controlProps={{
            control,
            name: "statusId",
          }}
          label="Trạng thái xuất kho"
          selectShape={{ valueKey: "value", labelKey: "label" }}
        /> */}

        {!isForDelete && (
          <FormInputBase
            value={created && moment(created).format("DD/MM/YYYY")}
            disabled={true}
            label="Ngày tạo"
          />
        )}

        {isForDelete ? (
          <FormSelect
            controlProps={{
              control,
              name: "deliveryId",
              rules: { required: "Phải chọn nhân viên giao nhận" },
            }}
            label="Nhân viên giao nhận"
            options={(deliveryOptions as []) || []}
            selectShape={{ valueKey: "id", labelKey: "fullName" }}
          />
        ) : (
          <FormInputBase
            value={deliveryName}
            disabled={true}
            label="Nhân viên giao nhận"
          />
        )}

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
      </Box>
    </Paper>
  );
};
