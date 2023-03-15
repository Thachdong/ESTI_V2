import { Box } from "@mui/system";
import { General } from "./General";
import { Warranty } from "./Warranty";

export const ProductDetailGeneral: React.FC = () => {
  return (
    <Box>
      <General />

      <Warranty />
    </Box>
  );
};
