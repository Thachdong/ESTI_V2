import {
  Avatar,
  ButtonBase,
  Drawer,
  List,
  ListItem,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useMutation } from "react-query";
import { taskList } from "src/api";
import {
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
  StatusChip,
} from "~modules-core/components";
import { toast } from "~modules-core/toast";
import { _format } from "~modules-core/utility/fomat";
import {
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

// Nghiệp vụ:
// Nếu có taskListId: đc trả về từ trong link mà user nhận đc từ mail hệ thống => mở tab bình luận
// Đồng thời thêm nút "tải lại" => cho phép xem toàn bộ danh sách

export const TaskListTable: React.FC<TProps> = ({
  data,
  paginationProps,
  isLoading,
  isFetching,
  refetch,
}) => {
  const { taskListId } = useRouter().query;

  const defaultValue = useRef<any>();

  const [repply, setReply] = useState(false);

  const columns: TGridColDef[] = [
    {
      field: "created",
      headerName: "Ngày tạo",
      minWidth: 100,
      flex: 1,
      type: "date",
      filterKey: "createdDate",
      sortDescValue: 0,
      sortAscValue: 10,
      renderCell: ({ row }) => _format.converseDate(row?.created),
    },
    {
      field: "jobGroupName",
      headerName: "Nhóm task",
      minWidth: 200,
      flex: 1,
      filterKey: "jobGroupName",
      sortDescValue: 1,
      sortAscValue: 9,
    },
    {
      field: "performDate",
      headerName: "Thời gian thực hiện",
      minWidth: 200,
      flex: 1,
      filterKey: "performDate",
      type: "date",
      sortDescValue: 18,
      sortAscValue: 19,
      renderCell: ({ row }) => _format.converseDate(row?.performDate),
    },
    {
      field: "completeDate",
      headerName: "Ngày hoàn thành",
      minWidth: 200,
      flex: 1,
      filterKey: "completeDate",
      type: "date",
      sortDescValue: 8,
      sortAscValue: 17,
      renderCell: ({ row }) => _format.converseDate(row?.completeDate),
    },
    {
      field: "descriptionsJob",
      headerName: "Mô tả task",
      minWidth: 250,
      flex: 1,
      filterKey: "descriptionsJob",
      sortDescValue: 3,
      sortAscValue: 12,
      renderCell: ({ row }) => {
        return (
          <>
            <Tooltip title="Xem phản hồi">
              <ButtonBase onClick={() => setReply(true)}>
                <Typography className="text-main text-sm text-left">
                  {`${row?.descriptionsJob} (${row?.reponseNumber} phản hồi)`}
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
      minWidth: 150,
      flex: 1,
      filterKey: "petitionerName",
      sortDescValue: 5,
      sortAscValue: 14,
    },
    {
      field: "inChargeOfPersonName",
      headerName: "Người phụ trách",
      minWidth: 200,
      filterKey: "inChargeOfPersonName",
      flex: 1,
      sortDescValue: 6,
      sortAscValue: 15,
    },
    {
      field: "co_Participant",
      headerName: "Người cùng tham gia",
      minWidth: 200,
      flex: 1,
      filterKey: "co_ParticipantName",
      sortDescValue: 7,
      sortAscValue: 16,
      renderCell: ({ row }) => {
        const { co_Participant } = row || {};

        let newParticipants: any[] = [];

        if (!!co_Participant && typeof co_Participant === "string") {
          try {
            newParticipants = JSON.parse(co_Participant);
          } catch (err) {
            console.log(err);
          }
        }

        return (
          <>
            <List className="p-0 grid grid-cols-5 gap-2">
              {newParticipants?.map((item: any) => (
                <ListItem className="p-0">
                  <Tooltip title={item?.co_PaticipantName}>
                    <Avatar className="w-[24px] h-[24px]" />
                  </Tooltip>
                </ListItem>
              ))}
            </List>
          </>
        );
      },
    },
    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 150,
      flex: 1,
      filterKey: "status",
      type: "select",
      sortDescValue: 4,
      sortAscValue: 13,
      options: [
        { label: "Chưa thực hiện", value: 1 },
        { label: "Đang thực hiện", value: 2 },
        { label: "Hoàn thành", value: 3 },
        { label: "Chưa hoàn thành", value: 4 },
        { label: "Hủy", value: 5 },
      ],
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
      headerName: "Mức độ",
      minWidth: 120,
      flex: 1,
      filterKey: "level",
      sortDescValue: 2,
      sortAscValue: 11,
      renderCell: ({ row }) => (
        <Rating className="text-sm" value={row?.level} readOnly />
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

  // SIDE EFFECTS
  useEffect(() => {
    if (!!taskListId) {
      const currentRow = data?.find((item: any) => item.id === taskListId);

      defaultValue.current = currentRow;

      setReply(true);
    }
  }, [taskListId, data]);

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
