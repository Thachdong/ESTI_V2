import QuoteIcon from "@mui/icons-material/RequestQuoteOutlined";
import OrderIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import ReceiptIcon from "@mui/icons-material/ReceiptLongOutlined";
import WarehouseIcon from "@mui/icons-material/WarehouseOutlined";
import AccountIcon from "@mui/icons-material/SwitchAccountOutlined";
import ProductionIcon from "@mui/icons-material/ProductionQuantityLimitsOutlined";
import SettingsIcon from "@mui/icons-material/SettingsSuggestOutlined";

export const menu = [
  {
    id: "menu_parent_1",
    title: "Báo giá",
    icon: <QuoteIcon className="w-[20px] h-[20px]" />,
    childrens: [
      {
        title: "Đơn yêu cầu",
        link: "quotations/requests",
      },
      {
        title: "Đơn báo giá",
        link: "quotations",
      },
    ],
  },
  {
    id: "menu_parent_2",
    title: "Đơn hàng",
    icon: <OrderIcon className="w-[20px] h-[20px]" />,
    childrens: [
      {
        title: "Đơn đặt hàng",
        link: "order/requets",
      },
      {
        title: "hóa đơn",
        link: "order/invoices",
      },
    ],
  },
  {
    id: "menu_parent_3",
    title: "Đơn mua hàng",
    icon: <ReceiptIcon className="w-[20px] h-[20px]" />,
    childrens: [
      {
        title: "Sản phẩm cần mua",
        link: "purchase/products",
      },
      {
        title: "Đơn mua hàng",
        link: "purchase/supplier",
      },
    ],
  },
  {
    id: "menu_parent_4",
    title: "Quản lý kho",
    icon: <WarehouseIcon className="w-[20px] h-[20px]" />,
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
    id: "menu_parent_5",
    title: "Quản lý sản phẩm",
    icon: <ProductionIcon className="w-[20px] h-[20px]" />,
    childrens: [
      {
        title: "Danh sách sản phẩm",
        link: "product-manage/products",
      },
      {
        title: "Tra cứu vị trí",
        link: "products/tracking",
      },
      {
        title: "Tra cứu sản phẩm",
        link: "products/info",
      },
      {
        title: "Danh mục sản phẩm",
        link: "products",
      },
      {
        title: "Nhãn sản phẩm",
        link: "products/label",
      },
      {
        title: "Tài liệu sản phẩm",
        link: "products/documentation",
      },
      {
        title: "Loại tài liệu",
        link: "products/document-type",
      },
      {
        title: "Tài liệu theo ngành",
        link: "products/documentary-material",
      },
    ],
  },
  {
    id: "menu_parent_6",
    title: "Tài khoản",
    icon: <AccountIcon className="w-[20px] h-[20px]" />,
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
    id: "menu_parent_7",
    title: "Cấu hình",
    icon: <SettingsIcon className="w-[20px] h-[20px]" />,
    childrens: [
      {
        title: "Cấu hình đơn vị",
        link: "settings/product-units",
      },
      {
        title: "Cấu hình kho",
        link: "settings/warehouses",
      },
      {
        title: "Cấu hình chi nhánh",
        link: "settings/branchs",
      },
    ],
  },
];
