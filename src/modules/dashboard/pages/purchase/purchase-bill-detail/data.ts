import { _format } from '~modules-core/utility/fomat'
import { TGridColDef } from '~types/data-grid'

export const productColumns: TGridColDef[] = [
	{
		field: 'no',
		headerName: 'STT',
		width: 50
	},
	{
		field: 'productCode',
		headerName: 'Mã SP',
		minWidth: 75
	},
	{
		field: 'productName',
		headerName: 'Tên SP',
		minWidth: 200,
		flex: 1
	},
	{
		field: 'manufactor',
		headerName: 'Hãng SX',
		minWidth: 100
	},
	{
		field: 'specs',
		headerName: 'Quy cách',
		minWidth: 100
	},
	{
		field: 'unitName',
		headerName: 'Đơn vị',
		minWidth: 75,
		flex: 1
	},
	{
		field: 'quantity',
		headerName: 'Số lượng',
		minWidth: 100,
		flex: 1,
		align: 'right',
		headerAlign: 'right'
	},
	{
		field: 'price',
		headerName: 'Giá',
		minWidth: 150,
		flex: 1,
		renderCell: ({ row }) => _format.getVND(row.price),
		align: 'right',
		headerAlign: 'right'
	},
	{
		field: 'vat',
		headerName: 'Thuế (%)',
		minWidth: 100,
		flex: 1,
		align: 'right',
		headerAlign: 'right'
	},
	{
		field: 'totalPrice',
		headerName: 'Thành tiền',
		minWidth: 150,
		flex: 1,
		renderCell: ({ row }) => _format.getVND(row.totalPrice),
		align: 'right',
		headerAlign: 'right'
	},
	{
		field: 'note',
		headerName: 'Ghi chú',
		minWidth: 100,
		flex: 1
	}
]
