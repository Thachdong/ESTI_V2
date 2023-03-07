import { Box } from "@mui/material";
import React, { MouseEvent, useEffect } from "react";
import { useContextMenu } from "react-contexify";
import { TContextMenuWrapper } from "~types/context-menu-wrapper";

// USAGE: APPLY MENU CONTEXT TO CHILD COMPONENT AND ONLY APPLY TO DATAGRID COMPONENT
// USING WITH DATA GRID:
// 1. COLLECT ROW DATA (EX: BY GET DATA FROM componentsProps => ROW => onMouseEnter)
// 2. PASS CHILDREN AND MENU COMPONENT TO ContextMenuWrapper

export const ContextMenuWrapper: React.FC<TContextMenuWrapper> = ({
  menuId,
  children,
  menuComponent,
}) => {
  const { show } = useContextMenu({
    id: menuId,
  });

  function handleContextMenu(event: MouseEvent<HTMLElement>) {
    const node = event.target as HTMLElement;

    const classList = Array.from(node.classList)?.join("");

    if (classList.includes("MuiDataGrid-cell")) {
      show({
        event,
      });
    }
  }

  return (
    <>
      <Box className="flex-grow" onContextMenu={handleContextMenu}>
        {children}
      </Box>

      {menuComponent}
    </>
  );
};
