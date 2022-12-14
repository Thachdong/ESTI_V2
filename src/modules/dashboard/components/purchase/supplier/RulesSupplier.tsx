import { Paper } from "@mui/material";
import React from "react";
import {
  FormDatepicker,
  FormInput,
  FormSelect,
} from "~modules-core/components";

type TProps = {
  control: any;
};

export const RulesSupplier: React.FC<TProps> = ({ control }) => {
  return (
    <Paper className="shadow my-4 p-4 text-sm">
      <div className="font-semibold text-sm">
        <span>
          Điều khoản của đơn đặt hàng/ Terms and conditions of purchasing order
          :
        </span>
      </div>
      <div>
        <ul className="grid gap-2 pl-4">
          <li className="list-none">
            <span>
              - Tổng cộng tiền thanh toán đã bao đồm thuế GTGT và chi phí giao
              hàng/ Total amount are included VAT and delivery fee
            </span>
          </li>
          <li className="flex items-center ">
            <span className="whitespace-nowrap mr-4">
              {" "}
              - Hình thức thanh toán/ Payment term:
            </span>
            <div className="w-[200px]">
              <FormSelect
                controlProps={{
                  name: "code",
                  control,
                }}
                options={[]}
                label=""
                required
                className=""
              />
            </div>
          </li>
          <li className="flex items-center">
            <span className="mr-4">
              {" "}
              - Thời gian giao hàng dự kiến / Estimated to delivery :{" "}
            </span>
            <div className="">
              <FormDatepicker
                controlProps={{
                  name: "Date",
                  control,
                }}
              />
            </div>
          </li>
          <li className="flex items-center">
            <span className="mr-4">
              {" "}
              - Địa điểm giao hàng/ Place of Delivery :{" "}
            </span>
            <div className="">
              <FormInput
                controlProps={{
                  name: "Date",
                  control,
                }}
              />
            </div>
          </li>
          <li className="flex items-center">
            <span className="mr-4">
              {" "}
              - Chứng từ thanh toán/ Payment documents :{" "}
            </span>
            <div className="w-[200px]">
              <FormSelect
                controlProps={{
                  name: "Date",
                  control,
                }}
                options={[]}
                placeholder="Select..."
                label="Select.."
              />
            </div>
          </li>
        </ul>
      </div>
    </Paper>
  );
};
