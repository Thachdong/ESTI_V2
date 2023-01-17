// FEATURES:
// 1. SELECT OPTION/OPTIONS
// 2. ASYNCHRONOUS LOAD OPTIONS AND LOAD MORE ON SCROLL
// 3. ADD DEFAULT OPTIONS TO WARRANTY DEFAULT VALUE ALWAYS RENDER || AUTOMATICALLY LOAD OPTION BASE ON DEFAULT VALUE(NOT IMPLEMNT YET)
// 4. SERVER SIDE FILTER OPTIONS ON USER TYPING

import { ErrorMessage } from "@hookform/error-message";
import _ from "lodash";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { useQuery } from "react-query";
import { defaultPagination } from "~modules-core/constance";
import { TAutocompleteAsync } from "~types/form-controlled/form-select";
import { TRenderControllerParams } from "~types/react-hook-form";
import { AutoCompleteBase } from "../form-bases";

export const FormSelectAsync: React.FC<TAutocompleteAsync> = (props) => {
  // LOCAL STATES AND EXTRACT PROPS
  const {
    controlProps,
    label,
    valueKey = "id",
    labelKey = "name",
    defaultOptions,
    fetcherParams,
    fetcher,
    inputProps,
    ...restProps
  } = props;

  const [pagination, setPagination] = useState(defaultPagination);

  const [options, setOptions] = useState<any[]>(defaultOptions || []);

  const [searchContent, setSearchContent] = useState<string | null>(null);

  // DATA FETCHING
  const { isLoading, isFetching } = useQuery(
    [
      fetcher.toString() + controlProps.name,
      {
        pageSize: pagination.pageSize,
        pageIndex: pagination.pageIndex,
        searchContent,
        ...fetcherParams,
      },
    ],
    () =>
      fetcher({
        pageSize: pagination.pageSize,
        pageIndex: pagination.pageIndex,
        searchContent,
        ...fetcherParams,
      }).then((res) => res.data),
    {
      onSuccess: (data) => {
        const { items, totalItem, totalPage } = data;

        const newOptions =
          pagination.pageIndex === 1 ? items : [...options, ...items];

        const uniqItems = _.uniqBy(newOptions, (item: any) => item?.[valueKey]);

        setOptions(uniqItems);

        setPagination({ ...pagination, totalPage, total: totalItem });
      },
    }
  );

  // METHODS
  const triggerLoadMoreOptions = (event: React.SyntheticEvent) => {
    const isOptionsRemain = pagination.total > options.length;

    if (isLoading || isFetching || !isOptionsRemain) {
      return;
    }

    const menuEement = event.currentTarget;

    if (!menuEement) return;

    const scrollTop = menuEement.scrollTop;
    const scrollHeight = menuEement.scrollHeight;
    const clientHeight = menuEement.clientHeight;
    const threshold = 5;

    const isBottomReached =
      scrollTop + clientHeight + threshold >= scrollHeight;

    if (isBottomReached) {
      setPagination((old) => ({
        ...old,
        pageIndex: old.pageIndex + 1,
      }));
    }
  };

  const onInputChange = (
    _: React.SyntheticEvent,
    value: string,
    reason: "input" | "reset" | "clear"
  ) => {
    if (reason === "input") {
      setSearchContent(value);

      setPagination({ ...pagination, pageIndex: 1 });
    } else {
      setSearchContent(null);
    }
  };

  const renderController = ({
    field: { ref, ...restField },
    fieldState: { error },
    formState: { errors },
  }: TRenderControllerParams) => {
    const rules = controlProps.rules || {};

    const updateLabel = Object.keys(rules).includes("required")
      ? `${label} *`
      : label;

    const defaultProps = {
      inputProps: {
        ...inputProps,
        helperText: (
          <ErrorMessage
            errors={errors}
            name={controlProps.name}
            render={({ message }) => message}
          />
        ),
        error: !!error,
      },
      label: updateLabel,
      ...restField,
      ...restProps,
    };

    return (
      <AutoCompleteBase
          options={options}
          loading={isLoading || isFetching}
          loadingText="Đang tải ..."
          filterOptions={(x) => x}
          onInputChange={onInputChange}
          ListboxProps={{
            className: "max-h-[325px] !border-none",
            onScroll: triggerLoadMoreOptions,
          }}
          getOptionLabel={(option) => option?.[labelKey]}
          {...defaultProps}
        />
    );
  };

  return <Controller {...controlProps} render={renderController} />;
};
