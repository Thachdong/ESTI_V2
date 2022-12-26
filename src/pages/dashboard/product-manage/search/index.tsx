import { ProductManagePage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <ProductManagePage />

Index.displayName = "Tra cứu sản phẩm";

Index.layoutName = "Dashboard";

Index.data = {
  title: "Quản lý sản phẩm / tra cứu sản phẩm",
};

export default Index;