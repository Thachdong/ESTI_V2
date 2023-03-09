import { ButtonBase, Tooltip, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { accountManagement, leaveApplication } from "src/api";
import {
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
  StatusChip,
} from "~modules-core/components";
import { _format } from "~modules-core/utility/fomat";
import {
  AccountDialog,
  LeaveApplycationDialog,
} from "~modules-dashboard/components";
import { TGridColDef } from "~types/data-grid";

type TProps = {
  data?: any;
  paginationProps?: any;
  isLoading?: boolean;
  isFetching?: boolean;
  refetch: () => void;
};

export const AccountListTable: React.FC<TProps> = ({
  data,
  paginationProps,
  isLoading,
  isFetching,
  refetch,
}) => {
  const defaultValue = useRef<any>();

  const columns: TGridColDef[] = [
    {
      field: "created",
      headerName: "Ngày tạo",
      align: "left",
      minWidth: 50,
      flex: 1,
      isFilter: false,
      renderCell: ({ row }) => _format.converseDate(row?.created),
    },
    {
      field: "account",
      headerName: "Tài khoản",
      align: "left",
      minWidth: 150,
      flex: 1,
      isFilter: false,
    },
    {
      field: "branchCode",
      headerName: "Chi nhánh",
      align: "left",
      minWidth: 50,
      flex: 1,
      isFilter: false,
    },
    {
      field: "goal",
      headerName: "Mục tiêu",
      align: "left",
      minWidth: 150,
      flex: 1,
      isFilter: false,
      renderCell: ({ row }) => _format.getVND(row?.goal),
    },
    {
      field: "percent",
      headerName: "Phần trăm",
      align: "left",
      minWidth: 100,
      flex: 1,
      isFilter: false,
      renderCell: ({ row }) => row?.percent + " %",
    },
    {
      field: "balance",
      headerName: "Tiền còn lại",
      align: "left",
      minWidth: 100,
      flex: 1,
      isFilter: false,
      renderCell: ({ row }) => _format.getVND(row?.balance),
    },
    {
      field: "action",
      headerName: "",
      width: 50,
      renderCell: ({ row }) => (
        <DropdownButton
          id={row?.id as string}
          items={[
            {
              action: () => handleOpenUpdate(),
              label: "Cập nhật",
            },

            {
              action: () => handleDelete(),
              label: "Xoá",
            },
          ]}
        />
      ),
    },
  ];

  // HANDLE GET VALUE ROW
  const onMouseEnterRow = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id;

    const currentRow = data?.find((item: any) => item.id === id);

    defaultValue.current = currentRow;
  };

  //   // HANDLE UPDATE GROUP ACCOUNT IN DIALOG
  const [Open, setOpen] = useState(false);

  const handleOpenUpdate = () => {
    setOpen(true);
  };

  const handleCloseUpdate = () => {
    setOpen(false);
  };

  //   // HANDLE DELETE GROUP TASK IN DIALOG
  const mutateDelete = useMutation(
    (payload: { id: string }) => accountManagement.delete(payload?.id),
    {
      onSuccess: (data) => {
        toast.success(data.resultMessage);

        refetch?.();
      },
    }
  );

  const handleDelete = () => {
    const {account} = defaultValue.current || {};

    if (confirm("Xác nhận xoá: " + account)) {
      mutateDelete.mutateAsync(defaultValue?.current);
    }
  };

  return (
    <>
      <ContextMenuWrapper
        menuId="taskGroup_table_menu"
        menuComponent={
          <Menu className="p-0" id="taskGroup_table_menu">
            <Item id="update-product" onClick={handleOpenUpdate}>
              Cập nhật
            </Item>
            <Item id="delete-product" onClick={handleDelete}>
              Xóa
            </Item>
          </Menu>
        }
      >
        <DataTable
          rows={data as any}
          columns={columns}
          gridProps={{
            loading: isLoading || isFetching,
            ...paginationProps,
          }}
          componentsProps={{
            row: {
              onMouseEnter: onMouseEnterRow,
            },
          }}
        />
      </ContextMenuWrapper>

      <AccountDialog
        onClose={handleCloseUpdate}
        open={Open}
        type="Update"
        refetch={refetch}
        defaultValue={defaultValue?.current}
      />
    </>
  );
};
