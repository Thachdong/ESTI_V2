import { Box, Typography } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import { useCallback, useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useMutation, useQuery } from "react-query";
import { commission } from "src/api";
import {
  AddButton,
  ContextMenuWrapper,
  DataTable,
} from "~modules-core/components";
import { toast } from "~modules-core/toast";
import { _format } from "~modules-core/utility/fomat";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";
import { CommissionDialog } from "./CommissionDialog";

const commissionColumns: TGridColDef[] = [
  {
    field: "paymentDate",
    headerName: "Ngày chi",
    minWidth: 100,
    renderCell: ({ row }) => row?.paymentDate ? moment(row?.paymentDate).format("DD/MM/YYYY") : "",
  },
  {
    field: "paid",
    headerName: "Số tiền chuyển",
    minWidth: 150,
    flex: 1,
    renderCell: ({ row }) => _format.getVND(row?.paid),
  },
  {
    field: "fullName",
    headerName: "Người tạo",
    minWidth: 120,
    flex: 1,
  },
];

// PASS ORDERID FOR REUSER IN CUSTOMER DETAIL PAGE
type TProps = {
  orderId: string
}

export const OrderDetailCommission: React.FC<TProps> = ({orderId}) => {
  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });

  const defaultValue = useRef<any>();

  // DATA FETCHING
  const { data: commissionList, refetch } = useQuery(
    ["CommissionList", orderId],
    () => commission.getByOrderId(orderId).then((res) => res.data),
    {
      enabled: !!orderId,
    }
  );

  // METHODS
  const onClose = useCallback(() => {
    setDialog({ open: false });
  }, []);

  const onOpen = useCallback((type: string) => {
    setDialog({ open: true, type });
  }, []);

  const onMouseEnterRow = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id;

    const currentRow = commissionList?.find((item: any) => item.id === id);

    defaultValue.current = currentRow;
  };

  const mutateDelete = useMutation((id: string) => commission.delete(id), {
    onSuccess: (data: any) => {
      toast.success(data?.resultMessage);

      refetch?.();
    },
  });

  const handleDelete = useCallback(async () => {
    const { id } = defaultValue.current || {};

    if (confirm("Xác nhận xóa hoa hồng")) {
      await mutateDelete.mutateAsync(id);
    }
  }, [defaultValue]);

  return (
    <Box className="flex flex-col mt-4">
      <Typography className="font-bold uppercase mb-3 text-sm">
        Lịch sử hoa hồng
      </Typography>

      <Box className="bg-white grid gap-4 rounded">
        <ContextMenuWrapper
          menuId="commission_table_menu"
          menuComponent={
            <Menu className="p-0" id="commission_table_menu">
              <Item id="delete-product" onClick={handleDelete}>
                Xóa
              </Item>
            </Menu>
          }
        >
          <DataTable
            rows={
              commissionList?.map?.((item: any, index: number) => ({
                ...item,
                no: index + 1,
              })) || []
            }
            columns={commissionColumns}
            componentsProps={{
              row: {
                onMouseEnter: onMouseEnterRow,
              },
            }}
            hideSearchbar
            autoHeight
            hideFooter
          />
        </ContextMenuWrapper>
      </Box>

      <AddButton
        onClick={() => onOpen("AddCommission")}
        className="max-w-[250px] ml-auto my-3 "
      >
        Tạo hoa hồng
      </AddButton>

      <CommissionDialog
        onClose={onClose}
        open={dialog.open && dialog.type === "AddCommission"}
        refetch={refetch}
        defaultValue={{orderId} as any}
      />
    </Box>
  );
};
