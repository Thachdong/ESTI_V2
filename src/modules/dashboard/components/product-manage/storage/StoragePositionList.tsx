import { Box, Button, Typography } from "@mui/material";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useCallback } from "react";
import styles from "~modules-dashboard/styles/product-manage/warehouse.module.css";

type TProps = {
  warehouse: {
    warehouseConfigID: string;
    warehouseConfigCode: string;
    positions: any;
  };
};

export const StoragePositionList: React.FC<TProps> = ({ warehouse }) => {
  const router = useRouter();

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

  const redirectToView = useCallback((id: string) => {
    router.push({
      pathname: "/dashboard/product-manage/position-detail",
      query: {
        id,
      },
    });
  }, []);

  return (
    <Box className="rounded bg-white">
      <Typography className="uppercase text-main font-semibold text-sm py-3 px-3 rounded bg-[#F3F6F9] m-2">
        {warehouse?.warehouseConfigCode}
      </Typography>

      <Box className="grid grid-cols-3 lg:grid-cols-5 md:grid-cols-4 gap-4 px-3 py-2">
        {warehouse?.positions?.map((position: any) => (
          <Button
            variant="text"
            className={clsx(
              getClassByStatus(position?.positionStatus),
              "border border-solid border-[#f5f3f3] text-center truncate px-2"
            )}
            onClick={() => redirectToView(position?.id as string)}
            key={position?.id}
          >
            {position?.positionName}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
