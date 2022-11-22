import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import React, { useCallback, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { TUnit, units } from "src/api";
import {
  AddButton,
  DataTable,
  DeleteButton,
  generatePaginationProps,
  SearchBox,
} from "~modules-core/components";
import { ViewButton } from "~modules-core/components/buttons/ViewButton";
import { defaultPagination } from "~modules-core/constance";
import { toast } from "~modules-core/toast";
import { UnitDialog } from "~modules-dashboard/components";
import { WarehouseConfigDialog } from "~modules-dashboard/components/settings/WarehouseConfigDialog";

export const UnitsPage: React.FC = () => {
  const [pagination, setPagination] = useState(defaultPagination);

  const [searchContent, setSearchContent] = useState("");

  const [defaultValue, setDefaultValue] = useState<TUnit | null>();

  const [dialog, setDialog] = useState<{
    open: boolean;
    type?: "Add" | "View";
  }>({ open: false });

  const onClose = useCallback(() => setDialog({ open: false }), []);

  const onUpdate = useCallback(
    (row: TUnit) => {
      setDialog({ open: true, type: "View" });

      setDefaultValue(row);
    },
    [setDefaultValue]
  );

  const onAdd = useCallback(() => {
    setDialog({ open: true, type: "Add" });

    setDefaultValue(null);
  }, [setDefaultValue]);

  const { data, isLoading, isFetching, refetch } = useQuery(
    [
      "unitsList",
      "loading",
      {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        searchContent,
      },
    ],
    () =>
      units
        .getList({
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          searchContent,
        })
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        setPagination({ ...pagination, total: data.totalItem });
      },
    }
  );

  const mutateDelete = useMutation((id: string) => units.delete(id), {
    onError: (error: any) => {
        toast.error(error?.resultMessage);
      },
      onSuccess: (data) => {
        toast.success(data?.resultMessage);

        refetch?.();
      },
  });

  const onDelete = useCallback(async(unit: TUnit) => {
    if (confirm("Xác nhận xóa đơn vị: " + unit.unitName)) {
        await mutateDelete.mutateAsync(unit.id)
    }
  }, [])

  const columns: GridColDef<TUnit>[] = [
    { field: "unitName", headerName: "TÊN ĐƠN VỊ" },
    {
      field: "created",
      headerName: "NGÀY TẠO",
      renderCell: (record) => moment(record.value).format("DD/MM/YYYY"),
    },
    { field: "createdByName", headerName: "NGƯỜI TẠO" },
    {
      field: "action",
      headerName: "",
      flex: 0,
      width: 100,
      renderCell: (record) => (
        <>
          <ViewButton
            className="min-h-[40px] min-w-[40px]"
            onClick={() => onUpdate(record.row)}
          />
          <DeleteButton onClick={() => onDelete(record.row)} className="min-h-[40px] min-w-[40px]" />
        </>
      ),
    },
  ];

  const paginationProps = generatePaginationProps(pagination, setPagination);

  return (
    <>
      <div className="flex mb-3">
        <div className="w-1/2">
          <SearchBox
            handleSearch={(val) => setSearchContent(val)}
            label="Tìm kiếm"
          />
        </div>

        <div className="w-1/2 flex items-center justify-end">
          <AddButton variant="contained" onClick={onAdd}>
            Tạo đơn vị
          </AddButton>
        </div>
      </div>

      <DataTable
        rows={data?.items}
        columns={columns}
        gridProps={{
          loading: isLoading || isFetching,
          ...paginationProps,
        }}
      />

      <UnitDialog
        onClose={onClose}
        open={dialog.open}
        type={dialog.type}
        refetch={refetch}
        defaultValue={defaultValue as any}
      />
    </>
  );
};
