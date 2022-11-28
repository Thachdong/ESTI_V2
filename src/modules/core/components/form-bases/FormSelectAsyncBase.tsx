import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { defaultPagination } from "~modules-core/constance";
import {
  TFormSelectAsyncBase,
} from "~types/form-controlled/form-select";

const PAGE_SIZE = 25;

const dummyData = Array.from({ length: 10000 }, (_, idx) => `Item ${idx + 1}`);

export const FormSelectAsyncBase: React.FC<TFormSelectAsyncBase> = (props) => {
  const { getListApi, label, selectShape, callback, size = "small", ...restProps } = props;

  console.log(props);
  

  const [pagination, setPagination] = useState(defaultPagination);

  const menuRef = useRef<any>();

  const {data} = useQuery([""])

  const [page, setPage] = useState(1);
  const options = dummyData.slice(0, page * PAGE_SIZE);

  useEffect(() => {
    const { current } = menuRef;

    if (current) {
      const itemsLength = current?.childNodes?.length;

      current?.childNodes[itemsLength - 25]?.scrollIntoView();
    }
  }, [page]);

  return (
    <Autocomplete
      options={options}
      ListboxProps={{
        onScroll: (event) => {
          const menuEement = event?.currentTarget;

          if (!menuEement) return;

          const scrollTop = menuEement.scrollTop;
          const scrollHeight = menuEement.scrollHeight;
          const clientHeight = menuEement.clientHeight;
          const threshold = 5;

          scrollTop + clientHeight + threshold >= scrollHeight &&
            setPage((page) => page + 1);
        },
      }}
      renderInput={(props) => <TextField {...props} size={size} variant="outlined" placeholder="ádf" />}
      renderOption={(props, option) => <li {...props}>{option}</li>}
      ListboxComponent={(props) => <ul {...props} ref={menuRef} />}
    />
  );
};
