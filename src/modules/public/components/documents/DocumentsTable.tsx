import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { productDocument } from "src/api";
import { DataTable } from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { documentColumns } from "~modules-public/pages/documents/data";

export const DocumentsTable: React.FC = () => {
  const router = useRouter();

  const { productId, productCode, lotNumber } = router.query;

  const [pagination, setPagination] = useState(defaultPagination);

  const { data: documentList } = useQuery(
    ["DocumentList", productCode, productId, lotNumber, { ...pagination }],
    () =>
      productDocument.getList({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        productCode,
        productId,
        lotNumber,
      }).then(res => res.data),
    {
      onSuccess: (data: any) => {
        setPagination({ ...pagination, total: data.totalItem });
      },
    }
  );
  
  return (
    <Box>
      <Typography className="font-semibold mb-2">TÀI LIỆU SẢN PHẨM</Typography>

      <DataTable columns={documentColumns} rows={documentList?.items} autoHeight hideSearchbar  />
    </Box>
  );
};
