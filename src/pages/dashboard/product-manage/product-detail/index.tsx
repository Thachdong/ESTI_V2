import { ProductDetailPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <ProductDetailPage />;

Index.displayName = "Chi tiết sản phẩm";

Index.layoutName = "Dashboard";

Index.data = {
  pageName: "product-detail-page"
};

export default Index;