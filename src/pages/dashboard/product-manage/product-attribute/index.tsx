import { ProductAttributePage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <ProductAttributePage />;

Index.displayName = "Quản lý sản phẩm / thuộc tính sản phẩm";

Index.layoutName = "Dashboard";

Index.data = {
  title: "Quản lý sản phẩm / thuộc tính sản phẩm",
};

export default Index;
