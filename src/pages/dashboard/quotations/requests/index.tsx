import { DashboardLayout } from "~modules-dashboard/layouts";
import { QuotationsRequests } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const HomePage: TNextPageWithLayout = () => <QuotationsRequests />;

HomePage.displayName = "Yêu cầu báo giá";

HomePage.getLayout = () => (
  <DashboardLayout title="BÁO GIÁ / YÊU CẦU">
    <HomePage />
  </DashboardLayout>
);

export default HomePage;
