import { GridColDef } from "@mui/x-data-grid";
import React, { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { TBranch, warehouseConfig } from "src/api";
import {
  AddButton,
  DataTable,
  generatePaginationProps,
  SearchBox,
} from "~modules-core/components";
import { ViewButton } from "~modules-core/components/buttons/ViewButton";
import { defaultPagination } from "~modules-core/constance";
import { WarehouseConfigDialog } from "~modules-dashboard/components/settings/WarehouseConfigDialog";

export const WarehouseConfigPage: React.FC = () => {
  const [pagination, setPagination] = useState(defaultPagination);

  const [searchContent, setSearchContent] = useState("");

  const [defaultValue, setDefaultValue] = useState<TBranch | null>();

  const [dialog, setDialog] = useState<{
    open: boolean;
    type?: "Add" | "View";
  }>({ open: false });

  const onClose = useCallback(() => setDialog({ open: false }), []);

  const onUpdate = useCallback(
    (row: TBranch) => {
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
      "customersList",
      "loading",
      {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        searchContent,
      },
    ],
    () =>
      warehouseConfig
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

  const columns: GridColDef<TBranch>[] = [
    { field: "code", headerName: "MÃ KHO" },
    { field: "branchCode", headerName: "MÃ CN" },
    { field: "position", headerName: "SỐ VỊ TRÍ" },
    {
      field: "action",
      headerName: "CHI TIẾT",
      flex: 0,
      width: 100,
      renderCell: (record) => (
        <ViewButton onClick={() => onUpdate(record.row)} />
      ),
    },
  ];

  const paginationProps = generatePaginationProps(pagination, setPagination);

  return (
    <>
      <div className="flex mb-3">
        <div className="w-1/2">
          <SearchBox label="Tìm kiếm" />
        </div>

        <div className="w-1/2 flex items-center justify-end">
          <AddButton variant="contained" onClick={onAdd}>
            Tạo kho
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

      <WarehouseConfigDialog
        onClose={onClose}
        open={dialog.open}
        type={dialog.type}
        refetch={refetch}
        defaultValue={defaultValue as any}
      />
    </>
  );
};
