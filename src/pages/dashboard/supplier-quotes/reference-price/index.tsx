import { ReferencePricePage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <ReferencePricePage />

Index.displayName = "Danh sách giá tham khảo";

Index.layoutName = "Dashboard";

Index.data = {
  title: "HỎI GIÁ / DANH SÁCH GIÁ THAM KHẢO",
};

export default Index;
