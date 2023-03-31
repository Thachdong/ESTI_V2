import { Box, List, ListItem, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { paymentDocument } from "src/api";
import {
  FormDatepicker,
  FormInput,
  FormSelect,
} from "~modules-core/components";
import { paymentExpiredIn } from "~modules-core/constance";

type TProps = {
  disabled: boolean;
};

export const QuoteDetailTerms: React.FC<TProps> = ({ disabled }) => {
  const { id } = useRouter().query;

  const { control, watch } = useFormContext();

  const { data } = useQuery(["PaymentDocument"], () =>
    paymentDocument.getList().then((res) => res.data)
  );

  return (
    <Box className="flex flex-col">
      <Typography className="font-bold uppercase mb-3 text-sm">
        ĐIỀU KHOẢN CỦA ĐƠN ĐẶT HÀNG
      </Typography>

      <Box className="bg-white rounded flex-grow p-3 ">
        <List className="p-0">
          <ListItem disableGutters className="pb-0 text-sm">
            - Tổng giá trị báo giá đã bao gồm thuế GTGT, chi phí giao hàng và
            các khoản phí, lệ phí khác (nếu có).
          </ListItem>

          <ListItem disableGutters className="pb-0 text-sm">
            - Hiệu lực báo giá đến:
            <FormDatepicker
              label=""
              controlProps={{
                control,
                name: "expireDate",
              }}
              className="min-w-[200px] ml-2"
              disabled={disabled}
            />
          </ListItem>

          <ListItem disableGutters className="pb-0 text-sm">
            - Thời gian giao hàng: từ 1-3 ngày làm việc đối với hàng hoá có sẵn,
            chi tiết lịch giao hàng sẽ gửi qua email và cập nhập trên hệ thống
            tra cứu đơn hàng.
          </ListItem>

          <ListItem disableGutters className="pb-0 text-sm">
            - Địa điểm giao hàng:
            <FormInput
              label=""
              controlProps={{
                control,
                name: "receiverAddress",
              }}
              className="min-w-[250px] ml-2"
              fullWidth={false}
              shrinkLabel
              disabled={disabled}
            />
          </ListItem>

          <ListItem disableGutters className="pb-0 text-sm">
            - Thời hạn thanh toán:
            {!!id ? (
              <FormInput
                controlProps={{
                  name: "paymentType",
                  control,
                }}
                label=""
                disabled={disabled}
                className="w-[250px] ml-2"
                shrinkLabel
              />
            ) : (
              <FormSelect
                controlProps={{
                  name: "paymentType",
                  control,
                }}
                label=""
                options={paymentExpiredIn}
                valueKey="name"
                freeSolo
                className="w-[250px] ml-2"
                shrinkLabel
              />
            )}
          </ListItem>

          <ListItem disableGutters className="text-sm">
            - Chứng từ thanh toán:
            <FormSelect
              options={data}
              label=""
              controlProps={{
                control,
                name: "paymentDocument",
              }}
              className="min-w-[200px] ml-2"
              labelKey="paymentDocumentName"
              shrinkLabel
              multiple
              disabled={disabled}
            />
          </ListItem>

          <ListItem disableGutters className="pb-0 text-sm">
            - Quý khách hàng xem điều khoản bảo hành tại website:
            www.navis.com.vn.
          </ListItem>
          {/* Api yêu cầu hardcode 3 trường này */}
          <ListItem disableGutters className="pb-0 text-sm">
            - Đơn vị thụ hưởng: CONG TY TNHH NAVIS VIET NAM
          </ListItem>

          <ListItem disableGutters className="pb-0 text-sm">
            - Số tài khoản (VND): 007.1000.802.734
          </ListItem>

          <ListItem disableGutters className="pb-0 text-sm">
            - Tên ngân hàng: VIETCOMBANK HCM, CN. TÂY SÀI GÒN
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};
