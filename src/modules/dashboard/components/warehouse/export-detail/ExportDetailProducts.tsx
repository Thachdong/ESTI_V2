import { Paper, Stack, Typography } from "@mui/material";
import { DataTable, DeleteButton, ViewButton } from "~modules-core/components";
import { productColumns } from "~modules-dashboard/pages/warehouse/import-detail/data";
import { TGridColDef } from "~types/data-grid";

export const ExportDetailProducts = () => {
  // DATA TABLE
  const columns: TGridColDef[] = [
    ...productColumns,
    {
      field: "action",
      headerName: "",
      width: 50,
      renderCell: ({ row }) => (
        <Stack direction="row">
          <DeleteButton
            // onClick={() => handleRemoveProduct(row)}
            className="min-w-[24px]"
          />
          <ViewButton
            // onClick={() => handleViewProduct(row)}
            className="min-w-[24px]"
          />
        </Stack>
      ),
    },
  ];
  return (
    <Paper className="rounded-sm p-3">
      <Typography className="text-sm font-medium flex-grow mb-3">
        SẢN PHẨM
      </Typography>

      <DataTable
        rows={[]}
        columns={columns}
        autoHeight={true}
        hideSearchbar={true}
        getRowId={(row) => row?.no}
        hideFooter
      />
    </Paper>
  );
};
