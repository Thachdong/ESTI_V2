import { ProductsToBuyPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <ProductsToBuyPage />;

Index.displayName = "Sản phẩm cần mua";

Index.layoutName = "Dashboard";

Index.data = {
  title: "ĐƠN MUA HÀNG / SẢN PHẨM CẦN MUA",
};

export default Index;
