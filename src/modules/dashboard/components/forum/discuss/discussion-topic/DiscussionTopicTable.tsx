import {
  Avatar,
  ButtonBase,
  Drawer,
  List,
  ListItem,
  Tooltip,
  Typography,
} from "@mui/material";
import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useMutation } from "react-query";
import { discussion } from "src/api";
import {
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
  StatusChip,
} from "~modules-core/components";
import { statusTaskTable } from "~modules-core/constance";
import { toast } from "~modules-core/toast";
import { _format } from "~modules-core/utility/fomat";
import { DiscussionMailReponse } from "~modules-dashboard/components";
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
// Đồng thời thêm nút "tải lại" => cho phép tải lại danh sách


export const DiscussionTopicTable: React.FC<TProps> = ({
  data,
  paginationProps,
  isLoading,
  isFetching,
  refetch,
}) => {
  const { discussionId } = useRouter().query;
  
  const defaultValue = useRef<any>();
  const [repply, setReply] = useState(false);
  const columns: TGridColDef[] = [
    {
      field: "created",
      headerName: "Ngày tạo",
      minWidth: 100,
      type: "date",
      filterKey: "createdDate",
      sortDescValue: 0,
      sortAscValue: 10,
      renderCell: ({ row }) => _format.converseDate(row?.created),
    },
    {
      field: "topicName",
      headerName: "Đề tài",
      minWidth: 150,
      filterKey: "topicName",
      sortDescValue: 1,
      sortAscValue: 9,
      flex: 1,
    },
    {
      field: "levelName",
      headerName: "Mức độ",
      minWidth: 100,
      filterKey: "level",
      sortDescValue: 2,
      sortAscValue: 11,
      type: "select",
      options: [
        { value: 1, label: "HOT" },
        { value: 2, label: "WARM" },
      ],
      flex: 1,
      renderCell: ({ row }) => (
        <span
          className={clsx(row?.level === 1 ? "text-warning" : "text-success")}
        >
          {row?.levelName}
        </span>
      ),
    },
    {
      field: "descriptionJob",
      headerName: "Mô tả thảo luận",
      minWidth: 250,
      filterKey: "descriptionJob",
      sortDescValue: 3,
      sortAscValue: 12,
      flex: 1,
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
      field: "startTime",
      headerName: "Thời gian bắt đầu",
      minWidth: 160,
      type: "date",
      filterKey: "startTime",
      sortDescValue: 7,
      sortAscValue: 16,
      renderCell: ({ row }) => _format.converseDateTime(row?.startTime),
    },
    {
      field: "endTime",
      headerName: "Thời gian kết thúc", // api yêu cầu chuyển từ "Thời gian trao đổi" => "Thời gian kết thúc"
      minWidth: 200,
      type: "date",
      filterKey: "endTime",
      sortDescValue: 7,
      sortAscValue: 16,
      renderCell: ({ row }) => _format.converseDateTime(row?.endTime),
    },
    {
      field: "proposerName",
      headerName: "Người đề xuất",
      minWidth: 150,
      filterKey: "proposerName",
      sortDescValue: 5,
      sortAscValue: 14,
    },
    {
      field: "participants",
      headerName: "Người tham gia",
      minWidth: 150,
      filterKey: "participantsName",
      sortDescValue: 6,
      sortAscValue: 15,
      flex: 1,
      renderCell: ({ row }) => {
        const newParticipants = JSON.parse(row?.participants || "[]");
        return (
          <>
            <List className="p-0 grid grid-cols-5 gap-2">
              {newParticipants?.map((item: any) => (
                <ListItem className="p-0">
                  <Tooltip title={item?.paticipantName}>
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
      minWidth: 130,
      type: "select",
      options: statusTaskTable as any,
      filterKey: "status",
      sortDescValue: 4,
      sortAscValue: 13,
      renderCell: ({ row }) => {
        return (
          <>
            <StatusChip status={row?.status} label={row?.statusName} />
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
              action: () => handleCancel(),
              label: "Huỷ thảo luận",
            },
            {
              action: () => handleDeleteItem(),
              label: "Xoá",
            },
          ]}
        />
      ),
    },
  ];

  // SIDE EFFECTS
  useEffect(() => {
    if (!!discussionId) {
      const currentRow = data?.find((item: any) => item.id === discussionId);

      defaultValue.current = currentRow;

      setReply(true);
    }
  }, [discussionId, data]);

  // HANDLE GET VALUE ROW
  const onMouseEnterRow = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id;

    const currentRow = data?.find((item: any) => item.id === id);

    defaultValue.current = currentRow;
  };

  // HANDLE CANCEL DISCUSSION IN DIALOG
  const mutateCancel = useMutation(
    (payload: { discussionId: string }) => discussion.cancelDiscussion(payload),
    {
      onSuccess: (data) => {
        toast.success(data.resultMessage);

        refetch?.();
      },
    }
  );

  const handleCancel = () => {
    if (confirm("Xác nhận huỷ buổi thảo luận!")) {
      mutateCancel.mutateAsync({ discussionId: defaultValue?.current?.id });
    }
  };

  // HANDLE DELETE GROUP TASK IN DIALOG
  const mutateDelete = useMutation(
    (payload: { id: string }) => discussion.delete(payload?.id),
    {
      onSuccess: (data) => {
        toast.success(data.resultMessage);

        refetch?.();
      },
    }
  );

  const handleDeleteItem = () => {
    if (confirm("Xác nhận xoá buổi thảo luận!")) {
      mutateDelete.mutateAsync({ id: defaultValue?.current?.id });
    }
  };

  return (
    <>
      <ContextMenuWrapper
        menuId="taskGroup_table_menu"
        menuComponent={
          <Menu className="p-0" id="taskGroup_table_menu">
            <Item id="delete-product" onClick={handleCancel}>
              Huỷ thảo luận
            </Item>
            <Item id="update-product" onClick={handleDeleteItem}>
              Xoá
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

      <Drawer anchor={"right"} open={repply} onClose={() => setReply(false)}>
        <DiscussionMailReponse data={defaultValue.current} />
      </Drawer>
    </>
  );
};
