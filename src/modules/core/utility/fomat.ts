import moment from "moment";
import React from "react";

class Format {
  // format date
  getVNDate = (date: Date, format: string = "DD/MM/YYYY h:mm:ss A") =>
    moment(date).format(format);

  getShortVNDate = (date: Date) => moment(date).format("DD/MM/YYYY");

  // kiểm tra có phải là số hay không
  isNumber = (val: string) => {
    if (val.match(/^-?[0-9]\d*([,.]\d+)?$/)) return true;
    return false;
  };

  // format ngày giờ

  converseDateTime = (val: number | any) => {
    const newDate = new Date(val).toLocaleString();
    return val == null ? "" : moment(newDate).format("DD/MM/YYYY HH:mm:ss");
  };

  converseDate = (val: number | any) => {
    const newDate = new Date(val).toLocaleString();
    return moment(newDate).format("DD/MM/YYYY");
  };

  converseYear = (val: number | any) => {
    const newDate = new Date(val * 1000.0).toLocaleString();
    return moment(newDate).format("YYYY");
  };

  // chuyển ngày giờ về dạng dãy số
  converseDateNumber = (val: string | any) => {
    const newD = Math.floor(new Date(val).getTime() / 1000.0);
    return newD;
  };

  //
  converseStringToNumber = (val: number | undefined) => {
    return val == undefined ? 0 : val;
  };

  // format tiền việt nam
  getVND = (price: number, suffix: string = " VNĐ") =>
    (price?.toString() || "0").replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // format phần trăm
  getPercent = (price: number, suffix: string = " %") =>
    (price?.toString() || "0") + suffix;
}

export const _format = new Format();
