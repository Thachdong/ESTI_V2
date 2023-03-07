import { Box, Paper } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useMutation, useQuery } from "react-query";
import { customerCare } from "src/api";
import {
  AddButton,
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
  FilterButton,
  generatePaginationProps,
  RefreshButton,
  SearchBox,
  StatisticButton,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { usePathBaseFilter } from "~modules-core/customHooks";
import { toast } from "~modules-core/toast";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";
import { CustomerCareDialog } from "./CustomerCareDialog";
import { customerCareColumns } from "./data";

type TProps = {
  onViewReport: () => void;
  viewReport: boolean;
};

export const CustomerCareTable: React.FC<TProps> = ({onViewReport, viewReport}) => {
  const [pagination, setPagination] = useState(defaultPagination);

  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });

  const router = useRouter();

  const { query } = router;

  const defaultValue = useRef<any>();

  usePathBaseFilter(pagination);

  const {
    data: customerCareList,
    refetch,
    isFetching,
    isLoading,
  } = useQuery(
    [
      "CustomerCareList",
      {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        ...query,
      },
    ],
    () =>
      customerCare
        .getList({
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          ...query,
        })
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        setPagination({ ...pagination, total: data.totalItem });
      },
    }
  );

  // METHODS
  const onClose = useCallback(() => {
    setDialog({ open: false });
  }, []);

  const onOpen = useCallback((type: string) => {
    setDialog({ open: true, type });
  }, []);

  // DATA TABLE
  const columns: TGridColDef[] = [
    ...customerCareColumns,
    {
      field: "action",
      headerName: "",
      width: 50,
      renderCell: ({ row }) => (
        <DropdownButton
          id={row?.id as string}
          items={[
            {
              action: () => onOpen("View"),
              label: "Nội dung chi tiết",
            },
            {
              action: () => handleDelete,
              label: "Xóa",
            },
          ]}
        />
      ),
    },
  ];

  const paginationProps = generatePaginationProps(pagination, setPagination);

  const onMouseEnterRow = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id;

    const currentRow = customerCareList?.items.find(
      (item: any) => item.id === id
    );

    defaultValue.current = currentRow;
  };

  const deleteMutate = useMutation((id: string) => customerCare.delete(id), {
    onSuccess: (data) => {
      toast.success(data.resultMessage);

      refetch?.();
    },
  });

  const handleDelete = useCallback(async () => {
    const { actionName, id } = defaultValue.current || {};

    if (confirm("Xác nhận xóa " + actionName)) {
      await deleteMutate.mutateAsync(id);
    }
  }, [defaultValue.current]);

  return (
    <Paper className="flex-grow !h-screen shadow bgContainer p-3">
      <Box className="flex gap-3 items-center justify-between mb-4">
        <AddButton onClick={() => onOpen("Add")}>Tạo phiên CSKH</AddButton>

        <Box className="flex gap-2">
          <StatisticButton onClick={onViewReport} View={viewReport} />
          <FilterButton listFilterKey={[]} />
          <RefreshButton onClick={() => refetch()} />
        </Box>
      </Box>

      <ContextMenuWrapper
        menuId="bill_table_menu"
        menuComponent={
          <Menu className="p-0" id="bill_table_menu">
            <Item id="view-customer-care" onClick={() => onOpen("View")}>
              Nội dung chi tiết
            </Item>
            <Item id="delete-customer-care" onClick={handleDelete}>
              Xóa
            </Item>
          </Menu>
        }
      >
        <DataTable
          rows={customerCareList?.items as []}
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

      <CustomerCareDialog
        onClose={onClose}
        open={dialog.open}
        type={dialog?.type}
        refetch={refetch}
        defaultValue={defaultValue.current as any}
      />
    </Paper>
  );
};
