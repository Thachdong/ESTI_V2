import { TaskGroupPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <TaskGroupPage />;

Index.displayName = "Nhóm task";

Index.layoutName = "Dashboard";

Index.data = {
  title: "NHÓM TASK",
};

export default Index;
