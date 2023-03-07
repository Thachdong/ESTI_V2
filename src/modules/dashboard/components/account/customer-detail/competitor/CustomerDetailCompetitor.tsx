import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useMutation, useQuery } from "react-query";
import { customerCompetitor } from "src/api";
import {
  AddButton,
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
} from "~modules-core/components";
import { toast } from "~modules-core/toast";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";
import { competitorColumns } from "./data";
import { CompetitorDialog } from "./CompetitorDialog";

export const CustomerDetailCompetitor: React.FC = () => {
  const [dialog, setDialog] = useState<TDefaultDialogState>({
    open: false,
  });

  const defaultValue = useRef<any>();

  const { id } = useRouter().query;

  const { data: demandList, refetch } = useQuery(
    ["CompetitorList", id],
    () => customerCompetitor.getByCustomerId(id as string).then((res) => res.data),
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

    const currentRow = demandList.find((item: any) => item.id === id);

    defaultValue.current = currentRow;
  };

  const mutateDelete = useMutation((id: string) => customerCompetitor.delete(id), {
    onSuccess: (data) => {
      toast.success(data.resultMessage);

      refetch();
    },
  });

  const handleDelete = useCallback(async () => {
    const { competitorName, id } = defaultValue.current || {};

    if (confirm("Xác nhận xóa " + competitorName)) {
      await mutateDelete.mutateAsync(id);
    }
  }, []);

  const columns: TGridColDef[] = [
    ...competitorColumns,
    {
      field: "action",
      headerName: "",
      width: 50,
      renderCell: ({ row }) => (
        <DropdownButton
          id={row?.id}
          items={[
            {
              action: () => onOpen("View"),
              label: "Thông tin chi tiết",
            },
            {
              action: handleDelete,
              label: "Xóa",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <Box className="flex flex-col my-4">
      <Box className="flex items-center mb-3">
        <Typography className="font-bold uppercase text-sm mr-3">
          Đối thủ
        </Typography>

        <AddButton onClick={() => onOpen("Add")}>Thêm đối thủ</AddButton>
      </Box>

      <Box className="bg-white rounded">
        <ContextMenuWrapper
          menuId="customer_competitor_table_menu"
          menuComponent={
            <Menu className="p-0" id="customer_competitor_table_menu">
              <Item
                id="view-competitor"
                onClick={() => onOpen("View")}
              >
                Cập nhật
              </Item>
              <Item id="delete-competitor" onClick={handleDelete}>
                Xóa
              </Item>
            </Menu>
          }
        >
          <DataTable
            columns={columns}
            rows={demandList || []}
            hideFooter
            hideSearchbar
            autoHeight
            componentsProps={{
              row: {
                onMouseEnter: onMouseEnterRow,
              },
            }}
          />
        </ContextMenuWrapper>
      </Box>

      <CompetitorDialog
        onClose={onClose}
        open={dialog.open}
        type={dialog.type}
        refetch={refetch}
        defaultValue={defaultValue.current as any}
      />
    </Box>
  );
};
