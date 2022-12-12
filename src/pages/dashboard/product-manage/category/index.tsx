import { CategoryPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <CategoryPage />

Index.displayName = "Danh mục sản phẩm";

Index.layoutName = "Dashboard";

Index.data = {
    title: "Quản lý sản phẩm / danh mục sản phẩm"
  }

export default Index;