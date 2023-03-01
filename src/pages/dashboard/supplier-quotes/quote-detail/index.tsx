import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <div>chi tiết hỏi giá</div>

Index.displayName = "Chi tiết hỏi giá";

Index.layoutName = "Dashboard";

Index.data = {
  title: "HỎI GIÁ / TẠO ĐƠN HỎI GIÁ",
};

export default Index;
