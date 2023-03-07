import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useMutation, useQuery } from "react-query";
import { customerCompetitor, customerOpinion } from "src/api";
import {
  AddButton,
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
} from "~modules-core/components";
import { toast } from "~modules-core/toast";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";
import { opinionColumns } from "./data";
import { OpinionDialog } from "./OpinionDialog";

export const CustomerDetailOpinion: React.FC = () => {
  const [dialog, setDialog] = useState<TDefaultDialogState>({
    open: false,
  });

  const defaultValue = useRef<any>();

  const { id } = useRouter().query;

  const { data: demandList, refetch } = useQuery(
    ["OpinionList", id],
    () => customerOpinion.getByCustomerId(id as string).then((res) => res.data),
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
    const { opinionGroup, id } = defaultValue.current || {};

    if (confirm("Xác nhận xóa " + opinionGroup)) {
      await mutateDelete.mutateAsync(id);
    }
  }, []);

  const columns: TGridColDef[] = [
    ...opinionColumns,
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
          Quan điểm cạnh tranh
        </Typography>

        <AddButton onClick={() => onOpen("Add")}>Thêm quan điểm</AddButton>
      </Box>

      <Box className="bg-white rounded">
        <ContextMenuWrapper
          menuId="customer_opinion_table_menu"
          menuComponent={
            <Menu className="p-0" id="customer_opinion_table_menu">
              <Item
                id="view-opinion"
                onClick={() => onOpen("View")}
              >
                Cập nhật
              </Item>
              <Item id="delete-opinion" onClick={handleDelete}>
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

      <OpinionDialog
        onClose={onClose}
        open={dialog.open}
        type={dialog.type}
        refetch={refetch}
        defaultValue={defaultValue.current as any}
      />
    </Box>
  );
};
