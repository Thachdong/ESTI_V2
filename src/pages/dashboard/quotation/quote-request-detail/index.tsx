import { QuoteRequestDetailPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <QuoteRequestDetailPage />

Index.displayName = "Tạo yêu cầu báo giá";

Index.layoutName = "Dashboard";

Index.data = {
    title: "BÁO GIÁ / TẠO YÊU CẦU BÁO GIÁ"
  }

export default Index;
