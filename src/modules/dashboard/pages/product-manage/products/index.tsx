import { Box, Checkbox, InputLabel, Paper } from "@mui/material";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useState,
  MouseEvent,
} from "react";
import { Item, Menu } from "react-contexify";
import { useMutation, useQuery } from "react-query";
import { productsWebsite } from "src/api";
import { products, TProduct } from "src/api/products";
import {
  AddButton,
  ContextMenuWrapper,
  DataTable,
  DeleteButton,
  FormInputBase,
  generatePaginationProps,
  SearchBox,
  ViewButton,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { toast } from "~modules-core/toast";
import { ProductsDialog } from "~modules-dashboard/components";
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

export const ProductsPage = () => {
  const router = useRouter();

  const { query } = router;

  const [pagination, setPagination] = useState(defaultPagination);

  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });

  const [defaultValue, setDefaultValue] = useState<any>();

  // PUSH PAGINATION QUERY
  useEffect(() => {
    const initQuery = {
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      ...query,
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
      toast.error(`File ${file.name} kh??ng ????ng ?????nh d???ng!`);

      return;
    }
    const formData = new FormData();

    formData.append("file", file);

    await mutateImportExcel.mutateAsync(formData);
  };

  const handleDelete = useCallback(async () => {
    if (confirm("X??c nh???n x??a SP: " + defaultValue.productName)) {
      await mutateDelete.mutateAsync(defaultValue.id as string);
    }
  }, [defaultValue]);

  const handleChangeStatus = async (
    e: ChangeEvent<HTMLInputElement>,
    product: TProduct
  ) => {
    const isChecked = e.target.checked;

    const { productName } = product || {};

    if (
      confirm(
        `C???p nh???t ${
          isChecked ? "hi???n th???" : "???n"
        } s???n ph???m ${productName} tr??n website?`
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
        <Checkbox
          checked={!row.deletedProductWebsite}
          value={row.deletedProductWebsite}
          onChange={(e) => handleChangeStatus(e, row)}
        />
      ),
    },
    {
      field: "action",
      headerName: "Thao t??c",
      renderCell: () => (
        <>
          <ViewButton
            className="min-h-[40px] min-w-[40px]"
            onClick={() => setDialog({ open: true, type: "View" })}
          />
          <DeleteButton
            onClick={handleDelete}
            className="min-h-[40px] min-w-[40px]"
          />
        </>
      ),
    },
  ];

  const onMouseEnterRow = (e: MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id;

    const currentRow = data?.items.find((item) => item.id === id);

    setDefaultValue(currentRow);
  };

  const paginationProps = generatePaginationProps(pagination, setPagination);

  return (
    <Paper className="bgContainer flex flex-col">
      <Box className="grid grid-cols-2 mb-3">
        <SearchBox label="T??m ki???m sale ph??? tr??ch" />

        <Box className="flex items-center justify-end">
          <AddButton
            onClick={() => setDialog({ open: true, type: "Add" })}
            variant="contained"
            className="mr-3"
          >
            Th??m s???n ph???m
          </AddButton>

          <AddButton variant="contained" className="mr-3">
            <InputLabel htmlFor="product-file" className="cursor-pointer text-white">
              Th??m file excel
              <FormInputBase
                id="product-file"
                className="hidden"
                type="file"
                onChange={handleImportExcel}
              />
            </InputLabel>
          </AddButton>
        </Box>
      </Box>

      <ContextMenuWrapper
        menuId="product_table_menu"
        menuComponent={
          <Menu className="p-0" id="product_table_menu">
            <Item
              id="view-product"
              onClick={() => setDialog({ open: true, type: "View" })}
            >
              Xem chi ti???t
            </Item>
            <Item id="delete-product" onClick={handleDelete}>
              X??a
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

      <ProductsDialog
        onClose={onDialogClose}
        open={dialog.open}
        type={dialog.type}
        refetch={refetch}
        defaultValue={defaultValue as any}
      />
    </Paper>
  );
};
