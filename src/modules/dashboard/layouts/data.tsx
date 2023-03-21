import QuoteIcon from "@mui/icons-material/RequestQuoteOutlined";
import OrderIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import ReceiptIcon from "@mui/icons-material/ReceiptLongOutlined";
import WarehouseIcon from "@mui/icons-material/WarehouseOutlined";
import ProductionIcon from "@mui/icons-material/ProductionQuantityLimitsOutlined";
import SettingsIcon from "@mui/icons-material/SettingsSuggestOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ForumIcon from "@mui/icons-material/Forum";
import ContactsIcon from "@mui/icons-material/Contacts";

export const menu = [
  {
    id: "quotation",
    title: "Báo giá",
    icon: <QuoteIcon className="w-[24px] h-[24px]" />,
    apiKey: ["PreOrder", "PreQuote"],
    childrens: [
      {
        title: "Đơn yêu cầu",
        link: "quotation/quote-request",
        apiKey: "PreOrder",
      },
      {
        title: "Đơn báo giá",
        link: "quotation/quote-list",
        apiKey: "PreQuote",
      },
    ],
  },
  {
    apiKey: ["ReferencePrice", "NeedToAskPrice", "AskPriceOrder"],
    id: "supplier-quotes",
    title: "Hỏi giá",
    icon: <RequestQuoteOutlinedIcon className="w-[24px] h-[24px]" />,
    childrens: [
      {
        title: "Giá tham khảo",
        link: "supplier-quotes/reference-price",
        apiKey: "ReferencePrice",
      },
      {
        title: "Sản phẩm cần hỏi giá",
        link: "supplier-quotes/product",
        apiKey: "NeedToAskPrice",
      },
      {
        title: "Đơn hỏi giá",
        link: "supplier-quotes/quotes",
        apiKey: "AskPriceOrder",
      },
    ],
  },
  {
    apiKey: ["MainOrder", "Bill"],
    id: "orders",
    title: "Đơn hàng",
    icon: <OrderIcon className="w-[24px] h-[24px]" />,
    childrens: [
      {
        title: "Đơn đặt hàng",
        link: "orders/booking-order",
        apiKey: "MainOrder",
      },
      {
        title: "Hóa đơn",
        link: "orders/bill-list",
        apiKey: "Bill",
      },
    ],
  },
  {
    apiKey: ["NeedToBuy", "ProductOrder", "ProductOrderBill"],
    id: "purchase",
    title: "Đơn mua hàng",
    icon: <ReceiptIcon className="w-[24px] h-[24px]" />,
    childrens: [
      {
        title: "Sản phẩm cần mua",
        link: "purchase/purchase-plan",
        apiKey: "NeedToBuy",
      },
      {
        title: "Đơn mua hàng",
        link: "purchase/purchase-request",
        apiKey: "ProductOrder",
      },
      {
        title: "Hóa đơn",
        link: "purchase/purchase-bill",
        apiKey: "ProductOrderBill",
      },
    ],
  },
  {
    apiKey: ["Warehouse"],
    id: "warehouse",
    title: "Quản lý kho",
    icon: <WarehouseIcon className="w-[24px] h-[24px]" />,
    childrens: [
      {
        title: "Nhập kho",
        link: "warehouse/warehouse-import",
        apiKey: "Warehouse",
      },
      {
        title: "Xuất kho",
        link: "warehouse/warehouse-export",
        apiKey: "Warehouse",
      },
    ],
  },
  {
    apiKey: [
      "Position",
      "Product",
      "Category",
      "ProductAttributes",
      "ProductLabel",
      "ProductBatch",
      "Document",
      "DocumentType",
      "DocumentCareer",
    ],
    id: "product-manage",
    title: "Quản lý sản phẩm",
    icon: <ProductionIcon className="w-[24px] h-[24px]" />,
    childrens: [
      {
        title: "Vị trí hàng hoá",
        link: "product-manage/storage",
        apiKey: "Position",
      },
      {
        title: "Tra cứu tồn kho",
        link: "product-manage/search",
        apiKey: "Product",
      },
      {
        title: "Danh sách sản phẩm",
        link: "product-manage/products",
        apiKey: "Product",
      },
      {
        title: "Danh mục sản phẩm",
        link: "product-manage/category",
        apiKey: "Category",
      },
      {
        title: "Thuộc tính sản phẩm",
        link: "product-manage/product-attribute",
        apiKey: "ProductAttributes",
      },
      {
        title: "Nhãn sản phẩm",
        link: "product-manage/stamp",
        apiKey: "ProductLabel",
      },
      {
        title: "Quản lý lô",
        link: "product-manage/product-lot",
        apiKey: "ProductBatch",
      },
      {
        title: "Tài liệu sản phẩm",
        link: "product-manage/documents",
        apiKey: "Document",
      },
      {
        title: "Loại tài liệu",
        link: "product-manage/document-type",
        apiKey: "DocumentType",
      },
      {
        title: "Tài liệu theo ngành",
        link: "product-manage/technical-documents",
        apiKey: "DocumentCareer",
      },
    ],
  },
  {
    apiKey: ["Supplier", "Customer", "TicketSupport", "Notifications", "Staff"],
    id: "account",
    title: "Tài khoản",
    icon: <PeopleAltOutlinedIcon className="w-[24px] h-[24px]" />,
    childrens: [
      {
        title: "Danh sách nhà cung cấp",
        link: "account/suppliers",
        apiKey: "Supplier",
      },
      {
        title: "Danh sách khách hàng",
        link: "account/customers",
        apiKey: "Customer",
      },
      {
        title: "Danh sách CSKH",
        link: "account/customer-care",
        apiKey: "TicketSupport",
      },
      {
        title: "Thông báo khách hàng",
        link: "account/mail-to-customer",
        apiKey: "Notifications",
      },
      {
        title: "Danh sách nhân viên",
        link: "account/staff",
        apiKey: "Staff",
      },
    ],
  },
  {
    apiKey: [
      "AccountLevel",
      "TicketAction",
      "Unit",
      "WarehouseConfig",
      "BranchConfig",
      "PaymentType",
    ],
    id: "settings",
    title: "Cấu hình",
    icon: <SettingsIcon className="w-[24px] h-[24px]" />,
    childrens: [
      {
        title: "Loại khách hàng",
        link: "settings/customer-type-config",
        apiKey: "AccountLevel",
      },
      {
        title: "Nhóm CSKH",
        link: "settings/customer-care-group",
        apiKey: "TicketAction",
      },
      {
        title: "Đơn vị",
        link: "settings/unit-config",
        apiKey: "Unit",
      },
      {
        title: "Kho",
        link: "settings/warehouse-config",
        apiKey: "WarehouseConfig",
      },
      {
        title: "Chi nhánh",
        link: "settings/branch-config",
        apiKey: "BranchConfig",
      },
      {
        title: "Hình thức thanh toán",
        link: "settings/payment-type",
        apiKey: "PaymentType",
      },
    ],
  },
  {
    apiKey: [
      "JobGroup",
      "TaskList",
      "Topic",
      "Discussion",
      "MeetingDeploy",
      "LeaveApplication",
      "RegisterMission",
    ],
    id: "forum",
    title: "Forum",
    icon: <ForumIcon className="w-[24px] h-[24px]" />,
    childrens: [
      {
        title: "Nhóm task",
        link: "forum/task-group",
        apiKey: "JobGroup",
      },
      {
        title: "Danh sách task",
        link: "forum/task-list",
        apiKey: "TaskList",
      },
      {
        title: "Nhóm đề tài",
        link: "forum/topic",
        apiKey: "Topic",
      },
      {
        title: "Thảo luận",
        link: "forum/discussion-topic",
        apiKey: "Discussion",
      },
      {
        title: "Họp triển khai",
        link: "forum/meeting-deploy",
        apiKey: "MeetingDeploy",
      },
      {
        title: "Nghỉ phép",
        link: "forum/leave-application",
        apiKey: "LeaveApplication",
      },
      {
        title: "Đăng ký công tác",
        link: "forum/register-mission",
        apiKey: "RegisterMission",
      },
    ],
  },
  {
    apiKey: ["AccountManagement", "CategoryTransaction", "Transaction"],
    id: "accountant",
    title: "Kế toán",
    icon: <ContactsIcon className="w-[24px] h-[24px]" />,
    childrens: [
      {
        title: "Quản lý tài khoản",
        link: "accountant/account",
        apiKey: "AccountManagement",
      },
      {
        title: "Danh mục giao dịch",
        link: "accountant/trading-directory",
        apiKey: "CategoryTransaction",
      },
      {
        title: "Quản lý giao dịch",
        link: "accountant/transaction",
        apiKey: "Transaction",
      },
    ],
  },
];
