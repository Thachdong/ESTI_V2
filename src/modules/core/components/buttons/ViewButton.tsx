import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { TBaseButton } from "~types/buttons";
import { BaseButton } from "./BaseButton";

export const ViewButton: React.FC<TBaseButton> = (props) => {
  const { children, ...rest } = props;
  return (
    <BaseButton
      variant="text"
      tooltipText="Xem chi tiết"
      {...rest}
      className="flex gap-2 items-center bg-main text-white"
    >
      <VisibilityOutlinedIcon />
      {children}
    </BaseButton>
  );
};
