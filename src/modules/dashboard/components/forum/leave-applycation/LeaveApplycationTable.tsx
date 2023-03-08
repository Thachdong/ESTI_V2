import { ButtonBase, Tooltip, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { leaveApplication } from "src/api";
import {
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
  StatusChip,
} from "~modules-core/components";
import { _format } from "~modules-core/utility/fomat";
import { LeaveApplycationDialog } from "~modules-dashboard/components";
import { TGridColDef } from "~types/data-grid";

type TProps = {
  data?: any;
  paginationProps?: any;
  isLoading?: boolean;
  isFetching?: boolean;
  refetch: () => void;
};

export const LeaveApplycationTable: React.FC<TProps> = ({
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
      field: "applicantCode",
      headerName: "Mã Nhân viên",
      align: "left",
      minWidth: 150,
      flex: 1,
      filterKey: "applicantCode",
    },
    {
      field: "applicantName",
      headerName: "Người nộp đơn",
      align: "left",
      minWidth: 50,
      flex: 1,
      filterKey: "applicantName",
    },
    {
      field: "startTime",
      headerName: "Thời gian nghỉ phép",
      align: "left",
      minWidth: 150,
      flex: 1,
      filterKey: "startTime",
      renderCell: ({ row }) => _format.converseDate(row?.startTime),
    },
    {
      field: "numberOfDay",
      headerName: "Số ngày",
      align: "left",
      minWidth: 100,
      flex: 1,
      filterKey: "numberOfDay",
    },
    {
      field: "season",
      headerName: "Lý do",
      align: "left",
      minWidth: 150,
      filterKey: "season",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <>
            <Tooltip title="Xem phản hồi">
              <ButtonBase onClick={handleOpenUpdate}>
                <Typography className="text-main text-sm text-left">
                  {row?.season}
                </Typography>
              </ButtonBase>
            </Tooltip>
          </>
        );
      },
    },
    {
      field: "headOfDepartmentName",
      headerName: "Trưởng bộ phận",
      align: "left",
      minWidth: 100,
      flex: 1,
      filterKey: "headOfDepartmentName",
    },
    {
      field: "status",
      headerName: "Trạng thái",
      align: "left",
      minWidth: 100,
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
      field: "action",
      headerName: "",
      width: 50,
      renderCell: ({ row }) => (
        <DropdownButton
          id={row?.id as string}
          items={[
            {
              action: () => handleDeleteCancel(),
              label: "Huỷ đơn",
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

  //   HANDLE CANCEL
  const mutateCancel = useMutation(
    (payload: { leaveApplicationId: string; status: number }) =>
      leaveApplication.confirmLeaveApplication(payload),
    {
      onSuccess: (data) => {
        toast.success(data.resultMessage);
        refetch?.();
      },
    }
  );

  const handleDeleteCancel = () => {
    if (confirm("Xác nhận huỷ đơn xin nghỉ!")) {
      mutateCancel.mutateAsync({
        leaveApplicationId: defaultValue?.current?.id,
        status: 4,
      });
    }
  };

  // HANDLE DELETE GROUP TASK IN DIALOG
  const mutateDelete = useMutation(
    (payload: { id: string }) => leaveApplication.delete(payload?.id),
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
            <Item id="update-product" onClick={handleDeleteCancel}>
              Huỷ đơn
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

      <LeaveApplycationDialog
        onClose={handleCloseUpdate}
        open={Open}
        type="Update"
        refetch={refetch}
        defaultValue={defaultValue?.current}
      />
    </>
  );
};
