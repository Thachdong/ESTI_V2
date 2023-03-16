import { TaskListPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <TaskListPage />;

Index.displayName = "Danh sách task";

Index.layoutName = "Dashboard";

Index.data = {
  title: "DANH SÁCH TASK",
};

export default Index;
