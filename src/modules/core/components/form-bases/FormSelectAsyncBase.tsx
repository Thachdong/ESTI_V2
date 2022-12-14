import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  CircularProgress,
} from "@mui/material";
import { useQuery } from "react-query";
import { useState, UIEvent } from "react";
import { defaultPagination } from "~modules-core/constance";
import _ from "lodash";
import { TFormSelectAsyncBase } from "~types/form-controlled/form-select";
import clsx from "clsx";

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
    ...selectProps
  } = props;  

  // STATE DECLARATIONS
  const [pagination, setPagination] = useState(defaultPagination);

  const [options, setOptions] = useState<any[]>([]);

  // OPTIONS FETCHER
  const { isLoading, isFetching } = useQuery(
    [queryKey, { ...pagination }],
    () =>
      fetcher({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        ...fetcherParams
      }).then(res => res.data),
    {
      onSuccess: (data) => {        
        if (data.totalItem === 0 || !Array.isArray(data.items)) return;

        const updateOptions = _.uniqBy(
          [...options, ...data.items],
          (item) => item.id
        );

        setOptions(updateOptions);

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

  return (
    <FormControl fullWidth size="small" {...formControlProps}>
      <InputLabel {...inputLabelProps}>{label}</InputLabel>

      <Select
        MenuProps={{
          PaperProps,
          sx: { maxHeight: 325 },
        }}
        input={<OutlinedInput className={clsx(props.disabled && "disable-form-input")} label={label} />}
        disabled={isLoading || isFetching}
        {...selectProps}
      >
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
    </FormControl>
  );
};
