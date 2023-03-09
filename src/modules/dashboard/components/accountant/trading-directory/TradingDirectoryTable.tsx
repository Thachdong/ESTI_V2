import React, { useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useMutation } from "react-query";
import { categoryTransaction } from "src/api";
import {
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
} from "~modules-core/components";
import { toast } from "~modules-core/toast";
import { _format } from "~modules-core/utility/fomat";
import {
  LeaveApplycationDialog,
  TradingDirectoryDialog,
} from "~modules-dashboard/components";
import { TGridColDef } from "~types/data-grid";

type TProps = {
  data?: any;
  paginationProps?: any;
  isLoading?: boolean;
  isFetching?: boolean;
  refetch: () => void;
};

export const TradingDirectoryTable: React.FC<TProps> = ({
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
      field: "categoryName",
      headerName: "Tên danh mục",
      align: "left",
      minWidth: 150,
      flex: 1,
      isFilter: false,
    },
    {
      field: "typeName",
      headerName: "Loại",
      align: "left",
      minWidth: 50,
      flex: 1,
      isFilter: false,
    },
    {
      field: "updated",
      headerName: "Ngày cập nhật",
      align: "left",
      minWidth: 50,
      flex: 1,
      isFilter: false,
      renderCell: ({ row }) => _format.converseDate(row?.updated),
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

  //   // HANDLE UPDATE GROUP TASK IN DIALOG
  const [Open, setOpen] = useState(false);

  const handleOpenUpdate = () => {
    setOpen(true);
  };

  const handleCloseUpdate = () => {
    setOpen(false);
  };

  //   // HANDLE DELETE GROUP TASK IN DIALOG
  const mutateDelete = useMutation(
    (payload: { id: string }) => categoryTransaction.delete(payload?.id),
    {
      onSuccess: (data) => {
        toast.success(data.resultMessage);

        refetch?.();
      },
    }
  );

  const handleDelete = () => {
    if (confirm("Xác nhận xoá task!")) {
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

      <LeaveApplycationDialog
        onClose={handleCloseUpdate}
        open={Open}
        type="Update"
        refetch={refetch}
        defaultValue={defaultValue?.current}
      />

      <TradingDirectoryDialog
        onClose={handleCloseUpdate}
        open={Open}
        type="Update"
        refetch={refetch}
        defaultValue={defaultValue?.current}
      />
    </>
  );
};
