import { Box } from "@mui/system";
import { General } from "./General";
import { Warranty } from "./Warranty";

type TProps = {
  disabled: boolean;
  refetch?: () => void;
};

export const ProductDetailGeneral: React.FC<TProps> = ({
  disabled,
  refetch,
}) => {
  return (
    <Box>
      <General disabled={disabled} refetch={refetch} />

      <Warranty disabled={disabled} />
    </Box>
  );
};
