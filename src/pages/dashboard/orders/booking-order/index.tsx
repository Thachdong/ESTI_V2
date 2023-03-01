import { BookingOrderPage } from "~modules-dashboard/pages/orders/booking-order";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <BookingOrderPage />;

Index.displayName = "Đơn đặt hàng";

Index.layoutName = "Dashboard";

Index.data = {
  title: "ĐƠN HÀNG / ĐƠN ĐẶT HÀNG",
};

export default Index;
