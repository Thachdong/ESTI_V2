import { Box } from "@mui/material";
import { StockChart } from "./StockChart";
import { StockTable } from "./StockTable";

type TProps = {
  productId: string;
  productCode: string;
  productName: string;
};

export const ProductManageStockPlan: React.FC<TProps> = ({
  productId,
  productCode,
  productName,
}) => {
  return (
    <Box className="flex flex-col h-[75vh]">
      <StockChart productId={productId} />

      <StockTable
        productId={productId}
        productCode={productCode}
        productName={productName}
      />
    </Box>
  );
};
