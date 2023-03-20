import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DotsIcon from "@mui/icons-material/MoreVertRounded";

type TDropdownButton = {
  items: {
    label: string | React.ReactNode;
    action: Function;
    disabled?: boolean;
  }[];
  id: string;
};

export const DropdownButton: React.FC<TDropdownButton> = ({ items, id }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const buttonId = id + "_button";

  const menuId = id + "_menu";

  const handleClickItem = (action: Function) => {
    action();

    handleClose();
  };

  return (
    <>
      <Button
        id={buttonId}
        aria-controls={open ? menuId : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="w-[32px] min-w-[32px] h-[32px] text-[#000]"
      >
        <DotsIcon />
      </Button>
      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": buttonId,
        }}
      >
        {items?.map((item, index) => (
          <MenuItem
            key={index}
            className="font-semibold text-sm text-[#061E33] hover:bg-main hover:text-[#FFF]"
            onClick={() => handleClickItem(item?.action)}
            disabled={item.disabled}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
