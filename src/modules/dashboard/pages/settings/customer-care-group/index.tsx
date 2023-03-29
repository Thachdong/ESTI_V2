import { Box, Paper } from "@mui/material";
import moment from "moment";
import React, { useCallback, useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useMutation, useQuery } from "react-query";
import { customerCareGroup } from "src/api";
import {
  AddButton,
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
  SearchBox,
} from "~modules-core/components";
import { toast } from "~modules-core/toast";
import { CustomerCareGroupDialog } from "~modules-dashboard/components";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";

export const CustomerCareGroupPage: React.FC = () => {
  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });

  const defaultValue = useRef<any>();

  // DIALOG METHODS
  const onClose = useCallback(() => setDialog({ open: false }), []);

  const onOpen = useCallback((type: string) => {
    setDialog({ open: true, type });
  }, []);

  // DATA FETCHING
  const {
    data: customerCareGroups,
    isLoading,
    isFetching,
    refetch,
  } = useQuery(["CustomerCareGroupList"], () =>
    customerCareGroup.getAll().then((res) => res.data)
  );

  // DATA TABLE
  // MUTATION DECLERATIONS
  const mutateDelete = useMutation(
    (id: string) => customerCareGroup.delete(id),
    {
      onError: (error: any) => {
        toast.error(error?.resultMessage);
      },
      onSuccess: (data) => {
        toast.success(data?.resultMessage);

        refetch?.();
      },
    }
  );

  const onDelete = useCallback(async () => {
    const { actionName, id } = defaultValue.current || {};

    if (confirm("Xác nhận xóa nhóm: " + actionName)) {
      await mutateDelete.mutateAsync(id);
    }
  }, [defaultValue.current]);

  const columns: TGridColDef[] = [
    {
      field: "created",
      headerName: "Ngày tạo",
      flex: 1,
      renderCell: ({ row }) => moment(row?.created).format("DD/MM/YYYY"),
    },
    {
      field: "actionName",
      headerName: "Tên",
      flex: 2,
    },
    {
      field: "action",
      headerName: "Thao tác",
      minWidth: 100,
      flex: 0,
      align: "center",
      renderCell: ({ row }) => (
        <DropdownButton
          id={row?.id as string}
          items={[
            {
              action: () => onOpen("View"),
              label: "Thông tin chi tiết",
            },
            {
              action: onDelete,
              label: "Xóa",
            },
          ]}
        />
      ),
    },
  ];

  const onMouseEnterRow = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id;

    const currentRow = customerCareGroups.find((item: any) => item.id === id);

    defaultValue.current = currentRow;
  };

  return (
    <Paper className="bgContainer">
      <Box className="flex items-center gap-3 flex-wrap mb-3">
        <AddButton
          variant="contained"
          onClick={() => onOpen("Add")}
        >
          Tạo nhóm CSKH
        </AddButton>
        <SearchBox label="Tìm kiếm ..." />
      </Box>

      <ContextMenuWrapper
        menuId="customer_competitor_table_menu"
        menuComponent={
          <Menu className="p-0" id="customer_competitor_table_menu">
            <Item id="view-competitor" onClick={() => onOpen("View")}>
              Cập nhật
            </Item>
            <Item id="delete-competitor" onClick={onDelete}>
              Xóa
            </Item>
          </Menu>
        }
      >
        <DataTable
          rows={customerCareGroups as []}
          columns={columns}
          gridProps={{
            loading: isLoading || isFetching,
          }}
          componentsProps={{
            row: {
              onMouseEnter: onMouseEnterRow,
            },
          }}
          hideSearchbar
          hideFooter
        />
      </ContextMenuWrapper>

      <CustomerCareGroupDialog
        onClose={onClose}
        open={dialog.open}
        type={dialog.type}
        refetch={refetch}
        defaultValue={defaultValue.current as any}
      />
    </Paper>
  );
};
