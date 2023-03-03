import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <div>Danh sách đối thủ cạnh tranh</div>

Index.displayName = "Danh sách đối thủ cạnh tranh";

Index.layoutName = "Dashboard";

Index.data = {
  title: "KHÁCH HÀNG / DANH SÁCH ĐỐI THỦ"
}

export default Index;