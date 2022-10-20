import { DashboardLayout } from "~modules-dashboard/layouts";
import { Home } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const HomePage: TNextPageWithLayout = () => {
  return <Home />;
};

HomePage.displayName = "Dashboard";

HomePage.getLayout = () => (
  <DashboardLayout title="dashboard">
    <HomePage />
  </DashboardLayout>
);

export default HomePage;
