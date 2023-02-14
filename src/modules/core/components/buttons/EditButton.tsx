import { BaseButton } from "./BaseButton";
import EditIcon from "@mui/icons-material/ModeEditRounded";
import { TBaseButton } from "~types/buttons";
import clsx from "clsx";

export const EditButton: React.FC<TBaseButton> = (props) => {
    const {className, ...rest} = props || {};
  return (
    <BaseButton className={clsx("w-[50px] min-w-[50px] h-[50px] rounded-full fixed right-10 z-10 top-[80px]", className)} {...rest}>
      <EditIcon />
    </BaseButton>
  );
};
