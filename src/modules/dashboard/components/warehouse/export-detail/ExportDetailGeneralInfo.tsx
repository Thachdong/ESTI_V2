import { Box, Paper, Typography } from "@mui/material";
import moment from "moment";
import { Dispatch, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { bookingOrder, branchs, staff } from "src/api";
import {
  FormInputBase,
  FormSelect,
  FormSelectAsync,
} from "~modules-core/components";

type TProps = {
  orderDetail: any;
  selectedBranch: any;
  setSelectedBranch: Dispatch<any>;
};

export const ExportDetailGeneralInfo: React.FC<TProps> = ({ orderDetail, selectedBranch, setSelectedBranch }) => {
  // EXTRACT PROPS
  const { control, watch } = useFormContext();

  const isForDelete = watch("isForDelete");

  // DATA FETCHING
  const { data: deliveryOptions } = useQuery(["deliveryOptions"], () =>
    staff.getListDeliveryStaff().then((res) => res.data)
  );

  // DOM UTILITIES
  const renderInputTag = useCallback(() => {
    if (isForDelete) {
      return (
        <>
          <FormSelectAsync
            fetcher={branchs.getList}
            controlProps={{
              control,
              name: "branchId",
              rules: { required: "Phải chọn chi nhánh" },
            }}
            callback={(opt) => setSelectedBranch(opt)}
            label="Mã chi nhánh"
            labelKey="code"
          />
          <FormSelect
            options={deliveryOptions}
            label="Nhân viên giao nhận"
            controlProps={{
              name: "deliveryId",
              control: control,
              rules: { required: "Phải chọn nhân viên giao nhận" },
            }}
            labelKey="fullName"
          />
        </>
      );
    } else {
      return (
        <>
          <FormSelectAsync
            fetcher={bookingOrder.getList}
            fetcherParams={{ status: 2 }} // Lấy order đang thực hiện
            controlProps={{
              control,
              name: "mainOrderId",
              rules: { required: "Phải chọn đơn đặt hàng" },
            }}
            label="Đơn đặt hàng"
            labelKey="mainOrderCode"
          />
          <FormInputBase
            value={
              orderDetail?.created &&
              moment(orderDetail?.created).format("DD/MM/YYYY")
            }
            disabled={true}
            label="Ngày tạo"
          />
          <FormInputBase
            value={orderDetail?.deliveryCode}
            label="Nhân viên giao nhận"
            disabled
          />
          <FormInputBase
            value={orderDetail?.branchCode}
            disabled={true}
            label="Mã chi nhánh"
          />
        </>
      );
    }
  }, [isForDelete, orderDetail]);

  return (
    <Paper className="rounded-sm p-3 mb-4">
      <Typography className="text-sm font-medium mb-3">
        THÔNG TIN CHUNG
      </Typography>

      <Box className="grid grid-cols-2 gap-4">
        {renderInputTag()}

        <FormInputBase
          value={
            orderDetail?.warehouseConfigCode ||
            selectedBranch?.warehouseConfigCode
          }
          disabled={true}
          label="Mã kho"
        />
      </Box>
    </Paper>
  );
};
