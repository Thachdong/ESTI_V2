import { Box, Button, Paper } from "@mui/material";
import { Stack } from "@mui/system";
import moment from "moment";
import { useRouter } from "next/router";
import { useCallback, useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useMutation, useQuery } from "react-query";
import {
  category,
  documentCareer,
  documentType,
  productDocument,
  TDocument,
} from "src/api";
import {
  AddButton,
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
  generatePaginationProps,
  SearchBox,
} from "~modules-core/components";
import { defaultPagination, parentCategoryId } from "~modules-core/constance";
import { usePathBaseFilter } from "~modules-core/customHooks";
import { toast } from "~modules-core/toast";
import { DocumentDialog } from "~modules-dashboard/components";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";

export const DocumentsPage: React.FC = () => {
  // EXTRACT PROPS
  const router = useRouter();

  const { query } = router;

  const [pagination, setPagination] = useState(defaultPagination);

  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });

  const defaultValue = useRef<any>();

  usePathBaseFilter(pagination);

  // DIALOG METHODS
  const onDialogClose = useCallback(() => {
    setDialog({ open: false });
  }, []);

  // DATA FETCHING
  const { data, isLoading, isFetching, refetch } = useQuery(
    [
      "product-documents",
      "loading",
      {
        ...pagination,
        ...query,
      },
    ],
    () =>
      productDocument
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

  const { data: parentCategorys } = useQuery(["parentCategorys"], () =>
    category
      .getList({ pageIndex: 1, pageSize: 50, parentId: parentCategoryId })
      .then((res) => res.data.items)
  );

  const { data: documentTypes } = useQuery(["DocumentType"], () =>
    documentType.getList().then((res) => res.data)
  );

  const { data: documentCareers } = useQuery(["DocumentCareer"], () =>
    documentCareer.getList().then((res) => res.data)
  );

  // DATA TABLE
  const mutateDelete = useMutation((id: string) => productDocument.delete(id), {
    onError: (error: any) => {
      toast.error(error?.resultMessage);
    },
    onSuccess: (data) => {
      toast.success(data.resultMessage);

      refetch();
    },
  });

  const handleDelete = useCallback(async () => {
    const { productName, id } = defaultValue.current || {};

    if (confirm("Xác nhận xóa tài liệu SP: " + productName)) {
      await mutateDelete.mutateAsync(id as string);
    }
  }, [defaultValue]);

  const columns: TGridColDef[] = [
    {
      sortAscValue: 8,
      sortDescValue: 0,
      filterKey: "createdDate",
      field: "created",
      headerName: "Ngày tạo",
      type: "date",
      minWidth: 150,
      renderCell: ({ row }) =>
        row.created ? moment(row.created).format("DD/MM/YYYY") : "__",
    },
    {
      field: "categoryName",
      headerName: "Nhóm SP",
      sortAscValue: 9,
      sortDescValue: 1,
      filterKey: "category",
      type: "select",
      options: parentCategorys?.map?.((item) => ({
        value: item.id,
        label: item.name,
      })),
      minWidth: 150,
    },
    {
      field: "documentTypeName",
      headerName: "Loại tài liệu",
      sortAscValue: 14,
      sortDescValue: 6,
      filterKey: "type",
      minWidth: 150,
      type: "select",
      options: documentTypes?.map((item: any) => ({
        value: item?.id,
        label: item?.name,
      })),
    },
    {
      field: "productCode",
      headerName: "Mã SP",
      sortAscValue: 10,
      sortDescValue: 2,
      filterKey: "productCode",
      minWidth: 150,
    },
    {
      field: "productName",
      headerName: "Tên SP",
      sortAscValue: 11,
      sortDescValue: 3,
      filterKey: "productName",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "productManufactor",
      headerName: "Nhà sản xuất",
      sortAscValue: 12,
      sortDescValue: 4,
      filterKey: "productManufactor",
      minWidth: 150,
    },
    {
      field: "lotNumber",
      headerName: "LOT#",
      sortAscValue: 13,
      sortDescValue: 5,
      filterKey: "lotNumber",
      minWidth: 150,
    },
    {
      field: "documentCareerName",
      headerName: "Tài liệu chuyên ngành",
      sortAscValue: 15,
      sortDescValue: 7,
      filterKey: "careerId",
      minWidth: 200,
      type: "select",
      options: documentCareers?.map((item: any) => ({
        value: item?.id,
        label: item?.name,
      })),
    },
    {
      field: "attachFile",
      headerName: "File",
      isFilter: false,
      isSort: false,
      minWidth: 125,
      renderCell: ({ row }) => {
        const { attachFiles = [] } = row || {};

        return (
          <Stack>
            {attachFiles?.map?.((file: string, index: number) => (
              <Button key={file} variant="text" className="truncate">
                <a
                  href={file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline text-main text-sm font-semibold"
                >
                  File {index + 1}
                </a>
              </Button>
            ))}
          </Stack>
        );
      },
    },
    {
      field: "action",
      headerName: "",
      align: "center",
      minWidth: 50,
      renderCell: ({ row }) => (
        <DropdownButton
          id={row?.id as string}
          items={[
            {
              action: () => setDialog({ open: true, type: "View" }),
              label: "Thông tin chi tiết",
            },
            {
              action: handleDelete,
              label: "Xóa",
            },
          ]}
        />
      ),
    },
  ];

  const onMouseEnterRow = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id;

    const currentRow = data?.items.find((item) => item.id === id);

    defaultValue.current = currentRow;
  };

  const paginationProps = generatePaginationProps(pagination, setPagination);

  // DOM RENDER
  return (
    <Paper className="bgContainer flex flex-col">
      <Box className="flex items-center gap-3 w-3/5 mb-3">
        <Box className="flex items-center justify-end">
          <AddButton
            onClick={() => setDialog({ open: true, type: "Add" })}
            variant="contained"
          >
            Thêm tài liệu
          </AddButton>
        </Box>
        <SearchBox label="Tìm kiếm" />
      </Box>

      <ContextMenuWrapper
        menuId="product_table_menu"
        menuComponent={
          <Menu className="p-0" id="product_table_menu">
            <Item
              id="view-product"
              onClick={() => setDialog({ open: true, type: "View" })}
            >
              Xem chi tiết
            </Item>
            <Item id="delete-product" onClick={handleDelete}>
              Xóa
            </Item>
          </Menu>
        }
      >
        <DataTable
          rows={data?.items as []}
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

      <DocumentDialog
        onClose={onDialogClose}
        open={dialog.open}
        type={dialog.type}
        refetch={refetch}
        defaultValue={defaultValue.current}
      />
    </Paper>
  );
};
