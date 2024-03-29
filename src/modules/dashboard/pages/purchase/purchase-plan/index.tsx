import { Box, Paper } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useMutation, useQuery } from "react-query";
import { purchasePlan } from "src/api";
import {
  AddButton,
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
  ExportButton,
  FilterButton,
  generatePaginationProps,
  RefreshButton,
  SearchBox,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { usePathBaseFilter } from "~modules-core/customHooks";
import { toast } from "~modules-core/toast";
import { PurchasePlanDialog } from "~modules-dashboard/components";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";
import { purchasePlanColumns } from "./data";

export const PurchasePlanPage = () => {
  const router = useRouter();

  const { query } = router;

  const [pagination, setPagination] = useState(defaultPagination);

  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });

  const defaultValue = useRef<any>();

  usePathBaseFilter(pagination);

  // DIALOG METHODS
  const handleCloseDialog = useCallback(() => {
    setDialog({ open: false });
  }, []);

  const handleOpenDialog = useCallback((type: string) => {
    setDialog({ open: true, type });
  }, []);

  // DATA FETCHING
  const { data, isLoading, isFetching, refetch } = useQuery(
    [
      "PurchasePlan",
      {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        ...query,
      },
    ],
    () =>
      purchasePlan
        .getList({
          pageSize: pagination.pageSize,
          pageIndex: pagination.pageIndex,
          ...query,
        })
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        setPagination({ ...pagination, total: data?.totalItem });
      },
    }
  );

  const deleteMutation = useMutation((id: string) => purchasePlan.cancel(id), {
    onSuccess: (data) => {
      toast.success(data?.resultMessage);

      refetch();
    },
  });

  const handleDelete = useCallback(async () => {
    const { mainOrderCodes, id } = defaultValue.current || {};

    if (!id) {
      toast.error("Có lỗi xãy ra, vui lòng thử lại!");
      return;
    }

    if (confirm("Xác nhận hủy: " + mainOrderCodes)) {
      await deleteMutation.mutateAsync(defaultValue.current?.id);
    }
  }, [defaultValue.current]);

  // DATA TABLE
  const columns: TGridColDef[] = [
    ...purchasePlanColumns,
    {
      field: "action",
      headerName: "",
      align: "center",
      width: 50,
      renderCell: ({ row }) => (
        <DropdownButton
          id={row?.id}
          items={[
            {
              action: () => handleOpenDialog("View"),
              label: "Chi tiết SP cần mua",
            },
            {
              action: () => handleOpenDialog("Clone"),
              label: "Sao chép SP cần mua",
            },
            {
              action: handleDelete,
              label: "Hủy SP cần mua",
            },
          ]}
        />
      ),
    },
  ];

  const paginationProps = generatePaginationProps(pagination, setPagination);

  const onMouseEnterRow = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id;

    const currentRow = data?.items.find((item) => item.id === id);

    defaultValue.current = currentRow;
  };

  return (
    <Paper className="bgContainer">
      <Box className="flex justify-between items-center flex-wrap gap-2 mb-3">
        <Box className="flex gap-3">
          <AddButton
            variant="contained"
            onClick={() => handleOpenDialog("Add")}
          >
            Mua SP nhập kho
          </AddButton>
          <SearchBox />
        </Box>
        
        <Box className="flex gap-2">
          <FilterButton listFilterKey={[]} />
          <RefreshButton onClick={() => refetch()} />
          <ExportButton api={purchasePlan.export} filterParams={{...query, pageSize: 99999}} />
        </Box>
      </Box>

      <ContextMenuWrapper
        menuId="customer_table_menu"
        menuComponent={
          <Menu className="p-0" id="customer_table_menu">
            <Item id="view" onClick={() => handleOpenDialog("View")}>
              Chi tiết SP cần mua
            </Item>
            <Item id="note" onClick={() => handleOpenDialog("Clone")}>
              Sao chép SP cần mua
            </Item>
            <Item id="status" onClick={handleDelete}>
              Hủy SP cần mua
            </Item>
          </Menu>
        }
      >
        <DataTable
          rows={data?.items || []}
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

      <PurchasePlanDialog
        onClose={handleCloseDialog}
        open={dialog.open}
        type={dialog.type}
        defaultValue={defaultValue.current}
        refetch={refetch}
      />
    </Paper>
  );
};
