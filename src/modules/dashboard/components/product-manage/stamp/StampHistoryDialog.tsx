import { useState } from "react";
import { useQuery } from "react-query";
import { labelHistory } from "src/api";
import {
  DataTable,
  Dialog,
  generatePaginationProps,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { stampHistoryColumns } from "~modules-dashboard/pages/product-manage/stamp/data";
import { TDialog } from "~types/dialog";

export const StampHistoryDialog: React.FC<TDialog> = ({
  open,
  title,
  onClose,
  defaultValue,
}) => {
  const [pagination, setPagination] = useState(defaultPagination);

  const { data, isLoading, isFetching } = useQuery(
    ["LabelHistoryList", { ...pagination }, defaultValue?.id],
    () =>
      labelHistory
        .getList({
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          productLabelId: defaultValue?.id,
        })
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        setPagination({ ...pagination, total: data?.totalItem });
      },
      enabled: !!defaultValue?.id,
    }
  );

  const paginationProps = generatePaginationProps(pagination, setPagination);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      title={title}
      headerClassName="text-center"
      className="h-full"
      PaperProps={{ sx: { height: "90%" } }}
    >
      <DataTable
        rows={data?.items || []}
        columns={stampHistoryColumns}
        gridProps={{
          loading: isLoading || isFetching,
          ...paginationProps,
        }}
        hideSearchbar={true}
      />
    </Dialog>
  );
};
