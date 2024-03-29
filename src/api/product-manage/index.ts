import { request } from "../method";

export const productManage = {
  getList: (params?: any) =>
    request.getPagination<any>("Product/ProductSearchGetAll", { ...params }),
  statistics: () => request.get<any>("Product/GetProductSearchHeader"),
  downloadAllProduct: (params: any) =>
    request
      .get("/Product/export-excel", { ...params })
      .then((res) => resolveAndDownloadBlob(res)),
  historyList: (params?: any) =>
    request.getPagination<any>("Product/GetProductHistory", { ...params }),
  exportStockExcel: (params: any) =>
    request
      .get("Product/ExportStockExcel", { ...params })
      .then((res) => resolveAndDownloadBlob(res?.data)),
};

function resolveAndDownloadBlob(response: any) {
  const { FileDownloadName, FileContents, ContentType } = response || {};

  let link = document.createElement("a");

  link.href =
    "data:" + ContentType + ";base64," + encodeURIComponent(FileContents);

  link.setAttribute("download", FileDownloadName);

  link.style.display = "none";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}
