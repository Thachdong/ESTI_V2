import { Box, ButtonBase, Drawer, Tooltip, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useMutation } from "react-query";
import {
  meetingDeploy,
  registerMission,
  taskGroup,
  taskList,
  TJobGroup,
} from "src/api";
import {
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
  StatusChip,
} from "~modules-core/components";
import { ConfirmRegisterMission } from "~modules-core/constance";
import { useSession } from "~modules-core/customHooks/useSession";
import { toast } from "~modules-core/toast";
import { _format } from "~modules-core/utility/fomat";
import {
  MeetingDeployDialog,
  MeetingDeployMailReponse,
  RegisterMissionDialog,
  RegisterMissionMailReponse,
} from "~modules-dashboard/components";
import { TGridColDef } from "~types/data-grid";

type TProps = {
  data?: any;
  paginationProps?: any;
  isLoading?: boolean;
  isFetching?: boolean;
  refetch: () => void;
};

export const RegisterMissionTable: React.FC<TProps> = ({
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
      minWidth: 120,
      flex: 1,
      type: "date",
      filterKey: "createdDate",
      sortAscValue: 10,
      sortDescValue: 0,
      renderCell: ({ row }) => _format.converseDate(row?.created),
    },
    {
      field: "applicantCode",
      headerName: "Mã nhân viên",
      minWidth: 150,
      flex: 1,
      filterKey: "applicantCode",
      sortAscValue: 9,
      sortDescValue: 1,
    },
    {
      field: "applicantName",
      headerName: "Người nộp đơn",
      minWidth: 150,
      flex: 1,
      filterKey: "applicantName",
      sortAscValue: 11,
      sortDescValue: 2,
    },
    {
      field: "startTime",
      headerName: "Thời gian công tác",
      minWidth: 190,
      flex: 1,
      filterKey: "startTime",
      sortAscValue: 16,
      sortDescValue: 7,
      renderCell: ({ row }) => _format.converseDate(row?.startTime),
    },
    {
      field: "endTime",
      headerName: "Thời gian kết thúc",
      minWidth: 190,
      flex: 1,
      filterKey: "endTime",
      sortAscValue: 17,
      sortDescValue: 8,
      renderCell: ({ row }) => _format.converseDate(row?.endTime),
    },
    {
      field: "numberOfDay",
      headerName: "Số ngày",
      minWidth: 100,
      flex: 1,
      filterKey: "numberOfDay",
      sortAscValue: 13,
      sortDescValue: 4,
    },
    {
      field: "seasonMission",
      headerName: "Lý do công tác",
      minWidth: 300,
      filterKey: "seasonMission",
      flex: 1,
      sortAscValue: 14,
      sortDescValue: 5,
      renderCell: ({ row }) => {
        return (
          <>
            <Tooltip title="Xem phản hồi">
              <ButtonBase onClick={() => setReply(true)}>
                <Typography className="text-main text-sm text-left">
                  {`${row?.seasonMission} (${row?.reponseNumber} phản hồi)`}
                </Typography>
              </ButtonBase>
            </Tooltip>
          </>
        );
      },
    },
    {
      field: "headOfDepartmentName",
      headerName: "Trưởng bộ phân",
      minWidth: 150,
      flex: 1,
      filterKey: "headOfDepartmentName",
      sortAscValue: 15,
      sortDescValue: 6,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 150,
      flex: 1,
      sortAscValue: 10,
      sortDescValue: 0,
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

  // HANDLE UPDATE REGISTER MISSION IN DIALOG
  const [Open, setOpen] = useState(false);

  const handleOpenUpdate = () => {
    setOpen(true);
  };

  const handleCloseUpdate = () => {
    setOpen(false);
  };

  // HANDLE DELETE REGISTER MISSION IN DIALOG
  const mutateDelete = useMutation(
    (payload: { id: string }) => registerMission.delete(payload?.id),
    {
      onSuccess: (data) => {
        toast.success(data.resultMessage);

        refetch?.();
      },
    }
  );

  const handleDeleteTaskGroup = () => {
    if (confirm("Xác nhận xoá đăng ký công tác!")) {
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
      <RegisterMissionDialog
        onClose={handleCloseUpdate}
        open={Open}
        refetch={refetch}
        type="Update"
        defaultValue={defaultValue.current}
      />

      <Drawer anchor={"right"} open={repply} onClose={() => setReply(false)}>
        <RegisterMissionMailReponse data={defaultValue.current} />
      </Drawer>
    </>
  );
};
