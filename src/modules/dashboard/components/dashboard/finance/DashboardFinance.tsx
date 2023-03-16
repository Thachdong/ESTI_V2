import { Collapse, Typography } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { dashboard, staff } from "src/api";
import {
  AutoCompleteBase,
  DataTable,
  FormDatepickerBase,
  generatePaginationProps,
  SearchBox,
} from "~modules-core/components";
import { defaultBranchId, defaultPagination } from "~modules-core/constance";
import { financeColumns } from "./data";

export const DashboardFinance: React.FC = () => {
  const [date, setDate] = useState({
    fromDate: moment().startOf("month").valueOf(),
    toDate: moment().endOf("month").valueOf(),
    type: "month",
  });

  const [searchContent, setSearchContent] = useState("");

  const [saleId, setSaleId] = useState("");

  const [collapse, setCollapse] = useState(true);

  const { branchId = defaultBranchId } = useRouter().query;

  const [pagination, setPagination] = useState({
    ...defaultPagination,
    pageSize: 5,
  });

  // DATA FETCHING
  const { data } = useQuery(
    ["FinanceStatistic", branchId, pagination, date, searchContent, saleId],
    () =>
      dashboard
        .getFinance({
          fromDate: date.fromDate,
          toDate: date.toDate,
          pageSize: pagination.pageSize,
          pageIndex: pagination.pageIndex,
          branchId,
          searchContent,
          userId: saleId,
        })
        .then((res) => {
          const { items } = res?.data || [];

          const addIdToItems = items.map((item: any, index: number) => ({
            ...item,
            id: index,
          }));

          return { ...res.data, items: addIdToItems };
        }),
    {
      onSuccess: (data: any) => {
        setPagination({ ...pagination, total: data?.totalItem });
      },
      enabled: !!branchId,
    }
  );

  const { data: saleList } = useQuery(["SaleList"], () =>
    staff.getListSale().then((res) => res.data)
  );

  const paginationProps = generatePaginationProps(pagination, setPagination);

  // METHODS
  const handleChangeFilterType = useCallback((type: string) => {
    const currentDate = moment();

    switch (type) {
      case "year": {
        setDate({
          type,
          fromDate: currentDate.startOf("year").valueOf(),
          toDate: currentDate.endOf("year").valueOf(),
        });
        break;
      }
      case "month": {
        setDate({
          type,
          fromDate: currentDate.startOf("month").valueOf(),
          toDate: currentDate.endOf("month").valueOf(),
        });
        break;
      }
      case "week": {
        setDate({
          type,
          fromDate: currentDate.startOf("week").valueOf(),
          toDate: currentDate.endOf("week").valueOf(),
        });
        break;
      }
    }
  }, []);

  // SIDE EFFECTS
  useEffect(() => {
    if (saleList?.lenght > 0) {
      setSaleId(saleList[0]?.id);
    }
  }, [saleList]);

  return (
    <Box className="bg-white rounded-md shadow">
      <Box className="flex items-center justify-between border-0 border-b border-grey-3 border-solid p-4">
        <Typography
          onClick={() => setCollapse(!collapse)}
          component="h4"
          className="font-semibold h4 cursor-pointer"
        >
          Thông tin tài chính
        </Typography>

        <AutoCompleteBase
          onChange={(val) => setSaleId(val)}
          options={saleList || []}
          label={"Nhân viên sale"}
          getOptionLabel={(opt: any) =>
            !!opt ? `${opt.code} - ${opt.fullName}` : ""
          }
          className="w-[200px]"
          shrinkLabel
          value={saleId}
        />
      </Box>

      <Collapse in={collapse} timeout="auto" className="p-4" unmountOnExit>
        <Box className="grid grid-cols-3 gap-4 mb-3">
          <AutoCompleteBase
            options={[
              { id: "year", name: "Năm hiện tại" },
              { id: "month", name: "Tháng hiện tại" },
              { id: "week", name: "Tuần hiện tại" },
            ]}
            label={"Xem theo"}
            shrinkLabel
            onChange={(val: any) => handleChangeFilterType(val)}
            value={date.type}
          />

          <FormDatepickerBase
            label="Từ ngày"
            shrinkLabel
            onChange={(val: any) => setDate({ ...date, fromDate: val })}
            value={date.fromDate}
            inputFormat="DD/MM/YYYY"
          />

          <FormDatepickerBase
            label="Đến ngày"
            shrinkLabel
            onChange={(val: any) => setDate({ ...date, toDate: val })}
            value={date.toDate}
            inputFormat="DD/MM/YYYY"
          />
        </Box>

        <Box className="bg-[#F3F6F9] pt-3">
          <Box className="flex items-center mb-2 px-3">
            <Typography
              component="h4"
              className="font-semibold h4 whitespace-nowrap mr-4"
            >
              Thống kê tài chính
            </Typography>

            <Box className="w-1/2">
              <SearchBox
                callback={(val: string) => setSearchContent(val)}
                label="Tên, mã khách hàng"
                disabledRouterSearch={true}
              />
            </Box>
          </Box>

          <DataTable
            columns={financeColumns}
            rows={data?.items}
            gridProps={{
              ...paginationProps,
            }}
            autoHeight
            hideSearchbar
          />
        </Box>
      </Collapse>
    </Box>
  );
};
