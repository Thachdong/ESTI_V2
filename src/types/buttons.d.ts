import { ButtonProps } from "@mui/material";

type TBaseButton = ButtonProps & {
  onClick?: () => void;
  isSubmitting?: boolean;
  tooltipText?: string;
  tooltipPlacement?:
    | "bottom-end"
    | "bottom-start"
    | "bottom"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start"
    | "top";
};