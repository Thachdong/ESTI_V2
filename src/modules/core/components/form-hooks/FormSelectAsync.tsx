// INPUT: AS DECLARE IN TProps AND TFormSelectAsyncProps
// OUTPUT: 1. STRING | NUMBER VIA CONTROL AND NAME
//         2. GET RECORD VIA getSelectedOption FUNC

import { AsyncPaginate } from "react-select-async-paginate";
import { ErrorMessage } from "@hookform/error-message";
import clsx from "clsx";
import { useState } from "react";
import {
  Control,
  Controller,
  RegisterOptions,
} from "react-hook-form";
import { defaultPagination } from "~modules-core/constance";
import { TRenderControllerParams } from "~types/react-hook-form";

export type TFormSelectAsyncProps = {
  label: string;
  placeholder: string;
  required: boolean;
  rules: RegisterOptions;
  className: string;
  showError: boolean;
  isDisabled: boolean;
  isClearable: boolean;
  getSelectedOption: (option: any) => void;
  selectShape: { label: string; value: string };
};

type TProps = {
  control: Control<any, any>;
  name: string;
  getListApi: (params: any) => any;
  optionalProps?: Partial<TFormSelectAsyncProps>;
};

export const FormSelectAsync: React.FC<TProps> = ({
  name,
  getListApi,
  control,
  optionalProps,
}) => {
  const {
    label,
    placeholder,
    rules,
    className,
    getSelectedOption,
    isDisabled = false,
    isClearable = true,
    required = true,
    showError = true,
    selectShape = { label: "Name", value: "Id" },
  } = optionalProps || {};

  const [pageNo, setPageNo] = useState(1);
  const [options, setOptions] = useState<any[]>([]);  

  const fetchOptions = async (PageIndex: number, SearchContent?: string) => {
    return await getListApi({
      PageIndex,
      PageSize: defaultPagination.pageSize,
      SearchContent,
    }).then((res: TBaseResponse<TPaginationResponse<any[]>>) => {
      const { items } = res.data;

      const { value, label } = selectShape;

      const optionItems = items?.map((item: any) => ({
        ...item,
        value: item?.[value],
        label: item?.[label],
      }));
      return { ...res.data, Items: optionItems };
    });
  };

  const loadOptions = async (searchTerm: string) => {
    const response = await fetchOptions(pageNo, searchTerm);

    const { Items, PageIndex, TotalPage } = response;

    const hasMore = PageIndex < TotalPage;

    if (hasMore) {
      setPageNo((prev) => prev + 1);
    }

    setOptions([...options, ...Items]);

    return {
      options: Items,
      hasMore: hasMore,
    };
  };

  const renderController = (props: TRenderControllerParams) => {
    const {
      field: { value, onChange, ref, ...fields }, // ADDRESS WARNING: Attempts to access this ref will fail CASE BY REF
      fieldState: { error },
      formState: { errors },
    } = props;

    const handleSelectChange = (selectedOpt: any) => {
      getSelectedOption?.(selectedOpt);

      onChange(selectedOpt?.[selectShape.value] || "");
    };

    return (
      <>
        <AsyncPaginate
          components={{}}
          value={options.find((opt) => opt[selectShape.value] === value) || ""}
          loadOptions={loadOptions}
          onChange={handleSelectChange}
          placeholder={placeholder}
          isClearable={isClearable}
          isDisabled={isDisabled}
          {...fields}
        />
        {showError && (
          <ErrorMessage
            errors={errors}
            name={name as any}
            render={({ message }) => (
              <p className="text-warning text-xs font-medium mt-1">{message}</p>
            )}
          />
        )}
      </>
    );
  };

  return (
    <div className={clsx("w-full", className)}>
      {label && (
        <label className="block text-[#8d8c8c] text-sm mb-[8px]">
          {label}
          {required && <span className="text-red"> *</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={renderController}
        rules={rules}
      />
    </div>
  );
};
