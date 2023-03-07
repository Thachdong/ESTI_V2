import { RegisterMissionPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <RegisterMissionPage />;

Index.displayName = "Đăng ký công tác";

Index.layoutName = "Dashboard";

Index.data = {
  title: "ĐĂNG KÝ CÔNG TÁC",
};

export default Index;
