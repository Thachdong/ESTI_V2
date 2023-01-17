import { Box, Stack, Typography } from "@mui/material";

export const StoragePositionStatus = () => (
  <Stack direction="row" spacing={2}>
    <Box className="flex items-center">
      <Box sx={{border: "1px solid #000"}} className="rounded-full w-[10px] h-[10px] mr-2"></Box>
      <Typography>Không có hàng</Typography>
    </Box>

    <Box className="flex items-center">
      <Box sx={{border: "1px solid #000"}} className="bg-[#008000] rounded-full w-[10px] h-[10px] mr-2"></Box>
      <Typography>Còn trống</Typography>
    </Box>

    <Box className="flex items-center">
      <Box sx={{border: "1px solid #000"}} className="bg-[#ffff00]  rounded-full w-[10px] h-[10px] mr-2"></Box>
      <Typography>Gần đầy</Typography>
    </Box>

    <Box className="flex items-center">
      <Box sx={{border: "1px solid #000"}} className="bg-[#ff0000] rounded-full w-[10px] h-[10px] mr-2"></Box>
      <Typography>Hết chỗ</Typography>
    </Box>
  </Stack>
);
