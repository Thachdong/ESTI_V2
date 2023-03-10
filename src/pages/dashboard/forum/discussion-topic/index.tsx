import { DiscussionTopicPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <DiscussionTopicPage />;

Index.displayName = "Danh sách thảo luận";

Index.layoutName = "Dashboard";

Index.data = {
  title: "DANH SÁCH THẢO LUẬN",
};

export default Index;
