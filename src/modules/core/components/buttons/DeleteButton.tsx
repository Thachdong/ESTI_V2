import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { TBaseButton } from "~types/buttons";
import { BaseButton } from "./BaseButton";


export const DeleteButton: React.FC<TBaseButton> = (props) => {
  const {children, ...rest} = props;
  return (
    <BaseButton variant="text" tooltipText="Xóa" {...rest}>
      <DeleteOutlineOutlinedIcon />
      {children}
    </BaseButton>
  );
};
