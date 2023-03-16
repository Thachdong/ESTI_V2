import { Box } from "@mui/system";
import { General } from "./General";
import { Warranty } from "./Warranty";

type TProps = {
  disabled: boolean;
}

export const ProductDetailGeneral: React.FC<TProps> = ({disabled}) => {
  return (
    <Box>
      <General disabled={disabled} />

      <Warranty disabled={disabled} />
    </Box>
  );
};
