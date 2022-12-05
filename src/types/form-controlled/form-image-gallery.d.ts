import { TextFieldProps, ImageListProps } from "@mui/material";
import {TControllerProps} from "../react-hook-form";

type TFormImageGallery = TextFieldProps & {
    loader: (file: FormData) => Promise<TBaseResponse<string>>;
    controlProps: TControllerProps;
    title?: string;
    imageListProps?: Partia<ImageListProps>
}