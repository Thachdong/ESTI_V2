// 1. Tạo đơn báo giá
// 1.1 Tạo không qua đơn yêu cầu: cho chọn khách hàng
// 1.2 Tạo qua đơn yêu cầu:
//       - yêu cầu từ khách hàng trong hệ thống: hiển thị thông tin customerId
//       - yêu cầu từ khách chưa có trong hệ thống: chỉ hiển thị thông tin, không cho tạo => phải update khách hàng trong form yêu cầu trước
// 1.3 Clone khách hàng: lấy toàn bộ data, bỏ thông tin đơn yêu cầu
// 1.4 Tạo báo giá từ trang yêu cầu báo giá: 1.2
// 2. Xem đơn báo giá
// 3. Cập nhật đơn báo giá

import { QuoteDetailPage } from "~modules-dashboard/pages/quotation/quote-detail";
import { TNextPageWithLayout } from "~types/_app";

const Index: TNextPageWithLayout = () => <QuoteDetailPage />

Index.displayName = "Đơn báo giá";

Index.layoutName = "Dashboard";

Index.data = {
    pageName: "quote-detail-page"
  }

export default Index;
