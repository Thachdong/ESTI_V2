import { Checkbox, InputLabel, Paper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { Router, useRouter } from "next/router";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { productsWebsite } from "src/api";
import { products, TProduct } from "src/api/products";
import {
  AddButton,
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
  // OPEN VIEW DETAIL DIALOG
  const onUpdate = useCallback(
    (row: any) => {
      setDialog({ open: true, type: "View" });

      setDefaultValue(row);
    },
    [setDefaultValue]
  );

  // MUTATION DECLERATIONS
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
      toast.error(`File ${file.name} không đúng định dạng!`);

      return;
    }
    const formData = new FormData();

    formData.append("file", file);

    await mutateImportExcel.mutateAsync(formData);
  };

  const handleDelete = useCallback(async (product: TProduct) => {
    if (confirm("Xác nhận xóa SP: " + product.productName)) {
      await mutateDelete.mutateAsync(product.id as string);
    }
  }, []);

  const handleChangeStatus = async (
    e: ChangeEvent<HTMLInputElement>,
    product: TProduct
  ) => {
    const isChecked = e.target.checked;

    const { productName } = product || {};

    if (
      confirm(
        `Cập nhật ${
          isChecked ? "hiển thị" : "ẩn"
        } sản phẩm ${productName} trên website?`
      )
    ) {
      await mutateStatus.mutateAsync(product?.id as string);
    }
  };

  const columns: TGridColDef[] = [
    {
      sortAscValue: 13,
      sortDescValue: 1,
      filterKey: "createdDate",
      field: "created",
      headerName: "Ngày tạo",
      type: "dateTime",
      renderCell: (params) =>
        params.row.created
          ? moment(params.row.created).format("DD/MM/YYYY")
          : "__",
    },
    {
      field: "productGroupName",
      headerName: "Nhóm SP",
      sortAscValue: 14,
      sortDescValue: 2,
      filterKey: "productGroup",
    },
    {
      field: "productCode",
      headerName: "Mã SP",
      sortAscValue: 15,
      sortDescValue: 3,
      filterKey: "code",
    },
    {
      field: "productName",
      headerName: "Mô tả SP",
      sortAscValue: 16,
      sortDescValue: 4,
      filterKey: "name",
    },
    {
      field: "manufactor",
      headerName: "Hãng sản xuất",
      sortAscValue: 17,
      sortDescValue: 5,
      filterKey: "manufactor",
    },
    {
      field: "origin",
      headerName: "Xuất xứ",
      sortAscValue: 18,
      sortDescValue: 6,
      filterKey: "origin",
    },
    {
      field: "specs",
      headerName: "Quy cách",
      sortAscValue: 19,
      sortDescValue: 7,
      filterKey: "specs",
    },
    {
      field: "unitName",
      headerName: "ĐVT",
      sortAscValue: 20,
      sortDescValue: 8,
      filterKey: "unitName",
    },
    {
      field: "casCode",
      headerName: "Mã CAS",
      sortAscValue: 21,
      sortDescValue: 9,
      filterKey: "casCode",
    },
    {
      field: "chemicalName",
      headerName: "Công thức hóa học",
      sortAscValue: 22,
      sortDescValue: 10,
      filterKey: "chemicalName",
    },
    {
      field: "createdByName",
      headerName: "Người tạo",
      sortAscValue: 23,
      sortDescValue: 11,
      filterKey: "createdBy",
    },
    {
      isSort: false,
      field: "deleted",
      headerName: "Website",
      renderCell: ({ row }) => (
        <Checkbox
          checked={row.deleted}
          value={row.deleted}
          onChange={(e) => handleChangeStatus(e, row)}
        />
      ),
    },
    { field: "numberOfReviews", headerName: "Đánh giá mới", isSort: false },
    {
      field: "action",
      headerName: "Thao tác",
      renderCell: (record) => (
        <>
          <ViewButton
            className="min-h-[40px] min-w-[40px]"
            onClick={() => onUpdate(record.row)}
          />
          <DeleteButton
            onClick={() => handleDelete(record.row)}
            className="min-h-[40px] min-w-[40px]"
          />
        </>
      ),
    },
  ];

  const paginationProps = generatePaginationProps(pagination, setPagination);

  return (
    <Paper className="p-2 w-full h-full shadow">
      <div className="flex mb-3">
        <div className="w-1/2">
          <SearchBox label="Tìm kiếm sale phụ trách" />
        </div>

        <div className="w-1/2 flex items-center justify-end">
          <AddButton
            onClick={() => setDialog({ open: true, type: "Add" })}
            variant="contained"
            className="mr-3"
          >
            Thêm sản phẩm
          </AddButton>

          <AddButton variant="contained" className="mr-3">
            <InputLabel htmlFor="product-file" className="text-white">
              Thêm file excel
              <FormInputBase
                id="product-file"
                className="hidden"
                type="file"
                onChange={handleImportExcel}
              />
            </InputLabel>
          </AddButton>
        </div>
      </div>

      <DataTable
        rows={data?.items}
        columns={columns}
        gridProps={{
          loading: isLoading || isFetching,
          sx: { width: "1600px" },
          ...paginationProps,
        }}
      />

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
