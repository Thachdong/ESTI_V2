import { SupplierQuoteDetailPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <SupplierQuoteDetailPage />

Index.displayName = "Chi tiết hỏi giá";

Index.layoutName = "Dashboard";

Index.data = {
  title: "HỎI GIÁ / TẠO ĐƠN HỎI GIÁ",
};

export default Index;