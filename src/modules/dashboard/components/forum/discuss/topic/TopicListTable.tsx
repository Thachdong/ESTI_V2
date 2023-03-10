import { Box, Paper } from "@mui/material";
import React, { useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { taskGroup, TJobGroup, topic } from "src/api";
import {
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
} from "~modules-core/components";
import { _format } from "~modules-core/utility/fomat";
import { TaskGroupDialog } from "~modules-dashboard/components";
import { TGridColDef } from "~types/data-grid";
import { TopicDialog } from "./TopicDialog";

type TProps = {
  data?: any;
  paginationProps?: any;
  isLoading?: boolean;
  isFetching?: boolean;
  refetch: () => void;
};

export const TopicListTable: React.FC<TProps> = ({
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
      minWidth: 50,
      isSort: false,
      flex: 1,
      renderCell: ({ row }) => _format.converseDate(row?.created),
    },
    {
      field: "topicName",
      headerName: "Đề tài",
      minWidth: 50,
      isSort: false,
      flex: 1,
    },
    {
      field: "totalItem",
      headerName: "Tổng đề tài",
      minWidth: 50,
      isSort: false,
      flex: 1,
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

  // HANDLE UPDATE GROUP TASK IN DIALOG
  const [Open, setOpen] = useState(false);

  const handleOpenUpdate = () => {
    setOpen(true);
  };

  const handleCloseUpdate = () => {
    setOpen(false);
  };

  // HANDLE DELETE GROUP TASK IN DIALOG
  const mutateDelete = useMutation(
    (payload: { id: string }) => topic.delete(payload?.id),
    {
      onSuccess: (data) => {
        toast.success(data.resultMessage);

        refetch?.();
      },
    }
  );

  const handleDeleteTaskGroup = () => {
    if (confirm("Xác nhận xoá nhóm đề tài!")) {
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
          hideSearchbar
        />
      </ContextMenuWrapper>

      <TopicDialog
        onClose={handleCloseUpdate}
        open={Open}
        defaultValue={defaultValue?.current}
        refetch={refetch}
        type="Update"
      />
    </>
  );
};
