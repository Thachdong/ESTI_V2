import { QuoteListPage } from "~modules-dashboard/pages/quotation/quote-list";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <QuoteListPage />

Index.displayName = "Đơn báo giá";

Index.layoutName = "Dashboard";

Index.data = {
    title: "BÁO GIÁ / ĐƠN BÁO GIÁ"
  }

export default Index;
