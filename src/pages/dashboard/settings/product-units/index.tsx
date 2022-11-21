import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <div>Product units list</div>

Index.displayName = "Danh sách đơn vị";

Index.layoutName = "Dashboard";

Index.data = {
    title: "CẤU HÌNH / DANH SÁCH ĐƠN VỊ"
}

export default Index;