import { DocumentTypesPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <DocumentTypesPage />;

Index.displayName = "Quản lý sản phẩm / loại tài liệu";

Index.layoutName = "Dashboard";

Index.data = {
  title: "Quản lý sản phẩm / loại tài liệu",
};

export default Index;
