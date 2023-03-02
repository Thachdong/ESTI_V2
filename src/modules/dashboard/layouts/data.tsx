import QuoteIcon from "@mui/icons-material/RequestQuoteOutlined";
import OrderIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import ReceiptIcon from "@mui/icons-material/ReceiptLongOutlined";
import WarehouseIcon from "@mui/icons-material/WarehouseOutlined";
import AccountIcon from "@mui/icons-material/SwitchAccountOutlined";
import ProductionIcon from "@mui/icons-material/ProductionQuantityLimitsOutlined";
import SettingsIcon from "@mui/icons-material/SettingsSuggestOutlined";

export const menu = [
  {
    id: "quotation",
    title: "Báo giá",
    icon: <QuoteIcon className="w-[24px] h-[24px]" />,
    childrens: [
      {
        title: "Đơn yêu cầu",
        link: "quotation/quote-request",
      },
      {
        title: "Đơn báo giá",
        link: "quotation/quote-list",
      },
    ],
  },
  {
    id: "orders",
    title: "Đơn hàng",
    icon: <OrderIcon className="w-[24px] h-[24px]" />,
    childrens: [
      {
        title: "Đơn đặt hàng",
        link: "orders/booking-order",
      },
      {
        title: "Hóa đơn",
        link: "orders/bill-list",
      },
    ],
  },
  {
    id: "supplier-quotes",
    title: "Hỏi giá",
    icon: <ReceiptIcon className="w-[24px] h-[24px]" />,
    childrens: [
      {
        title: "Sản phẩm cần hỏi giá",
        link: "supplier-quotes/product",
      },
      {
        title: "Đơn hỏi giá",
        link: "supplier-quotes/quotes",
      },
    ]
  },
  {
    id: "purchase",
    title: "Đơn mua hàng",
    icon: <ReceiptIcon className="w-[24px] h-[24px]" />,
    childrens: [
      {
        title: "Sản phẩm cần mua",
        link: "purchase/purchase-plan",
      },
      {
        title: "Đơn mua hàng",
        link: "purchase/purchase-request",
      },
      {
        title: "Hóa đơn",
        link: "purchase/purchase-bill",
      },
    ],
  },
  {
    id: "warehouse",
    title: "Quản lý kho",
    icon: <WarehouseIcon className="w-[24px] h-[24px]" />,
    childrens: [
      {
        title: "Xuất kho",
        link: "warehouse/warehouse-export",
      },
      {
        title: "Nhập kho",
        link: "warehouse/warehouse-import",
      },
    ],
  },
  {
    id: "product-manage",
    title: "Quản lý sản phẩm",
    icon: <ProductionIcon className="w-[24px] h-[24px]" />,
    childrens: [
      {
        title: "Tra cứu vị trí",
        link: "product-manage/storage",
      },
      {
        title: "Tra cứu sản phẩm",
        link: "product-manage/search",
      },
      {
        title: "Danh sách sản phẩm",
        link: "product-manage/products",
      },
      {
        title: "Danh mục sản phẩm",
        link: "product-manage/category",
      },
      {
        title: "Nhãn sản phẩm",
        link: "product-manage/stamp",
      },
      {
        title: "Tài liệu sản phẩm",
        link: "product-manage/documents",
      },
      {
        title: "Loại tài liệu",
        link: "product-manage/document-type",
      },
      {
        title: "Tài liệu theo ngành",
        link: "product-manage/technical-documents",
      },
    ],
  },
  {
    id: "account",
    title: "Tài khoản",
    icon: <AccountIcon className="w-[24px] h-[24px]" />,
    childrens: [
      {
        title: "Danh sách nhà cung cấp",
        link: "account/suppliers",
      },
      {
        title: "Danh sách khách hàng",
        link: "account/customers",
      },
      {
        title: "Danh sách nhân viên",
        link: "account/staff",
      },
    ],
  },
  {
    id: "settings",
    title: "Cấu hình",
    icon: <SettingsIcon className="w-[24px] h-[24px]" />,
    childrens: [
      {
        title: "Loại khách hàng",
        link: "settings/customer-type-config",
      },
      {
        title: "Đơn vị",
        link: "settings/unit-config",
      },
      {
        title: "Kho",
        link: "settings/warehouse-config",
      },
      {
        title: "Chi nhánh",
        link: "settings/branch-config",
      },
      {
        title: "Hình thức thanh toán",
        link: "settings/payment-type",
      },
    ],
  },
];
