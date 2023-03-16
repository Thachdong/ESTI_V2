import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import {
  Box,
  Button,
  ButtonBase,
  ButtonProps,
  Popover,
  Typography,
} from "@mui/material";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { FormDatepicker, FormSelect } from "../form-hooks";
import { useForm } from "react-hook-form";
import router, { useRouter } from "next/router";
import moment from "moment";

export const FilterButton: React.FC<
  ButtonProps & { listFilterKey: string[] }
> = (props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Open = Boolean(anchorEl);

  return (
    <>
      <ButtonBase
        {...props}
        className={clsx(
          "px-3 text-main bg-[#F3F6F9] h-[40px] w-[40px] rounded border border-solid border-[#edf0f2] active:bg-main active:text-white",
          props?.className
        )}
        onClick={handleClick}
      >
        <FilterAltOutlinedIcon />
        {props?.children}
      </ButtonBase>
      <FilterDialog
        Open={Open}
        OnClose={handleClose}
        title={props?.title || "Bộ lọc"}
        anchorEl={anchorEl}
        listFilterKey={props.listFilterKey || []}
      />
    </>
  );
};

type TDialogFilter = {
  Open: boolean;
  OnClose: () => void;
  title: string;
  anchorEl: HTMLButtonElement | null;
  listFilterKey: string[];
};

export const FilterDialog: React.FC<TDialogFilter> = ({
  Open,
  OnClose,
  title = "Bộ lọc",
  anchorEl,
  listFilterKey,
}) => {
  const { control, setValue, watch, reset } = useForm();

  const { query } = useRouter();

  const { fromDate, toDate, period } = watch();

  const OptionFilterDate = [
    {
      id: 1,
      name: "30 ngày gần nhất",
    },
    {
      id: 2,
      name: "Từ đầu tháng đến hiện tại",
    },
    {
      id: 3,
      name: "Quý này",
    },
    {
      id: 4,
      name: "Đầu quý đến hiện tại",
    },
    {
      id: 5,
      name: "Năm nay",
    },
    {
      id: 6,
      name: "Đầu năm đến hiện tại",
    },
    {
      id: 7,
      name: "6 tháng đầu năm",
    },
    {
      id: 8,
      name: "6 tháng cuối năm",
    },
  ];

  const handleSearch = useCallback(() => {
    router.push({
      query: {
        ...query,
        fromDate,
        toDate,
      },
    });
  }, [fromDate, toDate]);

  const handleCancelSearch = useCallback(() => {
    reset({});

    delete query["fromDate"];

    delete query["toDate"];

    router.push({ query });
    
    OnClose();
  }, []);

  useEffect(() => {
    switch (period) {
      case 1: {
        const targetDate = moment().subtract(30, "days").valueOf();

        setValue("fromDate", targetDate);

        setValue("toDate", moment().valueOf());
        break;
      }
      case 2: {
        setValue("fromDate", moment().startOf("month").valueOf());

        setValue("toDate", moment().valueOf());
        break;
      }
      case 3: {
        setValue("fromDate", moment().startOf("quarter").valueOf());

        setValue("toDate", moment().endOf("quarter").valueOf());
        break;
      }
      case 4: {
        setValue("fromDate", moment().startOf("quarter").valueOf());

        setValue("toDate", moment().valueOf());
        break;
      }
      case 5: {
        setValue("fromDate", moment().startOf("year").valueOf());

        setValue("toDate", moment().endOf("year").valueOf());
        break;
      }
      case 6: {
        setValue("fromDate", moment().startOf("year").valueOf());

        setValue("toDate", moment().valueOf());
        break;
      }
      case 7: {
        const startOfYear = moment().startOf("year");

        const halfYear =  moment().startOf("year").add(6, "months").valueOf()

        setValue("fromDate", startOfYear.valueOf());

        setValue("toDate", halfYear);
        break;
      }
      case 8: {
        const endOfYear = moment().endOf("year");

        const halfYear = moment().endOf("year").subtract(6, "months").valueOf()

        setValue("fromDate", halfYear);

        setValue("toDate", endOfYear.valueOf());
        break;
      }
      default:
        break;
    }
  }, [period]);

  return (
    <Popover
      id={"filter"}
      open={Open}
      anchorEl={anchorEl}
      onClose={OnClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      sx={{ marginTop: "12px" }}
    >
      <Box className="w-[600px] p-3">
        <Box className="flex justify-between items-center">
          <Typography className="text-base font-semibold">{title}</Typography>
          <ButtonBase
            onClick={OnClose}
            className="p-1 text-error bg-[#faf1f1] rounded-full"
          >
            <CloseIcon />
          </ButtonBase>
        </Box>

        <Box className="h-full grid grid-cols-2 gap-3 items-center py-3">
          <FormSelect
            options={OptionFilterDate}
            label={"Kỳ"}
            controlProps={{
              name: "period",
              control: control,
            }}
            defaultValue={OptionFilterDate?.[0]}
            className="col-span-2"
          />
          <Box className="col-span-2 flex gap-3 items-center w-full">
            <Box className="grid grid-cols-2 gap-3 w-full">
              <FormDatepicker
                controlProps={{
                  name: "fromDate",
                  control,
                  // rules: { required: "Phải nhập ngày sinh" },
                }}
                label="Từ ngày"
                shrinkLabel
              />
              <FormDatepicker
                controlProps={{
                  name: "toDate",
                  control,
                  // rules: { required: "Phải nhập ngày sinh" },
                }}
                label="Đến ngày"
                shrinkLabel
              />
            </Box>
            <ButtonBase
              onClick={handleSearch}
              className="px-3 py-1 h-[40px] bg-info text-white rounded text-base font-semibold"
              disabled={!fromDate || !toDate}
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
          {listFilterKey.map((item) => (
            <FormSelect
              options={OptionFilterDate}
              label={"Kỳ"}
              controlProps={{
                name: `product.${item}`,
                control: control,
                rules: undefined,
              }}
              defaultValue={OptionFilterDate?.[0]}
              className="col-span-2"
            />
          ))}
        </Box>
      </Box>
    </Popover>
  );
};
