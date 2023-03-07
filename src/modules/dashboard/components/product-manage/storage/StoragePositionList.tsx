import { Box, Button, Typography } from "@mui/material";
import clsx from "clsx";
import { useCallback } from "react";
import { TPosition } from "src/api";
import styles from "~modules-dashboard/styles/product-manage/warehouse.module.css";

type TProps = {
  warehouse: {
    warehouseConfigID: string;
    warehouseConfigCode: string;
    positions: TPosition[];
  };
  onDialogOpen: (type: string, data: TPosition) => void;
};

export const StoragePositionList: React.FC<TProps> = ({
  warehouse,
  onDialogOpen,
}) => {
  const getClassByStatus = useCallback(
    (status: number) => {
      switch (status) {
        case 1:
          return styles["empty"];
        case 2:
          return styles["available"];
        case 3:
          return styles["nealy-full"];
        case 4:
          return styles["full"];
      }
    },
    [warehouse]
  );

  return (
    <Box className="rounded bg-white">
      <Typography className="uppercase text-main font-semibold text-sm py-3 px-3 rounded bg-[#F3F6F9] m-2">
        {warehouse?.warehouseConfigCode}
      </Typography>

      <Box className="grid grid-cols-3 lg:grid-cols-5 md:grid-cols-4 gap-4 px-3 py-2">
        {warehouse?.positions?.map((position) => (
          <Button
            variant="text"
            className={clsx(
              getClassByStatus(position?.positionStatus),
              "border border-solid border-[#f5f3f3] text-center"
            )}
            onClick={() => onDialogOpen("View", position)}
            key={position?.id}
          >
            {position?.positionName}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
