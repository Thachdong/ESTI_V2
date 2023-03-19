import { Box, Typography } from "@mui/material";
import { PositionButton } from "./PositionButton";

type TProps = {
  warehouse: {
    warehouseConfigID: string;
    warehouseConfigCode: string;
    positions: any;
  };
  handleDelete: (position: any) => Promise<void>
};

export const StoragePositionList: React.FC<TProps> = ({ warehouse, handleDelete }) => {
  return (
    <Box className="rounded bg-white">
      <Typography className="uppercase text-main font-semibold text-sm py-3 px-3 rounded bg-[#F3F6F9] m-2">
        {warehouse?.warehouseConfigCode}
      </Typography>

      <Box className="grid grid-cols-3 lg:grid-cols-5 md:grid-cols-4 gap-3 px-3 py-2">
        {warehouse?.positions?.map((position: any) => (
          <PositionButton key={position?.id} position={position} handleDelete={handleDelete} />
        ))}
      </Box>
    </Box>
  );
};
