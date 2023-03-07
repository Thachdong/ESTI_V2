import {
  Box,
  ButtonBase,
  Chip,
  Drawer,
  Paper,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { taskGroup, taskList, TJobGroup } from "src/api";
import {
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
  StatusChip,
} from "~modules-core/components";
import { _format } from "~modules-core/utility/fomat";
import {
  TaskGroupDialog,
  TaskListDialog,
  TaskListMailReponse,
} from "~modules-dashboard/components";
import { TGridColDef } from "~types/data-grid";

type TProps = {
  data?: any;
  paginationProps?: any;
  isLoading?: boolean;
  isFetching?: boolean;
  refetch: () => void;
};

export const TaskListTable: React.FC<TProps> = ({
  data,
  paginationProps,
  isLoading,
  isFetching,
  refetch,
}) => {
  const defaultValue = useRef<any>();

  const [repply, setReply] = useState(false);

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
      field: "jobGroupName",
      headerName: "Nhóm task",
      align: "left",
      minWidth: 50,
      flex: 1,
      filterKey: "jobGroupName",
    },
    {
      field: "performDate",
      headerName: "Thời gian thực hiện",
      align: "left",
      minWidth: 50,
      flex: 1,
      filterKey: "performDate",
      renderCell: ({ row }) => _format.converseDate(row?.performDate),
    },
    {
      field: "descriptionsJob",
      headerName: "Mô tả task",
      align: "left",
      minWidth: 150,
      flex: 1,
      filterKey: "descriptionsJob",
      renderCell: ({ row }) => {
        return (
          <>
            <Tooltip title="Xem phản hồi">
              <ButtonBase onClick={() => setReply(true)}>
                <Typography className="text-main text-sm text-left">
                  {row?.descriptionsJob}
                </Typography>
              </ButtonBase>
            </Tooltip>
          </>
        );
      },
    },
    {
      field: "petitionerName",
      headerName: "Người yêu cầu",
      align: "left",
      minWidth: 50,
      flex: 1,
      filterKey: "petitionerName",
    },
    {
      field: "inChargeOfPersonName",
      headerName: "Người phụ trách",
      align: "left",
      minWidth: 50,
      filterKey: "inChargeOfPersonName",
      flex: 1,
    },
    {
      field: "co_Participant",
      headerName: "Người cùng tham gia",
      align: "left",
      minWidth: 50,
      flex: 1,
      filterKey: "co_ParticipantName",
      renderCell: ({ row }) => {
        // console.log(row?.co_Participant);
        return <></>;
      },
    },
    {
      field: "status",
      headerName: "Trạng thái",
      align: "left",
      minWidth: 50,
      flex: 1,
      renderCell: ({ row }) => {
        const colors = ["success", "default", "error"];
        return (
          <StatusChip
            status={row?.status}
            label={row?.statusName}
            color={colors[row?.status] as any}
          />
        );
      },
    },
    {
      field: "level",
      headerName: "Đánh giá",
      align: "left",
      minWidth: 50,
      flex: 1,
      filterKey: "level",
      renderCell: ({ row }) => (
        <Rating className="text-xl" value={row?.level} readOnly />
      ),
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
              label: "Cập nhật trạng thái",
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
    (payload: { id: string }) => taskList.delete(payload?.id),
    {
      onSuccess: (data) => {
        toast.success(data.resultMessage);

        refetch?.();
      },
    }
  );

  const handleDeleteTaskGroup = () => {
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
              Cập nhật trạng thái
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

      <TaskListDialog
        onClose={handleCloseUpdate}
        open={Open}
        refetch={refetch}
        type="Update"
        defaultValue={defaultValue.current}
      />

      <Drawer anchor={"right"} open={repply} onClose={() => setReply(false)}>
        <TaskListMailReponse data={defaultValue.current} />
      </Drawer>
    </>
  );
};
