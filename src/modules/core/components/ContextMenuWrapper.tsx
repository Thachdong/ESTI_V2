import { Box } from "@mui/material";
import { useContextMenu } from "react-contexify";
import { TContextMenuWrapper } from "~types/context-menu-wrapper";

// USAGE: APPLY MENU CONTEXT TO CHILD COMPONENT
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

  function handleContextMenu(event: any) {
    show({
      event,
    });
  }

  return (
    <>
      <Box onContextMenu={handleContextMenu}>{children}</Box>

      {menuComponent}
    </>
  );
};
