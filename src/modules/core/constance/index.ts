export const defaultPagination: TPagination = {
  pageSize: 20,
  pageIndex: 1,
  total: 0,
  totalPage: 0,
};

export const quoteOrderStatus = [
  { value: 0, label: "Chưa thực hiện" },
  { value: 1, label: "Đang thực hiện" },
  { value: 2, label: "Kết chuyển báo cáo" },
  { value: 3, label: "Hủy yêu cầu" },
  { value: 4, label: "Tạm ngưng" },
  { value: 5, label: "Hủy báo giá" },
];

export const quoteStatus = [
  { value: 0, label: "Chưa báo giá" },
  { value: 1, label: "Đã báo giá" },
  { value: 2, label: "Báo giá lại" },
  { value: 3, label: "Kết chuyển đơn hàng" },
  { value: 4, label: "Từ chối" },
  { value: 5, label: "Hủy báo giá" },
  { value: 6, label: "Hủy yêu cầu" },
  { value: 7, label: "Quá hạn" },
  { value: 8, label: "Tạm ngưng" },
];

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
  { id: "0", name: "0%" },
  { id: "5", name: "5%" },
  { id: "8", name: "8%" },
  { id: "10", name: "10%" },
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

export const businessAreas = [
  {
    id: 1,
    name: "Dược phẩm",
  },
  {
    id: 2,
    name: "Thực phẩm",
  },
  {
    id: 3,
    name: "Đồ uống",
  },
  {
    id: 4,
    name: "Đơn vị kiểm định",
  },
  {
    id: 5,
    name: "Trung tâm nghiên cứu",
  },
  {
    id: 6,
    name: "Da giày - may mặc",
  },
  {
    id: 7,
    name: "Chế phẩm cao su",
  },
  {
    id: 8,
    name: "Thuỷ sản",
  },
  {
    id: 9,
    name: "Chế phẩm điện",
  },
  {
    id: 10,
    name: "Khác",
  },
];

export const defaultRoute = "/dashboard/quotation/quote-list";

export const accountTypeOptions = [
  { id: 1, name: "Normal" },
  { id: 2, name: "VIP" },
];

export const discountTypeOptions = [
  { id: 0, name: "Theo báo giá" },
  { id: 1, name: "Hoa Hồng" },
  { id: 2, name: "Tích điểm" },
];

export const accountStatus = [
  { value: 1, label: "Chưa kích hoạt" },
  { value: 0, label: "Đã kích hoạt" },
  { value: 2, label: "Đã khóa" },
];

export const staffDepartments = [
  { id: 1, name: "Phòng kế toán" },
  { id: 2, name: "Phòng kinh doanh" },
  { id: 3, name: "Phòng chăm sóc khách hàng" },
  { id: 4, name: "Phòng hành chánh" },
  { id: 5, name: "Phòng Marketing" },
  { id: 6, name: "Phòng kiểm soát chất lượng" },
];

export const orderStatus = [
  { value: 1, label: "Chưa thực hiện" },
  { value: 2, label: "Đang thực hiện" },
  { value: 3, label: "Hoàn thành" },
  { value: 4, label: "Hủy" },
];

export const billStatus = [
  { value: 0, label: "Chưa thanh toán" },
  { value: 1, label: "Hoàn thành" },
  { value: 2, label: "Quá hạn" },
  { value: 3, label: "Hủy" },
];

export const purchasePlanStatus = [
  { value: 0, label: "Chưa thực hiện" },
  { value: 1, label: "Đã kết chuyển" },
  { value: 2, label: "Hủy" },
];

export const purchaseOrderStatus = [
  { value: 1, label: "Chưa thực hiện" },
  { value: 2, label: "Đang thực hiện" },
  { value: 3, label: "Hoàn thành" },
  { value: 4, label: "Hủy" },
];

export const purchaseOrderBillStatus = [
  { value: 0, label: "Chưa thanh toán" },
  { value: 1, label: "Hoàn thành" },
  { value: 2, label: "Quá hạn" },
  { value: 3, label: "Hủy" },
];

export const supplierQuotesProductStatus = [
  { value: 0, label: "Chưa thực hiện" },
  { value: 1, label: "Đang thực hiện" },
  { value: 2, label: "Đã kết chuyển" },
  { value: 3, label: "Hủy" },
];

export const supplierQuotesProductTypes = [
  { value: 1, label: "Cần giá trước" },
  { value: 2, label: "Tình trạng hàng" },
  { value: 3, label: "Nhu cầu cao" },
  { value: 4, label: "Xin giảm giá" },
  { value: 5, label: "Sales tự lấy giá" },
];

export const supplierQuotesStatus = [
  { value: 0, label: "Chưa gửi" },
  { value: 1, label: "Đã gửi" },
  { value: 2, label: "Hoàn thành" },
  { value: 3, label: "Hủy" },
];

export const supplierQuotesDetailStatus = [
  { value: 1, label: "Sản phẩm mới" },
  { value: 2, label: "Nhu cầu cao" },
  { value: 3, label: "Cạnh tranh cao" },
  { value: 4, label: "Ngừng sản xuất" },
];

export const statusTask = [
  { id: 1, name: "Chưa thực hiện" },
  { id: 2, name: "Đang thực hiện" },
  { id: 3, name: "Hoàn thành" },
  { id: 4, name: "Chưa hoàn thành" },
  { id: 5, name: "Huỷ" },
];
export const customerCareStatus = [
  { value: 1, label: "Chưa thực hiện" },
  { value: 2, label: "Đang thực hiện" },
  { value: 3, label: "Đã hoàn thành" },
  { value: 4, label: "Đã hủy" },
];

export const chartjsOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
    },
  },
  scales: {
    xAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: "probability",
        },
      },
    ],
    yAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: "probability",
        },
      },
    ],
  },
};

export const referencePriceProductStatus = [
  { value: 1, label: "Sản phẩm mới" },
  { value: 2, label: "Nhu cầu cao" },
  { value: 3, label: "Cạnh tranh cao" },
  { value: 4, label: "Ngừng sản xuất" },
]
export const department = [
  { id: 1, name: "Phòng kinh doanh" },
  { id: 2, name: "Phòng kế toán" },
  { id: 3, name: "Phòng chăm sóc khách hàng" },
  { id: 4, name: "Phòng ban khách" },
  { id: 5, name: "Toàn công ty" },
];

export const ConfirmRegisterMission = [
  { id: 1, name: "Chưa phản hồi" },
  { id: 2, name: "Không đồng ý" },
  { id: 3, name: "Đồng ý" },
  { id: 4, name: "Huỷ" },
];
