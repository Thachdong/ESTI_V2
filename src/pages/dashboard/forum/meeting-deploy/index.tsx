import { MeetingDeployPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <MeetingDeployPage />;

Index.displayName = "Họp triển khai";

Index.layoutName = "Dashboard";

Index.data = {
  title: "HỌP TRIỂN KHAI",
};

export default Index;
