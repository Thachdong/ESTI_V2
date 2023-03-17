import { ProductManagePage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <ProductManagePage />

Index.displayName = "Tra cứu tồn kho";

Index.layoutName = "Dashboard";

Index.data = {
  title: "Quản lý sản phẩm / tra cứu tồn kho",
};

export default Index;