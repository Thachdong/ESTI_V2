import { DocumentsPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <DocumentsPage />

Index.displayName = "Tài liệu sản phẩm";

Index.layoutName = "Dashboard";

Index.data = {
    title: "Quản lý sản phẩm / tài liệu sản phẩm"
}

export default Index;