import { Box } from "@mui/material";
import _ from "lodash";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useQuery } from "react-query";
import { position } from "src/api";
import { AddButton } from "~modules-core/components";
import {
  StoragePositionList,
  StoragePositionStatus,
} from "~modules-dashboard/components";

export const StoragePage: React.FC = () => {
  const router = useRouter();

  // METHODS
  const redirectToCreate = useCallback(() => {
    router.push("/dashboard/product-manage/position-detail")
  }, []);

  // DATA FETCHING
  const { data, refetch } = useQuery(["product-manage-storage"], () =>
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

  // DOM RENDER
  return (
    <Box>
      <Box className="flex items-center justify-between mb-3">
        <StoragePositionStatus />

        <Box className="">
          <AddButton
            onClick={redirectToCreate}
            variant="contained"
          >
            Thêm vị trí
          </AddButton>
        </Box>
      </Box>

      <Box className="grid grid-cols-2 gap-4">
        {data?.items.map((item: any) => (
          <StoragePositionList
            warehouse={item}
            key={item?.warehouseConfigID}
          />
        ))}
      </Box>
    </Box>
  );
};
