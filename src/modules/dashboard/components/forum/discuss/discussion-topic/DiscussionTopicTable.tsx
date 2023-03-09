import {
  Avatar,
  ButtonBase,
  Drawer,
  List,
  ListItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { discussion } from "src/api";
import {
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
  StatusChip,
} from "~modules-core/components";
import { statusTaskTable } from "~modules-core/constance";
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

export const DiscussionTopicTable: React.FC<TProps> = ({
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
      field: "topicName",
      headerName: "Đề tài",
      align: "left",
      minWidth: 150,
      flex: 1,
      filterKey: "topicName",
    },
    {
      field: "levelName",
      headerName: "Mức độ",
      align: "left",
      minWidth: 50,
      flex: 1,
      filterKey: "level",
    },
    {
      field: "descriptionJob",
      headerName: "Mô tả thảo luận",
      align: "left",
      minWidth: 250,
      flex: 1,
      filterKey: "descriptionJob",
      renderCell: ({ row }) => {
        return (
          <>
            <Tooltip title="Xem phản hồi">
              <ButtonBase onClick={() => setReply(true)}>
                <Typography className="text-main text-sm text-left">
                  {row?.descriptionJob}
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
      align: "left",
      minWidth: 160,
      flex: 1,
      type: "date",
      filterKey: "fromdate",
      renderCell: ({ row }) => _format.converseDateTime(row?.startTime),
    },

    {
      field: "proposerName",
      headerName: "Người đề xuất",
      align: "left",
      minWidth: 100,
      flex: 1,
      filterKey: "proposerName",
    },
    {
      field: "participants",
      headerName: "Người tham gia",
      align: "left",
      minWidth: 150,
      flex: 1,
      filterKey: "participantsName",
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
      align: "left",
      minWidth: 100,
      flex: 1,
      type: "select",
      options: statusTaskTable as any,
      filterKey: "status",
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
