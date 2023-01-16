import { QuoteDetailPage } from "~modules-dashboard/pages/quotation/quote-detail";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <QuoteDetailPage />

Index.displayName = "Yêu cầu báo giá";

Index.layoutName = "Dashboard";

Index.data = {
    title: "BÁO GIÁ / YÊU CẦU BÁO GIÁ"
  }

export default Index;
