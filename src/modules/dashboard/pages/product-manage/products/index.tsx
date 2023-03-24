import {
  Box,
  Checkbox,
  FormControlLabel,
  InputLabel,
  Paper,
} from "@mui/material";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  useCallback,
  useState,
  MouseEvent,
  useRef,
  MouseEventHandler,
} from "react";
import { Item, Menu } from "react-contexify";
import { useMutation, useQuery } from "react-query";
import { productsWebsite } from "src/api";
import { products, TProduct } from "src/api/products";
import {
  AddButton,
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
  ExportButton,
  FilterButton,
  FormInputBase,
  generatePaginationProps,
  RefreshButton,
  SearchBox,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { usePathBaseFilter } from "~modules-core/customHooks";
import { toast } from "~modules-core/toast";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";
import { productColumns } from "./productColumns";

const excelEstensions = [
  "xlsx",
  "xls",
  "xlsm",
  "xlsb",
  "xltx",
  "xltm",
  "xlt",
  "xls",
  "xml",
  "xlam",
  "xla",
  "xlw",
  "xlr",
];

export const ProductsPage: React.FC = () => {
  const router = useRouter();

  const { query } = router;

  const [pagination, setPagination] = useState(defaultPagination);

  const defaultValue = useRef<any>();

  usePathBaseFilter(pagination);

  // DATA FETCHING
  const { data, isLoading, isFetching, refetch } = useQuery(
    [
      "productsList",
      "loading",
      {
        ...pagination,
        ...query,
      },
    ],
    () =>
      products
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

  // DATA TABLE
  const mutateDelete = useMutation((id: string) => products.delete(id), {
    onError: (error: any) => {
      toast.error(error?.resultMessage);
    },
    onSuccess: (data) => {
      toast.success(data.resultMessage);

      refetch();
    },
  });

  const mutateImportExcel = useMutation(
    (file: FormData) => products.importExcel(file),
    {
      onError: (error: any) => {
        toast.error(error?.resultMessage);
      },
      onSuccess: (data) => {
        toast.success(data.resultMessage);

        refetch();
      },
    }
  );

  const mutateStatus = useMutation(
    (id: string) => productsWebsite.display(id),
    {
      onError: (error: any) => {
        toast.error(error?.resultMessage);
      },
      onSuccess: (data) => {
        toast.success(data.resultMessage);

        refetch();
      },
    }
  );

  const handleImportExcel = async (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
  ) => {
    const file = e.target.files?.[0];

    const fileExtension = file?.name?.split(".").pop();

    if (!excelEstensions.includes(fileExtension)) {
      toast.error(`File ${file?.name} không đúng định dạng!`);

      return;
    }
    const formData = new FormData();

    formData.append("file", file);

    await mutateImportExcel.mutateAsync(formData);
  };

  const handleDelete = useCallback(async () => {
    const { productName, id } = defaultValue.current || {};

    if (confirm("Xác nhận xóa SP: " + productName)) {
      await mutateDelete.mutateAsync(id as string);
    }
  }, [defaultValue]);

  const handleChangeStatus = async (e: any, product: TProduct) => {
    const isChecked = e?.target?.checked;

    const { productName } = product || {};

    if (
      confirm(
        `${
          isChecked ? "Hiển thị" : "Ẩn"
        } sản phẩm ${productName} trên website?`
      )
    ) {
      await mutateStatus.mutateAsync(product?.id as string);
    }
  };

  const columns: TGridColDef[] = [
    ...productColumns,
    {
      isSort: false,
      field: "deletedProductWebsite",
      headerName: "Website",
      renderCell: ({ row }) => (
        <FormControlLabel
          control={<Checkbox size="small" />}
          label=""
          value={row.deletedProductWebsite}
          onChange={(e) => handleChangeStatus(e, row)}
          checked={!row.deletedProductWebsite}
        />
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
              action: () =>
                router.push({
                  pathname: "/dashboard/product-manage/product-detail",
                  query: {
                    id: row?.id,
                  },
                }),
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

  const onMouseEnterRow = (e: MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id;

    const currentRow = data?.items.find((item: any) => item.id === id);

    defaultValue.current = currentRow;
  };

  const paginationProps = generatePaginationProps(pagination, setPagination);

  return (
    <Paper className="bgContainer flex flex-col">
      <Box className="grid xl:grid-cols-3 gap-4 mb-3">
        <Box className="w-1/3 xl:w-1/2">
          <SearchBox label="Tìm kiếm sale phụ trách" />
        </Box>

        <Box className="xl:col-span-2 flex items-center justify-end gap-3 ml-3">
          <AddButton
            onClick={() =>
              router.push("/dashboard/product-manage/product-detail")
            }
            variant="contained"
          >
            Thêm sản phẩm
          </AddButton>

          <AddButton variant="contained" className="">
            <InputLabel
              htmlFor="product-file"
              className="cursor-pointer font-semibold text-white"
            >
              Thêm file excel
              <FormInputBase
                id="product-file"
                className="hidden"
                type="file"
                onChange={handleImportExcel}
              />
            </InputLabel>
          </AddButton>

          <FilterButton listFilterKey={[]} />

          <RefreshButton onClick={() => refetch()} />

          <ExportButton
            api={products.export}
            filterParams={{ ...query, pageSize: 99999 }}
          />
        </Box>
      </Box>

      <ContextMenuWrapper
        menuId="product_table_menu"
        menuComponent={
          <Menu className="p-0" id="product_table_menu">
            <Item
              id="view-product"
              onClick={() =>
                router.push({
                  pathname: "/dashboard/product-manage/product-detail",
                  query: {
                    id: defaultValue.current?.id,
                  },
                })
              }
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
    </Paper>
  );
};
