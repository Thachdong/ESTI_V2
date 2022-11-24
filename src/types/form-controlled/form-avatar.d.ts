import { AvatarProps, TextFieldProps } from "@mui/material";
import {TControllerProps} from "../react-hook-form";

type TFormAvatar = TextFieldProps & {
    controlProps: TControllerProps;
    avatarProps?: AvatarProps;
    title?: string;
}