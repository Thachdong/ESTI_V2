import moment from 'moment'
import { StatusChip } from '~modules-core/components'
import { purchaseOrderBillStatus } from '~modules-core/constance'
import { _format } from '~modules-core/utility/fomat'
import { TGridColDef } from '~types/data-grid'

export const billColumns: TGridColDef[] = [
	//productOrderCode

	{
		field: 'billNumber',
		headerName: 'MÃ HOÁ ĐƠN',
		minWidth: 150,
		sortAscValue: 13,
		sortDescValue: 2,
		filterKey: 'billCode'
	},
	{
		field: 'productOrderCode',
		headerName: 'MÃ ĐƠN MUA HÀNG',
		minWidth: 150,
		sortAscValue: 20,
		sortDescValue: 2,
		filterKey: 'productOrderCode'
	},
	{
		field: 'supplierCode',
		headerName: 'NHÀ cung cấp',
		// renderCell: ({ row }) => `${row?.supplierCode} - ${row?.supplierName}`,
		minWidth: 150,
		sortAscValue: 15,
		sortDescValue: 4,
		filterKey: 'supplierCode'
	},
	{
		field: 'supplierName',
		headerName: 'TÊN NCC',
		minWidth: 250,
		flex: 1,
		sortAscValue: 16,
		sortDescValue: 5,
		filterKey: 'supplierName',
		headerAlign: 'right'
	},
	{
		field: 'totalPrice',
		headerName: 'GIÁ TRỊ HOÁ ĐƠN',
		minWidth: 150,
		renderCell: ({ row }) => _format.getVND(row?.totalPrice),
		sortAscValue: 17,
		sortDescValue: 6,
		filterKey: 'totalPrice'
	},
	{
		field: 'paid',
		headerName: 'ĐÃ THANH TOÁN',
		minWidth: 150,
		renderCell: ({ row }) => _format.getVND(row?.paid),
		sortAscValue: 18,
		sortDescValue: 7,
		filterKey: 'paid'
	},
	{
		field: 'unpaidTotal',
		headerName: 'CÒN PHẢI THU',
		minWidth: 150,
		renderCell: ({ row }) => _format.getVND(row?.unpaidTotal),
		isSort: false,
		isFilter: false
	},
	{
		field: 'statusName',
		headerName: 'TRẠNG THÁI',
		minWidth: 150,
		isSort: false,
		filterKey: 'status',
		type: 'select',
		options: purchaseOrderBillStatus,
		renderCell: ({ row }) => <StatusChip status={row?.status} label={row?.statusName} />
	},

	{
		field: 'nextPaymentDate',
		headerName: 'Ngày TT tiếp theo',
		minWidth: 150,
		renderCell: ({ row }) => _format.converseDate(row?.nextPaymentDate),
		isSort: false,
		filterKey: 'nextPaymentDate',
		type: 'date'
	},
	{
		field: 'branchCode',
		headerName: 'CHI NHÁNH',
		minWidth: 150,
		sortAscValue: 12,
		sortDescValue: 1,
		filterKey: 'branchCode'
	},

	{
		field: 'created',
		headerName: 'NGÀY TẠO',
		renderCell: ({ row }) => (row.created ? moment(row.created).format('DD/MM/YYYY') : '__'),
		minWidth: 125,
		sortAscValue: 14,
		sortDescValue: 3,
		filterKey: 'createdDate',
		type: 'date'
	}
]
