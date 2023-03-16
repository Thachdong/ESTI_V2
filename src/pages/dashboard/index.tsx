import { DashboardPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <DashboardPage />

Index.displayName = "Trang admin";

Index.layoutName = "Dashboard";

Index.data = {
  pageName: "dashboard-page"
}

export default Index;