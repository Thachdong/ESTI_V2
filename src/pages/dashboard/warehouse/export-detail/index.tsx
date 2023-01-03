import { ExportDetailPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <ExportDetailPage />

Index.displayName = "Xuất kho";

Index.layoutName = "Dashboard";

Index.data = {
  pageName: "warehouse-export-detail"
};

export default Index;