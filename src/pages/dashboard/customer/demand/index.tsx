import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <div>Danh sách nhu cầu</div>

Index.displayName = "Danh sách nhu cầu";

Index.layoutName = "Dashboard";

Index.data = {
  title: "KHÁCH HÀNG / DANH SÁCH NHU CẦU"
}

export default Index;