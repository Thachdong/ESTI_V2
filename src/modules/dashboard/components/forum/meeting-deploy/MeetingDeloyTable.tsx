import {
  Avatar,
  Box,
  ButtonBase,
  Drawer,
  List,
  ListItem,
  Tooltip,
  Typography,
} from "@mui/material";
import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useMutation } from "react-query";
import { meetingDeploy } from "src/api";
import {
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
  StatusChip,
} from "~modules-core/components";
import { useSession } from "~modules-core/customHooks/useSession";
import { toast } from "~modules-core/toast";
import { _format } from "~modules-core/utility/fomat";
import {
  MeetingDeployDialog,
  MeetingDeployMailReponse,
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
// Nếu có meetingDeployId: đc trả về từ trong link mà user nhận đc từ mail hệ thống => mở tab bình luận
// Đồng thời thêm nút "tải lại" => cho phép xem toàn bộ danh sách

export const MeetingDeloyTable: React.FC<TProps> = ({
  data,
  paginationProps,
  isLoading,
  isFetching,
  refetch,
}) => {
  const { meetingDeployId } = useRouter().query;

  const defaultValue = useRef<any>();

  const [repply, setReply] = useState(false);

  const { userInfo } = useSession()?.userInfo || {};

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
      field: "departmentName",
      headerName: "Phòng ban",
      minWidth: 150,
      filterKey: "departmentName",
      sortAscValue: 9,
      sortDescValue: 1,
    },
    {
      field: "startTime",
      headerName: "Ngày tiến hành",
      minWidth: 150,
      filterKey: "startTime",
      sortAscValue: 16,
      sortDescValue: 7,
      type: "date",
      renderCell: ({ row }) => _format.converseDate(row?.startTime),
    },
    {
      field: "endTime",
      headerName: "Thời gian kết thúc",
      minWidth: 175,
      filterKey: "endTime",
      sortAscValue: 17,
      sortDescValue: 8,
      type: "date",
      renderCell: ({ row }) => _format.converseDate(row?.endTime),
    },
    {
      field: "descriptionJob",
      headerName: "Mô tả công việc",
      minWidth: 250,
      filterKey: "descriptionJob",
      sortAscValue: 11,
      sortDescValue: 2,
      renderCell: ({ row }) => {
        return (
          <>
            <Tooltip title="Xem phản hồi">
              <ButtonBase onClick={() => setReply(true)}>
                <Typography className="text-main text-sm text-left">
                  {`${row?.descriptionJob} (${row?.reponseNumber} phản hồi)`}
                </Typography>
              </ButtonBase>
            </Tooltip>
          </>
        );
      },
    },
    {
      field: "proposerName",
      headerName: "Người đề xuất",
      minWidth: 150,
      filterKey: "proposerName",
      sortAscValue: 13,
      sortDescValue: 4,
    },
    {
      field: "secretaryName",
      headerName: "Thư ký",
      minWidth: 150,
      filterKey: "secretaryName",
      sortAscValue: 14,
      sortDescValue: 5,
    },
    {
      field: "participant",
      headerName: "Nguời tham gia",
      minWidth: 200,
      filterKey: "participantsName",
      sortAscValue: 15,
      sortDescValue: 6,
      renderCell: ({ row }) => {
        let listParticipant: any[] = [];

        try {
          listParticipant = JSON.parse(row?.participant || "[]");
        } catch (error) {
          console.log(error);
        }

        return (
          <List className="p-0 grid grid-cols-5 gap-2">
            {listParticipant?.map((item: any) => (
              <ListItem className="p-0">
                <Tooltip title={item?.paticipantName}>
                  <Avatar
                    className={clsx(
                      "w-[24px] h-[24px]",
                      item?.isParticipate && "bg-main"
                    )}
                  />
                </Tooltip>
              </ListItem>
            ))}
          </List>
        );
      },
    },
    {
      field: "confirmParticipation",
      headerName: "Tổng nguời tham gia",
      minWidth: 250,
      isFilter: false,
      isSort: false,
      renderCell: ({ row }) => {
        let listParticipant: any[] = [];

        try {
          listParticipant = JSON.parse(row?.confirmParticipation || "[]");
        } catch (error) {
          console.log(error);
        }

        const joinParticipants = listParticipant.filter(
          (p: any) => p?.isParticipate
        ).length;

        const totalParticipants = listParticipant.length;

        return (
          <Box>
            <List className="p-0 grid grid-cols-5 gap-2">
              {listParticipant?.map((item: any) => (
                <ListItem className="p-0">
                  <Tooltip title={item?.paticipantName}>
                    <Avatar
                      className={clsx(
                        "w-[24px] h-[24px]",
                        item?.isParticipate && "bg-main"
                      )}
                    />
                  </Tooltip>
                </ListItem>
              ))}
            </List>
            <Typography className="text-xs italic">
              (SL tham gia: {`${joinParticipants} / ${totalParticipants}`})
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 150,
      renderCell: ({ row }) => {
        const colors = ["default", "secondary", "success", "error"];
        return (
          <StatusChip
            status={row?.status}
            label={row?.statusName}
            color={colors[row?.status - 1] as any}
          />
        );
      },
      filterKey: "status",
      type: "select",
      sortAscValue: 12,
      sortDescValue: 3,
      options: [
        { value: 1, label: "Chưa thực hiện" },
        { value: 2, label: "Đang thực hiện" },
        { value: 3, label: "Hoàn thành" },
        { value: 4, label: "Hủy" },
      ],
    },
    {
      field: "accept",
      headerName: "Tham gia",
      minWidth: 100,
      isFilter: false,
      isSort: false,
      renderCell: ({ row }) => {
        let listParticipant: any[] = [];

        try {
          listParticipant = JSON.parse(row?.confirmParticipation || "[]");
        } catch (error: any) {
          console.log(error);
        }

        const loginParticipant = listParticipant.find(
          (item: any) => item?.id == userInfo?.userId
        );

        return (
          <>
            {!loginParticipant?.isParticipate ? (
              <ButtonBase
                onClick={() => handleAcceptMeeting(row?.id)}
                className="bg-success text-white px-2 py-1 rounded font-semibold"
              >
                Tham gia
              </ButtonBase>
            ) : (
              <ButtonBase
                onClick={() => handleAcceptMeeting(row?.id)}
                className="bg-warning text-white text-xs px-2 py-1 rounded font-semibold"
              >
                Rời khỏi
              </ButtonBase>
            )}
          </>
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

  // SIDE EFFECTS
  useEffect(() => {
    if (!!meetingDeployId) {
      const currentRow = data?.find((item: any) => item.id === meetingDeployId);

      defaultValue.current = currentRow;

      setReply(true);
    }
  }, [meetingDeployId, data]);

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
    (payload: { id: string }) => meetingDeploy.delete(payload?.id),
    {
      onSuccess: (data) => {
        toast.success(data.resultMessage);

        refetch?.();
      },
    }
  );

  const handleDeleteTaskGroup = () => {
    if (confirm("Xác nhận xoá!")) {
      mutateDelete.mutateAsync(defaultValue?.current);
    }
  };

  //   HANDLE ACCEPT MEETING
  const mutateAccept = useMutation(
    (payload: { meetingDeployId: string }) =>
      meetingDeploy.acceptMetting(payload),
    {
      onSuccess: (data) => {
        toast.success(data.resultMessage);

        refetch?.();
      },
    }
  );

  const handleAcceptMeeting = useCallback(async (id: string) => {
    await mutateAccept.mutateAsync({ meetingDeployId: id });
  }, []);

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
      <MeetingDeployDialog
        onClose={handleCloseUpdate}
        open={Open}
        refetch={refetch}
        type="Update"
        defaultValue={defaultValue.current}
      />
      <Drawer anchor={"right"} open={repply} onClose={() => setReply(false)}>
        <MeetingDeployMailReponse data={defaultValue.current} />
      </Drawer>
    </>
  );
};
