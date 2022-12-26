import { TCategory } from "src/api";
import { TGridColDef } from "~types/data-grid";

export const categoryColumns: TGridColDef<TCategory>[] = [
  {
    field: "thumbnail",
    headerName: "Ảnh",
    isSort: false,
    isFilter: false,
    width: 75,
    renderCell: ({ row }) => (
      <img
        src={row.thumbnail?.split(",")?.[0]}
        onError={({ currentTarget }) =>
          (currentTarget.src =
            process.env.NEXT_PUBLIC_API_URL + row.thumbnail?.split(",")?.[0])
        }
        alt={row.name}
        height={32}
      />
    ),
  },
  {
    field: "name",
    headerName: "Tên",
    isSort: false,
    width: 250,
    filterKey: "name",
  },
  {
    field: "description",
    headerName: "Chú thích",
    isSort: false,
    isFilter: false,
    flex: 1,
    renderCell: ({ row }) => (
      <div dangerouslySetInnerHTML={{ __html: row.description }} />
    ),
  },
];
