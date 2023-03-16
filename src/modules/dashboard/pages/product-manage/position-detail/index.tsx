import { Box } from "@mui/material";
import { useRouter } from "next/router";
import {
  PositionDetailForm,
  PositionDetailHistory,
  PositionDetailProducts,
} from "~modules-dashboard/components/product-manage/position-detail";

export const PositionDetailPage: React.FC = () => {
  const { id } = useRouter().query;

  return (
    <Box className="container-center">
      <PositionDetailForm />

      {!!id && (
        <>
          <PositionDetailProducts />

          <PositionDetailHistory />
        </>
      )}
    </Box>
  );
};
