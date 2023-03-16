import {
  Avatar,
  Box,
  ButtonBase,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import clsx from "clsx";
import { useCallback, useState } from "react";
import StarIcon from "@mui/icons-material/StarOutlineOutlined";
import { useMutation, useQuery } from "react-query";
import { feedback } from "src/api";
import moment from "moment";
import { BaseButton } from "~modules-core/components";
import { toast } from "~modules-core/toast";

type TProps = {
  id: string;
};

export const Feedback: React.FC<TProps> = ({ id }) => {
  const [feedbackType, setFeedbackType] = useState<"approved" | "pending">(
    "approved"
  );

  const { data: approveedFeedbacks, refetch: approvedRefetch } = useQuery(
    ["ApproveedFeedbacks"],
    () =>
      feedback
        .getList({
          accepted: true,
          pageSize: 20,
          pageIndex: 1,
          productId: id,
        })
        .then((res) => res.data)
  );

  const { data: pendingFeedbacks, refetch: pendingRefetch } = useQuery(
    ["PendingFeedbacks"],
    () =>
      feedback
        .getList({
          accepted: false,
          pageSize: 20,
          pageIndex: 1,
          productId: id,
        })
        .then((res) => res.data)
  );

  const totalPending = pendingFeedbacks?.pagedDataModel?.totalItem || 0;

  const totalApproved = approveedFeedbacks?.pagedDataModel?.totalItem || 0;

  const ratingList =
    feedbackType === "approved"
      ? approveedFeedbacks?.ratingList || []
      : pendingFeedbacks?.ratingList || [];

  // METHODS
  const calculatePercents = useCallback(
    (count: number) => {
      const total = feedbackType === "approved" ? totalApproved : totalPending;

      if (count === 0) return "0 %";

      return `${Math.floor((count / total) * 100)} %`;
    },
    [feedbackType, totalPending, totalApproved]
  );

  const mutateApprove = useMutation(
    (payload: any) => feedback.approve(payload),
    {
      onSuccess: (data: any) => {
        toast.success(data?.resultMessage);

        approvedRefetch();

        pendingRefetch();
      },
    }
  );

  const renderPendingFeedback = useCallback(() => {
    const feedbackList: any[] =
      feedbackType === "approved"
        ? approveedFeedbacks?.pagedDataModel?.items || []
        : pendingFeedbacks?.pagedDataModel?.items || [];

    return feedbackList.map((fb: any) => (
      <Box key={fb?.id} className="flex rounded-sm shadow p-3 mx-2">
        <Avatar sizes="2rem" className="mr-3" />

        <Box className="flex-grow">
          <Typography className="text-black font-semibold">
            {fb?.customerName}
          </Typography>
          <Typography className="text-gray text-xs">
            {fb?.created ? moment(fb?.created).format("DD/MM/YYYY") : "__"}
          </Typography>
          <Typography className="text-gray">{fb?.content}</Typography>
        </Box>
        {feedbackType === "pending" && (
          <BaseButton
            onClick={() => mutateApprove.mutateAsync({ id: fb?.id as string })}
            className="self-center"
            size="small"
          >
            Duyệt
          </BaseButton>
        )}
      </Box>
    ));
  }, [pendingFeedbacks, approveedFeedbacks, feedbackType]);

  return (
    <Box>
      <Box className="flex items-center mt-4">
        <ButtonBase
          className={clsx(
            feedbackType === "approved" && "bg-main text-white",
            "h-[40px] px-3 mr-4"
          )}
          onClick={() => setFeedbackType("approved")}
        >
          Đánh giá ({totalApproved})
        </ButtonBase>
        <ButtonBase
          className={clsx(
            feedbackType === "pending" && "bg-main text-white",
            "h-[40px] px-3"
          )}
          onClick={() => setFeedbackType("pending")}
        >
          Chờ duyệt ({totalPending})
        </ButtonBase>
      </Box>

      <List>
        {ratingList.map((data: any) => (
          <ListItem
            key={data?.rating}
            className="flex items-center justify-between w-[300px]"
          >
            <Box className="flex items-center">
              Số đánh giá {data?.rating} <StarIcon color="warning" />:
            </Box>
            <Typography>
              {data?.count} chiếm {calculatePercents(data?.count || 0)}
            </Typography>
          </ListItem>
        ))}

        {renderPendingFeedback()}
      </List>
    </Box>
  );
};
