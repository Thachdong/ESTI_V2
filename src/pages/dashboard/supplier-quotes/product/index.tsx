import { SupplierQuotesProductPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <SupplierQuotesProductPage />;

Index.displayName = "Danh sách sản phẩm hỏi giá";

Index.layoutName = "Dashboard";

Index.data = {
  title: "HỎI GIÁ / SẢN PHẨM HỎI GIÁ",
};

export default Index;
