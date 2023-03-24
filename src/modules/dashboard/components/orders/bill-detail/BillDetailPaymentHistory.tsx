import { Box, Typography } from "@mui/material";
import moment from "moment";
import { useCallback, useState } from "react";
import { AddButton, DataTable } from "~modules-core/components";
import { BillListBillDialog } from "~modules-dashboard/components";
import { paymentHistoryColumns } from "~modules-dashboard/pages/orders/bill-detail/data";
import { TDefaultDialogState } from "~types/dialog";

type TProps = {
  data: any[];
  paidData: any;
  refetch: () => void;
};

export const BillDetailPaymentHistory: React.FC<TProps> = ({
  data = [],
  refetch,
  paidData,
}) => {
  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });

  // METHODS
  const onClose = useCallback(() => {
    setDialog({ open: false });
  }, []);

  const onOpen = useCallback(() => {
    setDialog({ open: true });
  }, []);

  const historyLength = data.length;

  const { nextPaymentDate } = data?.[historyLength - 1] || {};
  
  return (
    <Box>
      <Box className="flex justify-between items-center mb-3">
        <Typography className="font-bold uppercase text-sm">
          THÔNG TIN THANH TOÁN
        </Typography>

        <Typography>
          <span className="font-semibold">Ngày thanh toán tiếp theo: </span>
          {nextPaymentDate
            ? moment(nextPaymentDate).format("DD/MM/YYYY")
            : "__"}
        </Typography>
      </Box>

      <Box className="bg-white rounded pb-3">
        <DataTable
          rows={data?.map((item: any, index: number) => ({
            ...item,
            no: index + 1,
          }))}
          columns={paymentHistoryColumns}
          hideFooter
          hideSearchbar
          autoHeight
        />
      </Box>

      {/* {paidData?.unPaid > 0 && ( // api yêu cầu luôn mở nút thêm phiếu thanh toán
        <Box className="flex justify-end">
          <AddButton onClick={onOpen} className="max-w-[250px] !ml-auto my-3">
            Thêm phiếu thanh toán
          </AddButton>
        </Box>
      )} */}

      <Box className="flex justify-end">
        <AddButton onClick={onOpen} className="max-w-[250px] !ml-auto my-3">
          Thêm phiếu thanh toán
        </AddButton>
      </Box>

      <BillListBillDialog
        onClose={onClose}
        open={dialog.open}
        defaultValue={paidData}
        refetch={refetch}
      />
    </Box>
  );
};
