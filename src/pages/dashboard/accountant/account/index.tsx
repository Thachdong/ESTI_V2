import { AccountPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <AccountPage />;

Index.displayName = "QUẢN LÝ TÀI KHOẢN";

Index.layoutName = "Dashboard";

Index.data = {
  title: "QUẢN LÝ TÀI KHOẢN",
};

export default Index;
