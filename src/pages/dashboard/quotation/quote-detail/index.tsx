import { QuoteDetailPage } from "~modules-dashboard/pages/quotation/quote-detail";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <QuoteDetailPage />

Index.displayName = "Tạo đơn báo giá";

Index.layoutName = "Dashboard";

Index.data = {
    title: "BÁO GIÁ / TẠO ĐƠN BÁO GIÁ"
  }

export default Index;
