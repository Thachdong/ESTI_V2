import { Box, Typography } from "@mui/material";
import { GridColumnHeaderParams } from "@mui/x-data-grid";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { TGridColDef } from "~types/data-grid";
import { useRouter } from "next/router";
import "~modules-core/styles/data-table.module.css";
import { debounce } from "lodash";

type TProps = {
  params: GridColumnHeaderParams;
};

export const CustomHeader: React.FC<TProps> = ({ params }) => {
  // EXTRACT PROPS
  const router = useRouter();

  const { query } = router;

  const { field } = params;

  const colDef = params.colDef as TGridColDef;

  const { isSort, isFilter, sortAscValue, sortDescValue, type } = colDef;

  const filterKey = colDef.filterKey as string;

  // SYNC QUERY VS LOCAL FILTER DATA
  useEffect(() => {
    const searchTerm = query[filterKey];

    if (searchTerm) {
      setFilterData({ ...filterData, searchTerm, isCheck: true });
    }

    const currentSort = query.order || 0;

    if (+currentSort !== sortAscValue && +currentSort !== sortDescValue) {
      setSortMode(null);
    }
  }, [query]);

  // IMPLEMENT SORT OPERATIONS
  const [sortMode, setSortMode] = useState<"asc" | "desc" | null>(null);

  const handleSort = useCallback(
    (mode: "asc" | "desc") => {
      switch (true) {
        case mode === sortMode: {
          setSortMode(null);
          router.push({ query: { ...query, order: 0 } });
          return;
        }
        case mode === "asc": {
          router.push({ query: { ...query, order: sortAscValue } });
          break;
        }
        case mode === "desc": {
          router.push({ query: { ...query, order: sortDescValue } });
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
              sortMode === "asc" ? "text-[#fff]" : "text-[#a1a1a1]",
              "cursor-pointer !font-bold mr-1"
            )}
          >
            &#8593;
          </span>
          <span
            onClick={() => handleSort("desc")}
            className={clsx(
              sortMode === "desc" ? "text-[#fff]" : "text-[#a1a1a1]",
              "cursor-pointer"
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
  const [filterData, setFilterData] = useState<any>({ type, isCheck: false });

  const handleFilter = (value: string) => {
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

  const debounceFilter = debounce(function (value: string) {
    handleFilter(value);
  }, 700);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    //2. update search term state
    setFilterData({ ...filterData, searchTerm: value });
    //1. isCheck => handle filter
    if (filterData.isCheck) {
      debounceFilter(value);
    }
  };

  const renderFilterBox = useCallback(() => {
    switch (true) {
      case !isFilter || field === "action":
        return <></>;
      case type?.toLowerCase().includes("time"):
        return <Box></Box>;
      default:
        return (
          <>
            <input
              id={field + "_checkbox"}
              type="checkbox"
              onChange={handleCheckbox}
              checked={filterData.isCheck}
            />
            <input
              id={field + "_searchbox"}
              onChange={handleInputChange}
              value={filterData.searchTerm}
              type={type}
              className="w-10/12 border-0"
            />
          </>
        );
    }
  }, [isFilter, type, filterData]);

  return (
    <Box className="w-full h-[64px]">
      <Box className="flex items-center bg-main text-[#fff] h-[32px] px-1">
        <Typography className="uppercase text-sm mr-1">
          {colDef.headerName}
        </Typography>

        {renderSortIcons()}
      </Box>
      <Box className="flex items-center bg-[#fff] !w-full h-[32px] px-1">
        {renderFilterBox()}
      </Box>
    </Box>
  );
};
