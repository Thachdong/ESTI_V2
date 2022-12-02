import { TControllerProps } from "~types/react-hook-form";
import { BoxProps } from "@mui/material";

type TFormEditor = BoxProps & {
    controlProps: TControllerProps;
    label: string;
}