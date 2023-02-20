import { PaymentTypePage } from "~modules-dashboard/pages";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <PaymentTypePage />

Index.displayName = "Danh sách hình thức thanh toán";

Index.layoutName = "Dashboard";

Index.data = {
    title: "CẤU HÌNH / DANH SÁCH HÌNH THỨC THANH TOÁN"
}

export default Index;