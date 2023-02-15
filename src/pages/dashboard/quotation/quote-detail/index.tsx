import { QuoteDetailPage } from "~modules-dashboard/pages/quotation/quote-detail";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <QuoteDetailPage />

Index.displayName = "Đơn báo giá";

Index.layoutName = "Dashboard";

Index.data = {
    pageName: "quote-detail-page"
  }

export default Index;
