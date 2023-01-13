import { TextFieldProps, ImageListProps } from "@mui/material";
import { ReactNode } from "react";
import {TControllerProps} from "../react-hook-form";

type TFormImageGallery = TextFieldProps & {
    loader: (file: FormData) => Promise<TBaseResponse<string>>;
    controlProps: TControllerProps;
    title?: string;
    imageListProps?: Partia<ImageListProps>
}

type TFormUploadBase = {
    loader: (file: FormData) => Promise<TBaseResponse<string>>;
    controlProps: TControllerProps;
    renderTitle: (loading: boolean) => ReactNode;
    multiple?: boolean;
}