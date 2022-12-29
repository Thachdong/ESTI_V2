// USAGE:
// 1. LAZY LOAD ON SCROLL DOWN
// 2. SEARCH OPTIONS BY LABELKEY
// 3. PASS DEFAULT OPTIONS
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  CircularProgress,
  Box,
} from "@mui/material";
import { useQuery } from "react-query";
import { useState, UIEvent, useCallback, useEffect, ChangeEvent } from "react";
import { defaultPagination } from "~modules-core/constance";
import _ from "lodash";
import { TFormSelectAsyncBase } from "~types/form-controlled/form-select";
import clsx from "clsx";
import { FormInputBase } from "./FormInputBase";

const getOptionsBaseOnFilterParams = (filterParams: any, options: any[]) => {
  if (!filterParams) return options;

  const filterKeys = Object.keys(filterParams);

  return options.filter((opt) => {
    let result = true;

    filterKeys.map((key) => {
      if (filterParams[key] !== opt?.[key]) {
        result = false;
      }
    });

    return result;
  });
};

export const FormSelectAsyncBase: React.FC<TFormSelectAsyncBase> = (props) => {
  // PROPS EXTRACTING
  const {
    fetcher,
    label,
    queryKey,
    selectShape = { valueKey: "id", labelKey: "name" },
    formControlProps,
    inputLabelProps,
    fetcherParams,
    helperText,
    callback,
    defaultOption,
    ...selectProps
  } = props;

  // STATE DECLARATIONS
  const [pagination, setPagination] = useState(defaultPagination);

  const [options, setOptions] = useState<any[]>(defaultOption || []);

  const [searchString, setSearchString] = useState("");

  const handleChangeSearchString = _.debounce(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSearchString(e.target.value);
    },
    500
  );  

  // TRIGGER CALLBACK WHEN EVER VALUE CHANGE
  useEffect(() => {
    if (!!callback && !!selectProps.value) {
      
      const selectedOption = options.find(
        (opt) => opt[selectShape.valueKey] === selectProps.value
      );

      callback(selectedOption);
    }
  }, [selectProps.value, options]);

  // OPTIONS FETCHER
  const { isLoading, isFetching } = useQuery(
    [queryKey, { ...pagination, ...fetcherParams, searchString }],
    () =>
      fetcher({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        [selectShape.labelKey]: searchString,
        ...fetcherParams,
      }).then((res) => res.data),
    {
      onSuccess: (data) => {
        if (data.totalItem === 0 || !Array.isArray(data.items)) return;

        const updateOptions = _.uniqBy(
          [...options, ...data.items],
          (item) => item?.id
        );

        setOptions(getOptionsBaseOnFilterParams(fetcherParams, updateOptions));

        setPagination({ ...pagination, total: data.totalItem });
      },
    }
  );

  // MENU PROPS
  const PaperProps = {
    // LOADING MORE OPTIONS WHEN USER SCROLL REACHED BOTTOM
    onScroll: (event: UIEvent<HTMLDivElement>) => {
      const menuEement = event?.currentTarget;

      if (!menuEement) return;

      const scrollTop = menuEement.scrollTop;
      const scrollHeight = menuEement.scrollHeight;
      const clientHeight = menuEement.clientHeight;
      const threshold = 5;

      const isBottomReached =
        scrollTop + clientHeight + threshold >= scrollHeight;
      const isOptionsRemain = pagination.total > options.length;

      if (isBottomReached && isOptionsRemain) {
        setPagination((old) => ({ ...old, pageIndex: old.pageIndex + 1 }));
      }
    },
  };

  // RENDER SERCHBOX HAVE MORE THAN ONE PAGE OPTIONS
  const renderSearchBox = useCallback(() => {
    if (pagination.total > pagination.pageSize) {
    // if (true) {
      return (

          <FormInputBase
            value={searchString}
            onChange={handleChangeSearchString}
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
            placeholder="Tìm kiếm"
            className="px-3"
          />

      );
    }
  }, [pagination, searchString]);

  return (
    <FormControl fullWidth size="small" {...formControlProps}>
      <InputLabel {...inputLabelProps}>{label}</InputLabel>

      <Select
        MenuProps={{
          PaperProps,
          sx: { maxHeight: 325 },
        }}
        input={
          <OutlinedInput
            className={clsx(props.disabled && "disable-form-input")}
            label={label}
          />
        }
        {...selectProps}
      >
        {renderSearchBox()}

        {options.map((opt: any) => (
          <MenuItem
            key={opt?.[selectShape.valueKey]}
            value={opt?.[selectShape.valueKey]}
          >
            {opt?.[selectShape.labelKey]}
          </MenuItem>
        ))}

        {(isLoading || isFetching) && (
          <MenuItem className="flex justify-center">
            <CircularProgress size={22} color="inherit" />
          </MenuItem>
        )}
      </Select>

      {helperText && (
        <Box className="text-error text-xs ml-3 mt-1">
          {helperText as string}
        </Box>
      )}
    </FormControl>
  );
};
