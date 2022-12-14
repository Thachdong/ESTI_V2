import { AvatarProps, TextFieldProps } from "@mui/material";
import {TControllerProps} from "../react-hook-form";

type TFormAvatar = TextFieldProps & {
    loader: (file: FormData) => Promise<TBaseResponse<string>>;
    controlProps: TControllerProps;
    avatarProps?: AvatarProps;
    title?: string;
}