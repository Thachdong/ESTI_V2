import { SupplierQuotesPage } from "~modules-dashboard/pages/supplier-quotes/quotes";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <SupplierQuotesPage />;

Index.displayName = "Danh sách hỏi giá";

Index.layoutName = "Dashboard";

Index.data = {
  title: "HỎI GIÁ / DANH SÁCH HỎI GIÁ",
};

export default Index;
