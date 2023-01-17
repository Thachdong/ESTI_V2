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
};

function resolveAndDownloadBlob(response: any) {
  const { FileDownloadName, FileContents } = response?.data || {};

  const filename = decodeURI(FileDownloadName);

  const url = window.URL.createObjectURL(new Blob([FileContents]));

  const link = document.createElement("a");

  link.href = url;

  link.setAttribute("download", filename);

  document.body.appendChild(link);

  link.click();

  window.URL.revokeObjectURL(url);

  link.remove();
}