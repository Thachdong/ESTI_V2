import { useCallback, useRef, useState } from "react";
import { useQuery } from "react-query";
import { customerType, TCustomerType } from "src/api/customer-type";
import {
  AddButton,
  DataTable,
  DeleteButton,
  SearchBox,
  ViewButton,
} from "~modules-core/components";
import { Box, Paper } from "@mui/material";
import { TGridColDef } from "~types/data-grid";
import { customerTypeColumns } from "./data";

export const CustomerTypeConfigPage: React.FC = () => {
  const defaultValue = useRef<TCustomerType | any>();

  const [dialog, setDialog] = useState<{
    open: boolean;
    type?: "Add" | "View";
  }>({ open: false });

  // DIALOG METHODS
  const onClose = useCallback(() => setDialog({ open: false }), []);

  const onUpdate = useCallback(
    (row: TCustomerType) => {
      setDialog({ open: true, type: "View" });

      defaultValue.current = row;
    },
    [defaultValue]
  );

  const onAdd = useCallback(() => {
    setDialog({ open: true, type: "Add" });

    defaultValue.current = null;
  }, [defaultValue]);

  // DATA FETCHING
  const { data, isLoading, isFetching, refetch } = useQuery(
    ["customerTypesList"],
    () => customerType.getAll().then((res) => res.data)
  );

  // DATA TABLE
  const columns: TGridColDef<TCustomerType>[] = [
    ...customerTypeColumns,
    {
      field: "action",
      headerName: "CHI TIẾT",
      flex: 0,
      width: 100,
      renderCell: (record) => (
        <>
          <ViewButton onClick={() => onUpdate(record.row)} />
          <DeleteButton onClick={() => onUpdate(record.row)} />
        </>
      ),
    },
  ];

  return (
    <Paper className="bgContainer">
      <Box className="flex mb-3">
        <Box className="w-1/2">
          <SearchBox label="Tìm kiếm" />
        </Box>

        <Box className="w-1/2 flex items-center justify-end">
          <AddButton variant="contained" onClick={onAdd}>
            Tạo loại khách hàng
          </AddButton>
        </Box>
      </Box>

      <DataTable
        rows={data as []}
        columns={columns}
        gridProps={{
          loading: isLoading || isFetching,
          hideFooterPagination: true,
        }}
        hideSearchbar
        hideFooter
      />
    </Paper>
  );
};
