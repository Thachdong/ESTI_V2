import { Box, Paper } from "@mui/material";
import { useRouter } from "next/router";
import React, { useCallback, useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useQuery } from "react-query";
import { mailToCustomer, TBranch } from "src/api";
import {
  AddButton,
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
  FilterButton,
  generatePaginationProps,
  RefreshButton,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { usePathBaseFilter } from "~modules-core/customHooks";
import { MailToCustomerDialog } from "~modules-dashboard/components/account/mail-to-customer";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";
import { notifyColumns } from "./data";

export const MailToCustomerPage: React.FC = () => {
  const router = useRouter();

  const { query } = router;

  const [pagination, setPagination] = useState(defaultPagination);

  const defaultValue = useRef<TBranch | any>();

  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });

  usePathBaseFilter(pagination);

  // DIALOG METHODS
  const onClose = useCallback(() => setDialog({ open: false }), []);

  const onOpen = useCallback(
    (type: string) => setDialog({ open: true, type }),
    []
  );

  // DATA FETCHING
  const { data, isLoading, isFetching, refetch } = useQuery(
    [
      "MailToCustomerList",
      {
        ...pagination,
        ...query,
      },
    ],
    () =>
      mailToCustomer
        .getList({
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          ...query,
        })
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        setPagination({ ...pagination, total: data.totalItem });
      },
    }
  );

  // DATA TABLE
  const columns: TGridColDef[] = [
    ...notifyColumns,
    {
      field: "action",
      headerName: "",
      width: 50,
      renderCell: ({ row }) => (
        <DropdownButton
          id={row?.id as string}
          items={[
            {
              action: () => onOpen("View"),
              label: "Nội dung chi tiết",
            },
          ]}
        />
      ),
    },
  ];

  const onMouseEnterRow = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id;

    const currentRow = data?.items.find((item: any) => item.id === id);

    defaultValue.current = currentRow;
  };

  const paginationProps = generatePaginationProps(pagination, setPagination);

  return (
    <Paper className="bgContainer">
      <Box className="flex items-center justify-between mb-3">
        <AddButton variant="contained" onClick={() => onOpen("Add")}>
          Tạo thông báo
        </AddButton>

        <Box>
          <RefreshButton className="mr-3" onClick={() => refetch()} />

          <FilterButton listFilterKey={[]} />
        </Box>
      </Box>

      <ContextMenuWrapper
        menuId="mail_table_menu"
        menuComponent={
          <Menu className="p-0" id="mail_table_menu">
            <Item id="view-mail" onClick={() => onOpen("View")}>
              Nội dung chi tiết
            </Item>
          </Menu>
        }
      >
        <DataTable
          rows={data?.items as []}
          columns={columns}
          gridProps={{
            loading: isLoading || isFetching,
            ...paginationProps,
          }}
          componentsProps={{
            row: {
              onMouseEnter: onMouseEnterRow,
            },
          }}
          hideSearchbar
        />
      </ContextMenuWrapper>
      <MailToCustomerDialog
        onClose={onClose}
        open={dialog.open}
        type={dialog.type}
        refetch={refetch}
        defaultValue={defaultValue.current}
      />
    </Paper>
  );
};
