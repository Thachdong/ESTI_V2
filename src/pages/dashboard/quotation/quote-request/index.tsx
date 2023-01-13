import { QuotationRequestsPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <QuotationRequestsPage />;

Index.displayName = "Yêu cầu báo giá";

Index.layoutName = "Dashboard";

Index.data = {
    title: "BÁO GIÁ / YÊU CẦU BÁO GIÁ"
  }

export default Index;
