import { Button, Typography } from "@mui/material";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { Item, Menu, useContextMenu } from "react-contexify";
import { BaseButton } from "~modules-core/components";
import styles from "~modules-dashboard/styles/product-manage/warehouse.module.css";

const getClassByStatus = (status: number) => {
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
};

type TProps = {
  position: any;
  handleDelete: (position: any) => Promise<void>;
};

export const PositionButton: React.FC<TProps> = ({
  position,
  handleDelete,
}) => {
  const router = useRouter();

  const { show } = useContextMenu({
    id: position.id,
  });

  const redirectToView = useCallback((id: string) => {
    router.push({
      pathname: "/dashboard/product-manage/position-detail",
      query: {
        id,
      },
    });
  }, []);

  return (
    <>
      <BaseButton
        tooltipText={`${position?.productQuantity} / ${position?.positionMaxSlot}`}
        variant="text"
        className={clsx(
          getClassByStatus(position?.positionStatus),
          "border border-solid border-[#f5f3f3] text-center truncate px-2"
        )}
        onClick={() => redirectToView(position?.id as string)}
        onContextMenu={(event: any) => show({ event })}
        key={position?.id}
      >
        <Typography className="w-full px-2 truncate">
          {position?.positionName}
        </Typography>
      </BaseButton>

      <Menu className="p-0" id={position?.id}>
        <Item
          id={`detail_${position?.id}`}
          onClick={() => redirectToView(position?.id as string)}
        >
          Xem chi tiết
        </Item>
        <Item
          id={`delete_${position?.id}`}
          onClick={() => handleDelete(position)}
        >
          Xóa
        </Item>
      </Menu>
    </>
  );
};
