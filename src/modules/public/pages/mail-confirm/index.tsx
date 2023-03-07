import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Lottie from "react-lottie";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { preQuote, TPreQuoteMailConfirm } from "src/api";
import * as animate from "~assets/json/expired-code.json";
import { FormInput, SendButton } from "~modules-core/components";
import { MailConfirmAttach } from "~modules-public/components";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animate,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export const MailConfirmPage: React.FC = () => {
  const router = useRouter();

  const { code } = router.query;

  const methods = useForm();

  const { control, handleSubmit } = methods;


  // status: 2: báo giá lại
  //         3: chấp nhận
  //         4: từ chối
  const { data } = useQuery(
    ["CheckIsValidCode", code],
    () => preQuote.checkMailCode(code as string).then(res => res.data),
    {
      enabled: !!code,
    }
  );
  
  const renderContent = useCallback(() => {
    const { status, result } = data || {};

    switch (true) {
      case !result:
        return (
          <>
            <Lottie options={defaultOptions} width={200} height={200} />

            <Typography className="text-center">
              Phiên xử lý đã hoàn thành hoặc hết hiệu lực
            </Typography>
          </>
        );
      case status === 1:
        return (
          <>
            <Typography className="font-semibold mb-2">
              Nội dung phản hồi: Xác nhận đặt hàng
            </Typography>
            <Typography>
              Chúng tôi cảm ơn Quý khách hàng đã tin tưởng và sử dụng sản phẩm
              và dịch vụ của ESTI. Quý khách hàng có thể đề xuất thêm yêu cầu
              khác liên quan đến đơn đặt hàng, bộ phận xử lý sẽ ghi nhận và điều
              chỉnh theo mong muốn của Quý khách hàng.
            </Typography>
          </>
        );
      case status === 2:
        return (
          <>
            <Typography className="font-semibold mb-2">
              Nội dung phản hồi: không đồng ý mua
            </Typography>
            <Typography>
              Chúng tôi rất tiếc vì chưa thể đáp ứng được tốt nhất nhu cầu của
              Quý khách hàng tại thời điểm hiện tại. Bằng hộp thoại này, chúng
              tôi rất mong nhận được ý kiến đóng góp quý báu của Quý khách hàng
              đối với những sản phẩm và dịch vụ trong báo giá này. Điều này có ý
              nghĩa to lớn, giúp ESTI hiểu hơn nhu cầu và tìm cách cải thiện
              danh mục sản phẩm và dịch vụ, tạo cơ hội hợp tác tốt hơn trong lần
              làm việc tiếp theo.
            </Typography>
          </>
        );
      case status === 3:
        return (
          <>
            <Typography className="font-semibold mb-2">
              Nội dung phản hồi: yêu cầu báo giá lại
            </Typography>
            <Typography>
              Cảm ơn Quý khách hàng đã tin tưởng và liên hệ đến ESTI. Để đáp ứng
              chính xác, tốt nhất nhu cầu và mong muốn của Quý khách hàng, xin
              hãy gởi cho chúng tôi thêm thông tin chi tiết về nội dung cần điều
              chỉnh. Chúng tôi sẽ kiểm tra và gởi lại báo giá mới phù hợp trong
              thời gian sớm nhất.
            </Typography>
          </>
        );
    }
  }, [data]);

  const mutate = useMutation(
    (payload: TPreQuoteMailConfirm) => preQuote.mailConfirm(payload),
    {
      onSuccess: (data: any) => {
        toast.success(data?.resultMessage);

        router.push("/dashboard/quotation/quote-request/");
      },
    }
  );

  const handleConfirm = useCallback(
    async (data: any) => {
      await mutate.mutateAsync({ ...data, code });
    },
    [code]
  );

  return (
    <Box className="max-w-[600px] w-full bg-white rounded-lg p-[40px] h-[70vh] overflow-y-auto">
      <Box>
        <img src="/logo-full.png" width={100} alt="Esti" />
      </Box>

      <Box>{renderContent()}</Box>

      {!!data?.result && (
        <FormProvider {...methods}>
          <Box className="grid gap-4 mt-4">
            <FormInput
              controlProps={{
                name: "title",
                control,
              }}
              label="Tiêu đề"
              shrinkLabel
            />

            <FormInput
              controlProps={{
                name: "note",
                control,
              }}
              label="Nội dung phản hồi"
              multiline
              minRows={5}
              shrinkLabel
            />

            <MailConfirmAttach />

            <Box className="text-right mt-3">
              <SendButton onClick={handleSubmit(handleConfirm)}>Gửi phản hồi</SendButton>
            </Box>
          </Box>
        </FormProvider>
      )}
    </Box>
  );
};
