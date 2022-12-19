import { Box, Paper } from "@mui/material";
import _ from "lodash";
import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { position } from "src/api";
import { AddButton } from "~modules-core/components";
import {
  DocumentDialog,
  PositionList,
  PositionStatus,
} from "~modules-dashboard/components";
import { TDefaultDialogState } from "~types/dialog";

export const WarehousePage: React.FC = () => {
  // EXTRACT PROPS
  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });

  // DIALOG METHODS
  const onDialogClose = useCallback(() => {
    setDialog({ open: false });
  }, []);

  // DATA FETCHING
  const { data, refetch } = useQuery(["product-manage-warehouse"], () =>
    position
      .getList({
        pageIndex: 1,
        pageSize: 999,
      })
      .then((res) => {
        const items = res?.data?.items || [];
        const warehouseList = items.map((item) => ({
          warehouseConfigID: item?.warehouseConfigID,
          warehouseConfigCode: item?.warehouseConfigCode,
        }));

        const uniqWarehouses = _.uniqBy(
          warehouseList,
          (warehouse) => warehouse?.warehouseConfigID
        );

        const updatedItems = uniqWarehouses.map((warehouse) => ({
          ...warehouse,
          positions: items?.filter(
            (item) => item?.warehouseConfigID === warehouse?.warehouseConfigID
          ),
        }));

        return {
          ...res?.data,
          items: updatedItems,
        };
      })
  );

  console.log(data);

  // DOM RENDER
  return (
    <Box>
      <Box className="grid grid-cols-2 mb-3">
        <PositionStatus />

        <Box className="flex items-center justify-end">
          <AddButton
            onClick={() => setDialog({ open: true, type: "Add" })}
            variant="contained"
            className="mr-3"
          >
            Thêm vị trí
          </AddButton>
        </Box>
      </Box>

      <Box className="grid grid-cols-2 gap-4">
        {data?.items.map((item: any) => (
          <PositionList warehouse={item} key={item?.warehouseConfigID} />
        ))}
      </Box>

      <DocumentDialog
        onClose={onDialogClose}
        open={dialog.open}
        type={dialog.type}
        refetch={refetch}
        defaultValue={{} as any}
      />
    </Box>
  );
};
