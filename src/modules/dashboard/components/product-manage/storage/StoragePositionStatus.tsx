import { Box, Stack, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

export const StoragePositionStatus = () => (
  <Stack direction="row" spacing={2}>
    <Box className="flex items-center gap-2">
      <Box className="bg-white rounded w-[20px] h-[20px] flex justify-center items-center">
        {/* <CircleIcon className="border border-solid border-[#afabab] rounded-full text-xs text-white" /> */}
      </Box>
      <Typography className="text-sm font-semibold text-main">
        Không có hàng
      </Typography>
    </Box>

    <Box className="flex items-center gap-2">
      <Box className="bg-[#008000] rounded w-[20px] h-[20px] flex justify-center items-center">
        {/* <CircleIcon className="border border-solid border-[#afabab] rounded-full text-xs text-[#008000]" /> */}
      </Box>
      <Typography className="text-sm font-semibold text-main">
        Còn trống
      </Typography>
    </Box>

    <Box className="flex items-center gap-2">
      <Box className="bg-[#ffff00] rounded w-[20px] h-[20px] flex justify-center items-center">
        {/* <CircleIcon className="border border-solid border-[#afabab] rounded-full text-xs text-[#ffff00]" /> */}
      </Box>
      <Typography className="text-sm font-semibold text-main">
        Gần đầy
      </Typography>
    </Box>

    <Box className="flex items-center gap-2">
      <Box className="bg-[#ff0000] rounded w-[20px] h-[20px] flex justify-center items-center">
        {/* <CircleIcon className="border border-solid border-[#afabab] rounded-full text-xs text-[#ff0000]" /> */}
      </Box>
      <Typography className="text-sm font-semibold text-main">
        Hết chỗ
      </Typography>
    </Box>
  </Stack>
);
