import { PositionDetailPage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <PositionDetailPage />;

Index.displayName = "Quản lý sản phẩm / Vị trí hàng hóa";

Index.layoutName = "Dashboard";

Index.data = {
  pageName: "position-detail-page"
};

export default Index;
