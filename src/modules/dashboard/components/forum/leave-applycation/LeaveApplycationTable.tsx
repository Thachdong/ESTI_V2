import { ButtonBase, Tooltip, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
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
import { ConfirmRegisterMission } from "~modules-core/constance";
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

// Nghiệp vụ:
// Nếu có leaveApplicationId: đc trả về từ trong link mà user nhận đc từ mail hệ thống
// Đồng thời thêm nút "tải lại" => cho phép xem toàn bộ danh sách

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
      minWidth: 100,
      type: "date",
      filterKey: "createdDate",
      sortAscValue: 10,
      sortDescValue: 0,
      renderCell: ({ row }) => _format.converseDate(row?.created),
    },
    {
      field: "applicantCode",
      headerName: "Mã Nhân viên",
      minWidth: 150,
      filterKey: "applicantCode",
      sortAscValue: 9,
      sortDescValue: 1,
    },
    {
      field: "applicantName",
      headerName: "Người nộp đơn",
      minWidth: 150,
      filterKey: "applicantName",
      sortAscValue: 11,
      sortDescValue: 2,
    },
    {
      field: "startTime",
      headerName: "Thời gian nghỉ phép",
      minWidth: 150,
      filterKey: "startTime",
      sortAscValue: 16,
      sortDescValue: 7,
      type: "date",
      renderCell: ({ row }) => _format.converseDate(row?.startTime),
    },
    {
      field: "numberOfDay",
      headerName: "Số ngày",
      minWidth: 100,
      filterKey: "numberOfDay",
      sortAscValue: 13,
      sortDescValue: 4,
    },
    {
      field: "season",
      headerName: "Lý do",
      minWidth: 150,
      filterKey: "season",
      sortAscValue: 14,
      sortDescValue: 5,
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
      minWidth: 150,
      filterKey: "headOfDepartmentName",
      sortAscValue: 15,
      sortDescValue: 6,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 130,
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
      filterKey: "status",
      type: "select",
      options: ConfirmRegisterMission,
      sortAscValue: 12,
      sortDescValue: 3,
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
    if (confirm("Xác nhận xoá đơn nghỉ phép!")) {
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
