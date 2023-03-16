import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useMutation, useQuery } from "react-query";
import { advancePayment } from "src/api";
import {
  AddButton,
  ContextMenuWrapper,
  DataTable,
} from "~modules-core/components";
import { toast } from "~modules-core/toast";
import { addvancePaymentColumns } from "~modules-dashboard/pages/purchase/purchase-request-detail/data";
import { TDefaultDialogState } from "~types/dialog";
import { AdvancePaymentDialog } from "./AdvancePaymentDialog";

type TProps = {
  status: number;
};

export const OrderDetailAdvancePayment: React.FC<TProps> = ({
  status,
}) => {
  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });

  const defaultValue = useRef<any>();

  const router = useRouter();

  const { id } = router.query;

  // DATA FETCHING
  const { data: advancePaymentList, refetch } = useQuery(
    ["AdvancePaymentList", id],
    () =>
      advancePayment.getByOrder(id as string).then((res) => res.data),
    {
      enabled: !!id,
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

    const currentRow = advancePaymentList?.find((item: any) => item.id === id);

    defaultValue.current = currentRow;
  };

  const mutateDelete = useMutation((id: string) => advancePayment.delete(id), {
    onSuccess: (data: any) => {
      toast.success(data?.resultMessage);

      refetch?.();
    },
  });

  const handleDelete = useCallback(async () => {
    const { contentBilling, id } = defaultValue.current || {};

    if (confirm("Xác nhận xóa tạm ứng: " + contentBilling)) {
      await mutateDelete.mutateAsync(id);
    }
  }, [id]);

  return (
    <Box className="flex flex-col mt-4">
      <Typography className="font-bold uppercase mb-3 text-sm">
        Lịch sử tạm ứng
      </Typography>

      <Box className="bg-white grid gap-4 rounded">
        <ContextMenuWrapper
          menuId="product_table_menu"
          menuComponent={
            <Menu className="p-0" id="product_table_menu">
              <Item
                disabled={status > 2}
                id="view-product"
                onClick={() => onOpen("View")}
              >
                Cập nhật
              </Item>
              <Item disabled={status > 2} id="delete-product" onClick={handleDelete}>
                Xóa
              </Item>
            </Menu>
          }
        >
          <DataTable
            rows={
              advancePaymentList?.map?.((item: any, index: number) => ({
                ...item,
                no: index + 1,
              })) || []
            }
            columns={addvancePaymentColumns}
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

      {status === 2 && (
        <AddButton
          onClick={() => onOpen("Add")}
          className="max-w-[250px] ml-auto my-3 "
        >
          Tạo tạm ứng
        </AddButton>
      )}

      <AdvancePaymentDialog
        onClose={onClose}
        open={dialog.open}
        type={dialog.type}
        refetch={refetch}
        defaultValue={defaultValue.current}
      />
    </Box>
  );
};
