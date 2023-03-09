import React, { useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import {
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
} from "~modules-core/components";
import { _format } from "~modules-core/utility/fomat";
import { TGridColDef } from "~types/data-grid";

type TProps = {
  data?: any;
  paginationProps?: any;
  isLoading?: boolean;
  isFetching?: boolean;
  refetch: () => void;
};

export const TransactionListTable: React.FC<TProps> = ({
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
      type: "date",
      filterKey: "createdDate",
      renderCell: ({ row }) => _format.converseDate(row?.created),
    },
    {
      field: "account",
      headerName: "Mã đối tác",
      align: "left",
      minWidth: 150,
      flex: 1,
      filterKey: "applicantCode",
    },
    {
      field: "branchCode",
      headerName: "Tên đối tác",
      align: "left",
      minWidth: 50,
      flex: 1,
      filterKey: "branchCode",
    },
    {
      field: "goal",
      headerName: "Diễn giải",
      align: "left",
      minWidth: 150,
      flex: 1,
      filterKey: "goal",
      renderCell: ({ row }) => _format.getVND(row?.goal),
    },
    {
      field: "percent",
      headerName: "Danh mục",
      align: "left",
      minWidth: 100,
      flex: 1,
      filterKey: "percent",
      renderCell: ({ row }) => row?.percent + " %",
    },
    {
      field: "balance",
      headerName: "Số hoá đơn",
      align: "left",
      minWidth: 100,
      flex: 1,
      filterKey: "balance",
      renderCell: ({ row }) => _format.getVND(row?.balance),
    },
    {
      field: "inDebt",
      headerName: "Nợ",
      align: "left",
      minWidth: 100,
      flex: 1,
      filterKey: "balance",
      renderCell: ({ row }) => _format.getVND(row?.balance),
    },
    {
      field: "accountBalance",
      headerName: "Số dư tài khoản",
      align: "left",
      minWidth: 100,
      flex: 1,
      filterKey: "accountBalance",
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
              action: () => handleDeleteTaskGroup(),
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

  //   // HANDLE UPDATE GROUP TASK IN DIALOG
  const [Open, setOpen] = useState(false);

  const handleOpenUpdate = () => {
    setOpen(true);
  };

  const handleCloseUpdate = () => {
    setOpen(false);
  };

  //   // HANDLE DELETE TRANSACTION IN DIALOG
  //   const mutateDelete = useMutation(
  //     (payload: { id: string }) => leaveApplication.delete(payload?.id),
  //     {
  //       onSuccess: (data) => {
  //         toast.success(data.resultMessage);

  //         refetch?.();
  //       },
  //     }
  //   );

  const handleDeleteTaskGroup = () => {
    // if (confirm("Xác nhận xoá giao dịch!")) {
    //   mutateDelete.mutateAsync(defaultValue?.current);
    // }
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
            <Item id="delete-product" onClick={handleDeleteTaskGroup}>
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
    </>
  );
};
