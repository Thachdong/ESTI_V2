/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Typography } from "@mui/material";
import { GridColumnHeaderParams } from "@mui/x-data-grid";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { TGridColDef } from "~types/data-grid";
import { useRouter } from "next/router";
import "~modules-core/styles/data-table.module.css";
import { debounce } from "lodash";
import moment from "moment";
import { FormDatepickerBase } from "../form-bases";

type TProps = {
  params: GridColumnHeaderParams;
};

export const CustomHeader: React.FC<TProps> = ({ params }) => {
  // EXTRACT PROPS
  const router = useRouter();

  const { query, isReady } = router;

  const { field } = params;

  const colDef = params.colDef as TGridColDef;

  const {
    isSort,
    isFilter,
    sortAscValue,
    sortDescValue,
    type,
    options,
    sortKey = "orderBy",
  } = colDef;

  const filterKey = colDef.filterKey as string;

  // SYNC QUERY VS LOCAL FILTER DATA
  useEffect(() => {
    const searchTerm = query[filterKey];

    if (searchTerm) {
      const value =
        type === "date" ? moment(+searchTerm).format("YYYY-MM-DD") : searchTerm;

      setFilterData({ ...filterData, searchTerm: value, isCheck: true });
    }
  }, [isReady]);

  // SYNC QUERY VS LOCAL SORT DATA
  useEffect(() => {
    const currentSort = query[sortKey] || 0;

    switch (true) {
      case !currentSort:
        setSortMode(null);
        break;
      case +currentSort !== sortAscValue && +currentSort !== sortDescValue:
        setSortMode(null);
        break;
      case +currentSort === sortAscValue:
        setSortMode("asc");
        break;
      case +currentSort === sortDescValue:
        setSortMode("desc");
        break;
      default:
        break;
    }
  }, [query, sortAscValue, sortDescValue]);

  // IMPLEMENT SORT OPERATIONS
  const [sortMode, setSortMode] = useState<"asc" | "desc" | null>(null);

  const handleSort = useCallback(
    (mode: "asc" | "desc") => {
      switch (true) {
        case mode === sortMode: {
          setSortMode(null);

          delete query[sortKey];

          router.push({ query });

          return;
        }
        case mode === "asc": {
          router.push({ query: { ...query, [sortKey]: sortAscValue } });

          break;
        }
        case mode === "desc": {
          router.push({ query: { ...query, [sortKey]: sortDescValue } });

          break;
        }
      }
      setSortMode(mode);
    },
    [sortMode]
  );

  const renderSortIcons = useCallback(() => {
    if (isSort && field !== "action") {
      return (
        <>
          <span
            onClick={() => handleSort("asc")}
            className={clsx(
              sortMode === "asc" && sortMode !== null
                ? "text-[#fff]"
                : "text-[#061E33]",
              "cursor-pointer !font-bold mr-1"
            )}
          >
            &#8593;
          </span>
          <span
            onClick={() => handleSort("desc")}
            className={clsx(
              sortMode === "desc" && sortMode !== null
                ? "text-[#fff]"
                : "text-[#061E33]",
              "cursor-pointer !font-bold"
            )}
          >
            &#8595;
          </span>
        </>
      );
    } else {
      return <></>;
    }
  }, [isSort, sortMode]);

  // IMPLEMENT FILTER OPERATIONS
  const [filterData, setFilterData] = useState<any>({ isCheck: false });

  const handleFilter = (value: string | number) => {
    const updateQuery = {
      ...query,
      [filterKey]: value,
    };

    !value && delete updateQuery[filterKey];

    router.push({ query: updateQuery });
  };

  const handleCheckbox = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const isCheck = e.target.checked;
      const { searchTerm } = filterData;
      // 1. checked => check is search term available => handle search
      if (isCheck && searchTerm) {
        handleFilter(filterData.searchTerm);
      }
      // 2. uncheck => check is search term abailable => handle search
      if (!isCheck && searchTerm) {
        delete query[filterKey];

        router.push({ query });
      }
      // 3. always update isCheck state
      setFilterData({ ...filterData, isCheck: isCheck });
    },
    [filterData, query]
  );

  const debounceFilter = debounce(function (value: string | number) {
    if (type === "date") {
      const miliseconds = new Date(value).getTime();

      handleFilter(miliseconds);
    } else {
      handleFilter(value);
    }
  }, 300);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = type === "date" ? e : e.target.value;

    //1. update search term state
    setFilterData({ ...filterData, searchTerm: value });
    //2. isCheck => handle filter
    if (filterData.isCheck) {
      debounceFilter(value as string);
    }
  };

  const renderInputTagBaseOnType = () => {
    switch (type) {
      case "select":
        return (
          <select
            id={field + "_searchbox"}
            onChange={handleInputChange}
            value={filterData.searchTerm}
            className="w-10/12 border-0 bg-[#F3F6F9] "
          >
            {options?.map(({ value, label }) => (
              <option key={value} value={value} className="min-w-[200px] p-2">
                {label}
              </option>
            ))}
          </select>
        );
      case "date":
        return (
          <FormDatepickerBase
            value={filterData.searchTerm || null}
            onChange={(val: any) => val && handleInputChange(val)}
            renderInputProps={{
              variant: "standard",
            }}
            inputFormat="DD/MM/YYYY"
            inputProps={{
              sx: { fontSize: "14px", padding: 0 },
            }}
            InputProps={{
              disableUnderline: true,
            }}
            disableOpenPicker
          />
        );
      default:
        return (
          <input
            type="text"
            id={field + "_searchbox"}
            onChange={handleInputChange}
            value={filterData.searchTerm}
            className="w-10/12 border-0 rounded !bg-[#F3F6F9]"
          />
        );
    }
  };

  const renderFilterBox = useCallback(() => {
    if (!isFilter || field === "action")
      return <Box className="!bg-[#F3F6F9] w-full h-[28px]" />;

    return (
      <>
        <input
          id={field + "_checkbox"}
          type="checkbox"
          onChange={handleCheckbox}
          checked={filterData.isCheck}
          className="min-w-[16px !important] !min-h-[16px] cursor-pointer !bg-[#F3F6F9]"
        />
        {renderInputTagBaseOnType()}
      </>
    );
  }, [isFilter, type, filterData]);

  return (
    <Box className="w-full h-[68px]">
      <Box className="flex items-center bg-[#9FADBB] text-[#fff] h-[40px] pl-2 pr-3 !border-0 !min-w-[200px]">
        <Typography className="uppercase text-[12px] mr-1 font-bold tracking-wide">
          {colDef.headerName}
        </Typography>

        {renderSortIcons()}
      </Box>
      <Box className="flex items-center bg-[#F3F6F9] !w-full h-[28px]">
        {renderFilterBox()}
      </Box>
    </Box>
  );
};
