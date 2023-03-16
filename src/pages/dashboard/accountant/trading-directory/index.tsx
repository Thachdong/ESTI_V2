import { TrandingDirectoryPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <TrandingDirectoryPage />;

Index.displayName = "Danh mục giao dịch";

Index.layoutName = "Dashboard";

Index.data = {
  title: "DANH MỤC GIAO DỊCH",
};

export default Index;
