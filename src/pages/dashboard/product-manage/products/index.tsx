import { ProductsPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <ProductsPage />;

Index.displayName = "Danh sách sản phẩm";

Index.layoutName = "Dashboard";

Index.data = {
  title: "Quản lý sản phẩm / danh sách sản phẩm",
};

export default Index;
