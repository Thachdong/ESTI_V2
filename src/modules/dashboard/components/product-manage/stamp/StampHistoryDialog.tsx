import { useCallback, useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useQuery } from "react-query";
import { labelHistory } from "src/api";
import {
  ContextMenuWrapper,
  DataTable,
  Dialog,
  DropdownButton,
  generatePaginationProps,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { stampHistoryColumns } from "~modules-dashboard/pages/product-manage/stamp/data";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState, TDialog } from "~types/dialog";
import { StampDetailDialog } from "./StampDetailDialog";

export const StampHistoryDialog: React.FC<TDialog> = ({
  open,
  title,
  onClose,
  defaultValue,
}) => {
  const [pagination, setPagination] = useState(defaultPagination);

  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });

  const defaultHistory = useRef<any>();

  // METHODS
  const handleClose = useCallback(() => {
    setDialog({ open: false });
  }, []);

  const handleOpen = useCallback((type: string) => {
    setDialog({ open: true, type });
  }, []);

  // DATA FETCHING
  const { data, isLoading, isFetching } = useQuery(
    ["LabelHistoryList", { ...pagination }, defaultValue?.id],
    () =>
      labelHistory
        .getList({
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          productLabelId: defaultValue?.id,
        })
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        setPagination({ ...pagination, total: data?.totalItem });
      },
      enabled: !!defaultValue?.id,
    }
  );

  // DATA TABLE
  const columns: TGridColDef[] = [
    ...stampHistoryColumns,
    {
      field: "action",
      headerName: "",
      width: 50,
      renderCell: ({ row }) => (
        <DropdownButton
          id={row?.id}
          items={[
            {
              action: () => handleOpen("ViewLabel"),
              label: "Xem nhãn SP",
            },
          ]}
        />
      ),
    },
  ];

  const paginationProps = generatePaginationProps(pagination, setPagination);

  const onMouseEnterRow = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id;

    const currentRow = data?.items?.find((item: any) => item?.id === id);

    defaultHistory.current = currentRow;
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      title={title}
      headerClassName="text-center"
      className="h-full"
      PaperProps={{ sx: { height: "90%" } }}
    >
      <ContextMenuWrapper
        menuId="lable_table_menu"
        menuComponent={
          <Menu className="p-0" id="lable_table_menu">
            <Item
              id="view-product-label"
              onClick={() => handleOpen("ViewLabel")}
            >
              Xem nhãn SP
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
          autoHeight
          hideSearchbar={true}
        />
      </ContextMenuWrapper>

      <StampDetailDialog
        onClose={handleClose}
        open={dialog.open}
        type={"ViewLabel"}
        defaultValue={
          {
            lotNumber: defaultHistory.current?.lotNumber,
            manufactor: defaultHistory.current?.manufactor,
            specs: defaultHistory.current?.specs,
            productLabelId: defaultValue?.id,
          } as any
        }
      />
    </Dialog>
  );
};
