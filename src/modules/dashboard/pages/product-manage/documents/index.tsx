import { Box, Button, Paper } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
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
import { toast } from "~modules-core/toast";
import { DocumentDialog } from "~modules-dashboard/components";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";
import { documentColumns } from "./data";

export const DocumentsPage: React.FC = () => {
  // EXTRACT PROPS
  const router = useRouter();

  const { query } = router;

  const [pagination, setPagination] = useState(defaultPagination);

  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });

  const defaultValue = useRef<any>();

  // SIDE EFFECTS
  // PUSH PAGINATION QUERY
  useEffect(() => {
    const initQuery = {
      ...query,
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
    };

    router.push({ query: initQuery });
  }, [pagination, router.isReady]);

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
      .then((res) =>
        res.data.items.map((item) => ({ value: item.id, label: item.name }))
      )
  );

  const { data: documentTypes } = useQuery(["DocumentType"], () =>
    documentType
      .getList()
      .then((res) =>
        res.data?.map((item: any) => ({ value: item.id, label: item.name }))
      )
  );

  const { data: documentCareers } = useQuery(["DocumentCareer"], () =>
    documentCareer
      .getList()
      .then((res) =>
        res.data.map((item: any) => ({ value: item.id, label: item.name }))
      )
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

  const columns: TGridColDef<TDocument>[] = [
    {
      ...documentColumns[0],
    },
    {
      field: "categoryName",
      headerName: "Nhóm SP",
      sortAscValue: 9,
      sortDescValue: 1,
      filterKey: "category",
      type: "select",
      options: parentCategorys,
      width: 150,
    },
    ...documentColumns.slice(1),
    {
      field: "documentTypeName",
      headerName: "Loại tài liệu",
      sortAscValue: 14,
      sortDescValue: 6,
      filterKey: "type",
      width: 150,
      type: "select",
      options: documentTypes,
    },
    {
      field: "documentCareerName",
      headerName: "Tài liệu chuyên ngành",
      sortAscValue: 15,
      sortDescValue: 7,
      filterKey: "careerSlug",
      width: 200,
      type: "select",
      options: documentCareers,
    },
    {
      field: "attachFile",
      headerName: "File",
      isFilter: false,
      isSort: false,
      width: 125,
      renderCell: ({ row }) => (
        <Button variant="text" className="truncate">
          <a
            href={row.attachFiles?.[0]}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline text-main text-sm font-semibold"
          >
            Xem chi tiết
          </a>
        </Button>
      ),
    },
    {
      field: "action",
      headerName: "",
      align: "center",
      width: 50,
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
