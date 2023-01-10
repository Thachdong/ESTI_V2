export const defaultPagination: TPagination = {
  pageSize: 20,
  pageIndex: 1,
  total: 0,
  totalPage: 0
};

export const genderData = [
  { id: 1, name: "Nam" },
  { id: 2, name: "Nữ" },
  { id: 3, name: "Khác" },
];

export const paymentTypes = [
  { id: 1, name: "Tiền mặt" },
  { id: 2, name: "Chuyển khoản" },
];

export const paymentExpiredIn = [
  { id: 1, name: "trả trước" },
  { id: 2, name: "Net 7(7 ngày)" },
  { id: 3, name: "Net 15(15 ngày)" },
  { id: 4, name: "Net 30(30 ngày)" },
  { id: 5, name: "Net 45(45 ngày)" },
  { id: 6, name: "Net 60(60 ngày)" },
  { id: 7, name: "Net 90(90 ngày)" },
];

export const productTypes = [
  { id: 1, name: "Thiết bị" },
  { id: 2, name: "Hóa chất" },
  { id: 3, name: "Dụng cụ" },
  { id: 4, name: "Vật tư tiêu hao" },
  { id: 5, name: "Chất chuẩn" },
  { id: 6, name: "Nhóm sản phẩm khác" },
];

export const productTypesStamp = [
  // USE IN STAMP CONFIG PAGE
  { id: 1, name: "Thiết bị" },
  { id: 2, name: "Hóa chất" },
  { id: 3, name: "Dụng cụ" },
];

export const curatorDepartments = [
  { id: 1, name: "Phòng hành chánh" },
  { id: 2, name: "Phòng thu mua" },
  { id: 3, name: "Phòng QC" },
  { id: 4, name: "Phòng QA" },
  { id: 5, name: "Phòng ban khác" },
];

export const curatorPositions = [
  { id: 1, name: "Giám đốc" },
  { id: 2, name: "Kế toán" },
  { id: 3, name: "Nhân viên bán hàng" },
];

export const productTemplates = [
  {
    id: 1,
    name: "Template 1",
    url: "https://estiweb.monamedia.net/template/sanpham-1.html",
  },
  {
    id: 2,
    name: "Template 2",
    url: "https://estiweb.monamedia.net/template/sanpham-2.html",
  },
  { id: 3, name: "Template 3", url: "" },
];

export const parentCategoryId = "00000000-0000-0000-0000-000000000000";

export const searchParams = [
  { id: 1, name: "Mã sản phẩm" },
  { id: 2, name: "Tên sản phẩm" },
  { id: 3, name: "Nhà sản xuất" },
  { id: 4, name: "Lô sản xuất" },
];

export const positionStatus = [
  {
    id: 1,
    name: "Không có hàng",
  },
  {
    id: 2,
    name: "Còn trống",
  },
  {
    id: 3,
    name: "Gần đầy",
  },
  {
    id: 4,
    name: "Hết chổ",
  },
];

export const warehouseImportStatus = [
  {
    value: 0,
    label: "Chưa thực hiện",
  },
  {
    value: 1,
    label: "Đã nhập kho",
  },
  {
    value: 2,
    label: "Hủy",
  },
];

export const VAT = [
  { id: 0, name: "0%" },
  { id: 5, name: "5%" },
  { id: 8, name: "8%" },
  { id: 10, name: "10%" },
];

export const warehouseExportStatus = [
  {
    value: 0,
    label: "Chưa thực hiện",
  },
  {
    value: 1,
    label: "Đang đóng gói",
  },
  {
    value: 2,
    label: "Đang vận chuyển",
  },
  {
    value: 3,
    label: "Hoàn thành",
  },
  {
    value: 4,
    label: "Hủy đơn nháp",
  },
  {
    value: 5,
    label: "Hủy",
  },
];

export const purchaseRequestStatus = [
  {
    value: 1,
    label: "Chưa thực hiện",
  },
  {
    value: 2,
    label: "Đang thực hiện",
  },
  {
    value: 3,
    label: "Hoàn thành",
  },
  {
    value: 4,
    label: "Hủy",
  },
]