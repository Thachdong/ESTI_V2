import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

type TContextMenuWrapper = {
    children: ReactJSXElement;
    menuId: string;
    menuComponent: React;
}