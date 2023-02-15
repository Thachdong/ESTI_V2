import { QuoteRequestDetailPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <QuoteRequestDetailPage />

Index.displayName = "Tạo yêu cầu báo giá";

Index.layoutName = "Dashboard";

Index.data = {
    pageName: "quote-request-detail-page"
  }

export default Index;
