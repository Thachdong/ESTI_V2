import { Box, ButtonBase } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { FormDatepicker } from "~modules-core/components";

export const CustomerFilterBox: React.FC = () => {
    const router = useRouter();
    const { query } = router;
    
  const { control, watch, reset } = useForm();

  const { fromDayBD, toDayBD } = watch();

  const handleSearch = useCallback(() => {
    router.push({
      query: {
        ...query,
        toDayBD: moment(toDayBD).endOf("day").valueOf(),
        fromDayBD: moment(fromDayBD).startOf("day").valueOf(),
      },
    });
  }, [fromDayBD, toDayBD]);

  const handleCancelSearch = useCallback(() => {
    reset({});

    delete query["fromDayBD"];

    delete query["toDayBD"];

    router.push({ query });
  }, []);

  return (
    <Box className="col-span-2 flex gap-3 items-center w-full">
      <Box className="grid grid-cols-2 gap-3 w-full">
        <FormDatepicker
          controlProps={{
            name: "fromDayBD",
            control,
          }}
          label="Từ ngày sinh"
          shrinkLabel
          inputFormat="DD/MM"
          views={["day"]}
        />
        <FormDatepicker
          controlProps={{
            name: "toDayBD",
            control,
          }}
          label="Đến ngày sinh"
          shrinkLabel
          inputFormat="DD/MM"
          views={["day"]}
        />
      </Box>
      <ButtonBase
        onClick={handleSearch}
        className="px-3 py-1 h-[40px] bg-info text-white rounded text-base font-semibold"
        disabled={!fromDayBD || !toDayBD}
      >
        Lọc
      </ButtonBase>
      <ButtonBase
        onClick={handleCancelSearch}
        className="px-3 py-1 h-[40px] bg-warning text-white rounded text-base font-semibold"
      >
        Huỷ
      </ButtonBase>
    </Box>
  );
};
