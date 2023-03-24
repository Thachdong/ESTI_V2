import { Box, Paper } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useMutation, useQuery } from "react-query";
import { referencePrice } from "src/api";
import {
  AddButton,
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
  FilterButton,
  generatePaginationProps,
  RefreshButton,
  StatisticButton,
  UploadButton,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { usePathBaseFilter } from "~modules-core/customHooks";
import { toast } from "~modules-core/toast";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";
import { referencePriceColumns } from "./data";
import { ReferencePriceDialog } from "./ReferencePriceDialog";

type TProps = {
  onViewReport: () => void;
  viewReport: boolean;
};

export const ReferencePriceTable: React.FC<TProps> = ({
  onViewReport,
  viewReport,
}) => {
  const [pagination, setPagination] = useState(defaultPagination);

  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });

  const router = useRouter();

  const { query } = router;

  const defaultValue = useRef<any>();

  usePathBaseFilter(pagination);

  const {
    data: referencePriceList,
    refetch,
    isFetching,
    isLoading,
  } = useQuery(
    [
      "ReferencePriceList",
      {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        ...query,
      },
    ],
    () =>
      referencePrice
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
    ...referencePriceColumns,
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

    const currentRow = referencePriceList?.items.find(
      (item: any) => item.id === id
    );

    defaultValue.current = currentRow;
  };

  // METHODS
  const deleteMutate = useMutation((id: string) => referencePrice.delete(id), {
    onSuccess: (data) => {
      toast.success(data.resultMessage);

      refetch?.();
    },
  });

  const handleDelete = useCallback(async () => {
    const { productCode, id } = defaultValue.current || {};

    if (confirm("Xác nhận xóa giá tham khảo " + productCode)) {
      await deleteMutate.mutateAsync(id);
    }
  }, [defaultValue.current]);

  return (
    <Paper className="bgContainer flex flex-col">
      <Box className="flex items-center justify-between mb-3">
        <AddButton onClick={() => onOpen("Add")}>Thêm giá tham khảo</AddButton>

        <Box className="flex gap-2">
          <StatisticButton onClick={onViewReport} View={viewReport} />

          <FilterButton listFilterKey={[]} />

          <RefreshButton onClick={() => refetch()} />

          <UploadButton refetch={refetch} loader={referencePrice.uploadFile} />
        </Box>
      </Box>

      <ContextMenuWrapper
        menuId="customer_opinion_table_menu"
        menuComponent={
          <Menu className="p-0" id="customer_opinion_table_menu">
            <Item id="view-opinion" onClick={() => onOpen("View")}>
              Cập nhật
            </Item>
            <Item id="delete-opinion" onClick={handleDelete}>
              Xóa
            </Item>
          </Menu>
        }
      >
        <DataTable
          columns={columns}
          rows={referencePriceList?.items || []}
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

      <ReferencePriceDialog
        onClose={onClose}
        open={dialog.open}
        type={dialog.type}
        refetch={refetch}
        defaultValue={defaultValue.current as any}
      />
    </Paper>
  );
};
