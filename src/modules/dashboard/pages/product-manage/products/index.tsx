import { Checkbox, InputLabel, Paper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
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
    };
    router.push({ query: initQuery, ...query });
  }, [pagination]);

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
  const onUpdate = useCallback(
    (row: any) => {
      setDialog({ open: true, type: "View" });

      setDefaultValue(row);
    },
    [setDefaultValue]
  );

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

  const onDelete = useCallback(async (product: TProduct) => {
    if (confirm("Xác nhận xóa SP: " + product.productName)) {
      await mutateDelete.mutateAsync(product.id as string);
    }
  }, []);

  const handleChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;

    if (confirm(`Cập nhật ${isChecked ? "hiển thị" : "ẩn"} sp trên website?`)) {
    }
  };

  const columns: GridColDef[] = [
    {
      field: "created",
      headerName: "Ngày tạo",
      type: "dateTime",
      renderCell: (params) =>
        params.row.created
          ? moment(params.row.created).format("DD/MM/YYYY")
          : "__",
    },
    { field: "productGroupName", headerName: "Nhóm SP" },
    { field: "productCode", headerName: "Mã SP" },
    { field: "productName", headerName: "Mô tả SP" },
    { field: "manufactor", headerName: "Hãng sản xuất" },
    { field: "origin", headerName: "Xuất xứ" },
    { field: "specs", headerName: "Quy cách" },
    { field: "unitName", headerName: "ĐVT" },
    { field: "casCode", headerName: "Mã CAS" },
    { field: "chemicalName", headerName: "Công thức hóa học" },
    { field: "createdByName", headerName: "Người tạo" },
    {
      field: "websiteInfo",
      headerName: "Website",
      renderCell: ({ row }) => (
        <Checkbox value={row.websiteInfo} onChange={handleChangeStatus} />
      ),
    },
    { field: "numberOfReviews", headerName: "Đánh giá mới" },
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
            onClick={() => onDelete(record.row)}
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
