import { StampPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <StampPage />

Index.displayName = "Nhãn sản phẩm";

Index.layoutName = "Dashboard";

Index.data = {
    title: "Quản lý sản phẩm / nhãn sản phẩm"
};

export default Index