import { TopicPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <TopicPage />;

Index.displayName = "Danh sách nhóm đề tài";

Index.layoutName = "Dashboard";

Index.data = {
  title: "DANH SÁCH NHÓM ĐỀ TÀI",
};

export default Index;
